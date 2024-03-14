import { generateImageFromPrompt } from "../http/api";
import path from "path";
import fs from "fs";
import { savePrompt, saveImage, getGeneratedImages, getSampleImages } from "./databaseService";

const generateAndSaveImage = async (userPrompt: string, apiKey: string) => {
  const base64Image = await generateImageFromPrompt(userPrompt, apiKey);
  const imageBuffer = Buffer.from(base64Image, "base64");

  const imageName = `image-${Date.now()}.png`;
  const imagePath = path.join(__dirname, "..", "samples", imageName);

  fs.writeFileSync(imagePath, imageBuffer);

  const promptDocument = await savePrompt(userPrompt);
  await saveImage(imageName, imagePath, promptDocument._id.toString());
  return base64Image;
};

const getGeneratedImagePath = (imageName: string) => {
  const imagePath = path.join(__dirname, "..", "samples", imageName);
  if(fs.existsSync(imagePath)) {
    return imagePath;
  }
};

const getSampleImagePath = (imageName: string) => {
  const imagePath = path.join(__dirname, '..', 'samples', `${imageName}.jpg`);
  if(fs.existsSync(imagePath)) {
    return imagePath;
  }
}

const getAllGeneratedImages = async () => {
  const images = await getGeneratedImages();
  return images;
};

const getAllSampleImages = async () => {
  const images = await getSampleImages();
  return images;
}

export { generateAndSaveImage, getGeneratedImagePath, getAllGeneratedImages, getAllSampleImages, getSampleImagePath };
