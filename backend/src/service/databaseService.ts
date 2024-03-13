import Prompt from "../models/prompt";
import Image from "../models/image";
import { SchemaNotFound, DocumentNotFound, UnhandledError } from "../errors/databaseError";
import mongoose from "mongoose";

const savePrompt = async (prompt: string) => {
  try {
    const promptDocument = new Prompt({ prompt: prompt });
    await promptDocument.save();
    return promptDocument;
  } catch (error) {
    console.error("Error:", error);
    if(error instanceof mongoose.Error.MissingSchemaError) {
      throw new SchemaNotFound("Schema not found");
    } else if(error instanceof mongoose.Error.DocumentNotFoundError) {
      throw new DocumentNotFound("Document not found");
    } else {
      throw new UnhandledError("Unhandled error");
    }
  }
};

const saveImage = async (name: string, path: string, prompt: string) => {
  try {
    const imageDocument = new Image({
      name: name,
      path: path,
      prompt: prompt,
    });
    await imageDocument.save();
  } catch (error) {
    console.error("Error:", error);
    if(error instanceof mongoose.Error.MissingSchemaError) {
      throw new SchemaNotFound("Schema not found");
    } else if(error instanceof mongoose.Error.DocumentNotFoundError) {
      throw new DocumentNotFound("Document not found");
    } else {
      throw new UnhandledError("Unhandled error");
    }
  }
};

const getGeneratedImages = async () => {
  try {
    const excludedImageNames = ["sample_1", "sample_2", "sample_3", "sample_4"];
    const images = await Image.find({
      name: { $nin: excludedImageNames },
    });

    const genImages = await Promise.all(
      images.map(async (image) => {
        const prompt = await Prompt.findById(image.prompt).exec();
        return {
          id: image._id,
          name: image.name,
          path: image.path,
          prompt: prompt ? prompt.prompt : "No prompt found",
        };
      })
    );

    return genImages;
  } catch (error) {
    console.error("Error:", error);
    if(error instanceof mongoose.Error.MissingSchemaError) {
      throw new SchemaNotFound("Schema not found");
    } else if(error instanceof mongoose.Error.DocumentNotFoundError) {
      throw new DocumentNotFound("Document not found");
    } else {
      throw new UnhandledError("Unhandled error");
    }
  }
};

const getSampleImages = async () => {
  try {
    const imageNames = ["sample_1", "sample_2", "sample_3", "sample_4"];

    const images = await Image.find({
      name: { $in: imageNames },
    });

    const samples = await Promise.all(
      images.map(async (image) => {
        const prompt = await Prompt.findById(image.prompt).exec();
        return {
          id: image._id,
          name: image.name,
          path: image.path,
          prompt: prompt ? prompt.prompt : "No prompt found",
        };
      })
    );

    return samples;
  } catch (error) {
    console.error("Error:", error);
    if(error instanceof mongoose.Error.MissingSchemaError) {
      throw new SchemaNotFound("Schema not found");
    } else if(error instanceof mongoose.Error.DocumentNotFoundError) {
      throw new DocumentNotFound("Document not found");
    } else {
      throw new UnhandledError("Unhandled error");
    }
  }
};

export { savePrompt, saveImage, getGeneratedImages, getSampleImages };
