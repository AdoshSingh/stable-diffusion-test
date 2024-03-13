import { useEffect, useState } from "react";
import { getSampleImages, getGeneratedImages, generateImageFromPrompt } from "./http/api";
import logo from "./assets/devzero_logo.png";
import GeneratedImages from "./components/GeneratedImages";
import SampleImages from "./components/SampleImages";
import ImageGenerator from "./components/ImageGenerator";

const App: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [sampleImages, setSampleImages] = useState([]);
  const [generatedImages, setGeneratedImages] = useState([]);

  useEffect(() => {
    getSampleImages().then((images) => {
      setSampleImages(images.data);
    });
  }, []);

  useEffect(() => {
    getGeneratedImages().then((images) => {
      setGeneratedImages(images.data.reverse());
    });
  }, [imageSrc]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const image = await generateImageFromPrompt(prompt);
      setImageSrc(image);
      setPrompt("");
    } catch (error) {
      console.error("Error fetching image:", error);
      alert("Failed to generate image");
    }
  };

  return (
    <div className=" bg-primary-bg text-white font-sans flex flex-col items-center">
      <div className="flex items-center gap-4 w-full justify-center py-4">
        <img className="w-16" src={logo} alt="" />
        <h1 className="font-bold text-4xl">
          Dev<span className=" font-normal">Zero</span>
        </h1>
      </div>
      <ImageGenerator
        handleSubmit={handleSubmit}
        prompt={prompt}
        handleInputChange={handleInputChange}
        imageSrc={imageSrc}
      />
      {generatedImages.length !== 0 && <GeneratedImages generatedImages={generatedImages} />}
      {sampleImages.length !== 0 && <SampleImages sampleImages={sampleImages} />}
    </div>
  );
};

export default App;
