import {
  generateAndSaveImage,
  getGeneratedImagePath,
  getSampleImagePath,
  getAllGeneratedImages,
  getAllSampleImages,
} from "./imageService";
import * as api from "../http/api";
import path from "path";
import fs from "fs";
import * as databaseService from "./databaseService";

jest.mock("../http/api", () => ({
  generateImageFromPrompt: jest.fn(),
}));
jest.mock("fs", () => ({
  writeFileSync: jest.fn(),
  existsSync: jest.fn(),
}));
jest.mock("./databaseService", () => ({
  savePrompt: jest.fn(),
  saveImage: jest.fn(),
  getGeneratedImages: jest.fn(),
  getSampleImages: jest.fn(),
}));

describe("Image Service", () => {
  describe("generateAndSaveImage", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should generate and save an image successfully", async () => {
      const mockBase64Image = "mockBase64Image";
      const mockPromptId = "mockPromptId";
      (api.generateImageFromPrompt as jest.Mock).mockResolvedValue(
        mockBase64Image
      );
      (databaseService.savePrompt as jest.Mock).mockResolvedValue({
        _id: mockPromptId,
      });
      (databaseService.saveImage as jest.Mock).mockResolvedValue(undefined);
      const userPrompt = "Test prompt";
      const apiKey = "Test apiKey";
      const result = await generateAndSaveImage(userPrompt, apiKey);

      expect(result).toEqual(mockBase64Image);
    });
  });

  describe("getGeneratedImagePath", () => {
    const imageName = "test-image.png";
    const imagePath = path.join(__dirname, "..", "samples", imageName);

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return the image path if the image exists", () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);

      const result = getGeneratedImagePath(imageName);

      expect(fs.existsSync).toHaveBeenCalledWith(imagePath);
      expect(result).toEqual(imagePath);
    });

    it("should not return a path if the image does not exist", () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);

      const result = getGeneratedImagePath(imageName);

      expect(fs.existsSync).toHaveBeenCalledWith(imagePath);
      expect(result).toBeUndefined();
    });
  });

  describe("getSampleImagePath", () => {
    const imageName = "test-image";
    const imagePath = path.join(__dirname, "..", "samples", `${imageName}.jpg`);

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return the image path if the image exists", () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);

      const result = getSampleImagePath(imageName);

      expect(fs.existsSync).toHaveBeenCalledWith(imagePath);
      expect(result).toEqual(imagePath);
    });

    it("should not return a path if the image does not exist", () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);

      const result = getSampleImagePath(imageName);

      expect(fs.existsSync).toHaveBeenCalledWith(imagePath);
      expect(result).toBeUndefined();
    });
  });

  describe("getAllGeneratedImages", () => {
    it("should return all generated images", async () => {
      const mockImages = ["image1.png", "image2.png"];
      (databaseService.getGeneratedImages as jest.Mock).mockResolvedValue(
        mockImages
      );

      const result = await getAllGeneratedImages();

      expect(result).toEqual(mockImages);
    });
  });

  describe("getAllSampleImages", () => {
    it("should return all sample images", async () => {
      const mockImages = ["image1.jpg", "image2.jpg"];
      (databaseService.getSampleImages as jest.Mock).mockResolvedValue(
        mockImages
      );

      const result = await getAllSampleImages();

      expect(result).toEqual(mockImages);
    });
  });
});
