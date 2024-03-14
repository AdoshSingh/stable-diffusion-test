import type { Image } from "../domain/image";

interface Props{
  generatedImages: Image[];
}

const GeneratedImages: React.FC<Props> = ({generatedImages}) => {
  return (
    <div className="w-full flex flex-col gap-12 p-12">
      <h1 className="font-bold text-4xl self-center sm:self-start text-center">Generation History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        { generatedImages.map((image: Image) => (
            <div
              key={image.id}
              className="flex flex-col gap-4 bg-secondary-bg p-2 shadow-lg rounded-xl text-center"
            >
              <div className="w-full rounded-xl shadow-lg">
                <img
                  className="object-cover rounded-lg w-full h-full"
                  src={`http://localhost:8000/api/image/generated/${image.name}`}
                  alt=""
                />
              </div>
              <h1>{image.prompt}</h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GeneratedImages;
