import express from 'express';
import { SchemaNotFound, DocumentNotFound } from '../errors/databaseError';
import { Unauthorized, PermissionDenied, EngineNotFound } from "../errors/apiError";
import { generateAndSaveImage, getGeneratedImagePath, getAllGeneratedImages, getAllSampleImages, getSampleImagePath } from '../service/imageService';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const apiKey = process.env.API_KEY as string;

router.post('/image/generate', async (req, res) => {
  try {
    const userPrompt = req.body.prompt;
    if (!userPrompt) {
      return res.status(400).json({ message: "Bad request: prompt is required." });
    }
    const base64Image = await generateAndSaveImage(userPrompt, apiKey);
    res.status(200).json({ image: base64Image });
  } catch (error) {
    if(error instanceof SchemaNotFound) {
      return res.status(404).json({message: "Schema not found"});
    } else if(error instanceof DocumentNotFound) {
      return res.status(404).json({message: "Document not found"});
    } else if(error instanceof Unauthorized) {
      return res.status(401).json({message: "Unauthorized"});
    } else if(error instanceof PermissionDenied) {
      return res.status(403).json({message: "Permission denied"});
    } else if(error instanceof EngineNotFound) {
      return res.status(404).json({message: "Engine not found"});
    } else {
      return res.status(500).json({message: "Internal server error"});
    }
  }
});

router.get('/image/generated/:imageName', async (req, res) => {
  try {
    const { imageName } = req.params;
    if (!imageName) {
      return res.status(400).json({ message: "Bad request: imageName query parameter is required." });
    }
    const imagePath = getGeneratedImagePath(String(imageName));
    if(!imagePath) {
      return res.status(404).json({ message: "Not Found: The requested image does not exist." });
    }
    res.sendFile(imagePath);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/image/generated', async (req, res) => {
  try {
    const images = await getAllGeneratedImages();
    res.status(200).json({data: images});
  } catch (error) {
    if(error instanceof SchemaNotFound) {
      return res.status(404).json({message: "Schema not found"});
    } else if(error instanceof DocumentNotFound) {
      return res.status(404).json({message: "Document not found"});
    } else {
      return res.status(500).json({message: "Internal server error"});
    }
  }
})

router.get('/image/sample', async (req, res) => {
  try {
    const images = await getAllSampleImages();
    res.status(200).json({data: images});
  } catch (error) {
    if(error instanceof SchemaNotFound) {
      return res.status(404).json({message: "Schema not found"});
    } else if(error instanceof DocumentNotFound) {
      return res.status(404).json({message: "Document not found"});
    } else {
      return res.status(500).json({message: "Internal server error"});
    }
  }
});

router.get('/image/sample/:imageName', async (req, res) => {
  try {
    const { imageName } = req.params;
    if (!imageName) {
      return res.status(400).json({ message: "Bad request: imageName query parameter is required." });
    }
    const imagePath = getSampleImagePath(String(imageName));
    if(!imagePath) {
      return res.status(404).json({ message: "Not Found: The requested image does not exist." });
    }
    res.sendFile(imagePath);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;