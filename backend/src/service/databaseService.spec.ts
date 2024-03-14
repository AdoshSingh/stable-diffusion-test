import mongoose from "mongoose";
import { savePrompt, saveImage, getGeneratedImages, getSampleImages } from "./databaseService";
import Prompt from "../models/prompt";
import Image from "../models/image";
import { SchemaNotFound, DocumentNotFound, UnhandledError } from "../errors/databaseError";

jest.mock("../models/prompt");
jest.mock("../models/image");

describe("databaseService", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("savePrompt", () => {
    it('savePrompt should save a prompt successfully', async () => {
      const prompt = "Test prompt";
      const mockPromptDocument = { prompt: prompt, save: jest.fn() };
      (Prompt as unknown as jest.Mock).mockImplementation(() => mockPromptDocument);
  
      const result = await savePrompt(prompt);
  
      expect(result).toEqual(mockPromptDocument);
      expect(mockPromptDocument.save).toHaveBeenCalled();
    });

    it('savePrompt should throw SchemaNotFound for MissingSchemaError', async () => {
      const prompt = "Test prompt";
      const mockError = new mongoose.Error.MissingSchemaError('Schema not found');
      (Prompt as unknown as jest.Mock).mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(mockError),
      }));
    
      await expect(savePrompt(prompt)).rejects.toThrow(SchemaNotFound);
    });

    it("should throw DocumentNotFound error when there is a DocumentNotFoundError", async () => {
      const prompt = "Test prompt";
      const mockError = new mongoose.Error.DocumentNotFoundError("Document not found");
      (Prompt as unknown as jest.Mock).mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(mockError),
      }));

      await expect(savePrompt(prompt)).rejects.toThrow(DocumentNotFound);
    });

    it("should throw UnhandledError for other errors", async () => {
      const prompt = "Test prompt";
      const error = new Error("Unhandled error");
      (Prompt as unknown as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await expect(savePrompt(prompt)).rejects.toThrow(UnhandledError);
    });
  });

  describe("saveImage", () => {
    it("should save an image successfully", async () => {
      const name = "Test image";
      const path = "Test path";
      const prompt = "Test prompt";
      const mockImageDocument = { name, path, prompt, save: jest.fn() };
      (Image as unknown as jest.Mock).mockImplementation(() => mockImageDocument);

      await saveImage(name, path, prompt);

      expect(mockImageDocument.save).toHaveBeenCalled();
    });

    it("should throw SchemaNotFound for MissingSchemaError", async () => {
      const name = "Test image";
      const path = "Test path";
      const prompt = "Test prompt";
      const mockError = new mongoose.Error.MissingSchemaError("Schema not found");
      (Image as unknown as jest.Mock).mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(mockError),
      }));

      await expect(saveImage(name, path, prompt)).rejects.toThrow(SchemaNotFound);
    });

    it("should throw DocumentNotFound for DocumentNotFoundError", async () => {
      const name = "Test image";
      const path = "Test path";
      const prompt = "Test prompt";
      const mockError = new mongoose.Error.DocumentNotFoundError("Document not found");
      (Image as unknown as jest.Mock).mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(mockError),
      }));

      await expect(saveImage(name, path, prompt)).rejects.toThrow(DocumentNotFound);
    });

    it("should throw UnhandledError for other errors", async () => {
      const name = "Test image";
      const path = "Test path";
      const prompt = "Test prompt";
      const error = new Error("Unhandled error");
      (Image as unknown as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await expect(saveImage(name, path, prompt)).rejects.toThrow(UnhandledError);
    });
  });

  describe("getGeneratedImages", () => {
    it("should return all generated images", async () => {
      const mockImages = [
        {
          _id: "testId1",
          name: "Test image 1",
          path: "Test path 1",
          prompt: "Test prompt 1",
        },
        {
          _id: "testId2",
          name: "Test image 2",
          path: "Test path 2",
          prompt: "Test prompt 2",
        },
      ];
      const mockPrompt = { _id: "promptId", prompt: "Test prompt" };
  
      Image.find = jest.fn().mockResolvedValue(mockImages);
      Prompt.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockPrompt),
      });
  
      const expectedResults = mockImages.map((img) => ({
        id: img._id,
        name: img.name,
        path: img.path,
        prompt: mockPrompt.prompt,
      }));
  
      const results = await getGeneratedImages();
  
      expect(results).toEqual(expectedResults);
    });

    it("should throw SchemaNotFound for MissingSchemaError", async () => {
      const mockError = new mongoose.Error.MissingSchemaError("Schema not found");
      Image.find = jest.fn().mockRejectedValue(mockError);

      await expect(getGeneratedImages()).rejects.toThrow(SchemaNotFound);
    });

    it("should throw DocumentNotFound for DocumentNotFoundError", async () => {
      const mockError = new mongoose.Error.DocumentNotFoundError("Document not found");
      Image.find = jest.fn().mockRejectedValue(mockError);

      await expect(getGeneratedImages()).rejects.toThrow(DocumentNotFound);
    });

    it("should throw UnhandledError for other errors", async () => {
      const mockError = new Error("Unhandled error");
      Image.find = jest.fn().mockRejectedValue(mockError);

      await expect(getGeneratedImages()).rejects.toThrow(UnhandledError);
    });
  });

  describe("getSampleImages", () => {
    it("should return all sample images", async () => {
      const mockImages = [
        {
          _id: "testId1",
          name: "sample_1",
          path: "Test path 1",
          prompt: "Test prompt 1",
        },
        {
          _id: "testId2",
          name: "sample_2",
          path: "Test path 2",
          prompt: "Test prompt 2",
        },
      ];
      const mockPrompt = { _id: "promptId", prompt: "Test prompt" };
  
      Image.find = jest.fn().mockResolvedValue(mockImages);
      Prompt.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockPrompt),
      });
  
      const expectedResults = mockImages.map((img) => ({
        id: img._id,
        name: img.name,
        path: img.path,
        prompt: mockPrompt.prompt,
      }));
  
      const results = await getSampleImages();
  
      expect(results).toEqual(expectedResults);
    });

    it("should throw SchemaNotFound for MissingSchemaError", async () => {
      const mockError = new mongoose.Error.MissingSchemaError("Schema not found");
      Image.find = jest.fn().mockRejectedValue(mockError);

      await expect(getSampleImages()).rejects.toThrow(SchemaNotFound);
    });

    it("should throw DocumentNotFound for DocumentNotFoundError", async () => {
      const mockError = new mongoose.Error.DocumentNotFoundError("Document not found");
      Image.find = jest.fn().mockRejectedValue(mockError);

      await expect(getSampleImages()).rejects.toThrow(DocumentNotFound);
    });

    it("should throw UnhandledError for other errors", async () => {
      const mockError = new Error("Unhandled error");
      Image.find = jest.fn().mockRejectedValue(mockError);

      await expect(getSampleImages()).rejects.toThrow(UnhandledError);
    });
  });

});
