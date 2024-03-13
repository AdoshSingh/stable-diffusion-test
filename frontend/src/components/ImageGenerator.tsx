interface Props{
  handleSubmit: (event: React.FormEvent) => void;
  prompt: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imageSrc: string;
}

const ImageGenerator: React.FC<Props> = ({handleSubmit, prompt, handleInputChange, imageSrc}) => {
  return (
      <div className="w-full flex flex-col md:flex-row h-fit md:h-[40rem] gap-12 md:gap-0 pt-12 md:pt-0 justify-around items-center">
        <div className="  flex flex-col items-center gap-8">
          <h1 className="font-bold text-4xl sm:text-5xl text-center sm:leading-[3.5rem]">
            Unleash your{" "}
            <span className=" bg-text-gradient bg-clip-text text-transparent">
              Creativity
            </span>
            <br /> with the power of
            <br />
            <span className="bg-text-gradient bg-clip-text text-transparent">
              Stable Diffusion
            </span>
          </h1>
          <form className="flex flex-col gap-4 w-fit" onSubmit={handleSubmit}>
            <input
              className="text-white text-lg bg-secondary-bg p-4 rounded-lg w-96 focus:outline-none focus:ring-2 focus:ring-primary-bg focus:ring-opacity-50 text-center"
              type="text"
              value={prompt}
              onChange={handleInputChange}
              placeholder="Enter a prompt to generate an image..."
            />
            <button
              type="submit"
              className=" p-4 bg-text-gradient transition-all hover:opacity-90 rounded-lg font-bold text-lg "
            >
              Generate Image
            </button>
          </form>
        </div>

        {imageSrc && (
          <div className=" bg-secondary-bg rounded-2xl p-3">
            <img
              className="rounded-xl shadow-lg"
              src={imageSrc}
              alt="Generated"
            />
          </div>
        )}
      </div>
  );
};

export default ImageGenerator;
