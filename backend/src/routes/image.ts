import express from 'express';
import path from 'path';
import fs from 'fs';
import { savePrompt, saveImage, getGeneratedImages, getSampleImages } from '../service/databaseService';
import { generateImageFromPrompt } from '../service/imageGenerateService';
import { SchemaNotFound, DocumentNotFound } from '../errors/databaseError';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const apiKey = process.env.API_KEY as string;

router.post('/generate', async (req, res) => {
  try {
    const userPrompt = req.body.prompt;

    const base64Image = await generateImageFromPrompt(userPrompt, apiKey);
    const imageBuffer = Buffer.from(base64Image, 'base64');
    
    const imageName = `image-${Date.now()}.png`;
    const imagePath = path.join(__dirname, '..', 'samples', imageName);

    fs.writeFileSync(imagePath, imageBuffer);

    const promptDocument = await savePrompt(userPrompt);
    if(!promptDocument) {
      return res.status(400).json({message: "Error saving prompt"});
    }

    await saveImage(imageName, imagePath, promptDocument._id.toString());

    res.status(200).json({ image: base64Image });
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

router.get('/generated-image', async (req, res) => {
  try {
    const { imageName } = req.query;
    if (!imageName) {
      return res.status(400).json({ message: "Bad request: imageName query parameter is required." });
    }

    const nameImg = String(imageName);
    const imagePath = path.join(__dirname, '..', 'samples', nameImg);

    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath);
    } else {
      return res.status(404).json({ message: "Not Found: The requested image does not exist." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/generated-images', async (req, res) => {
  try {
    const images = await getGeneratedImages();
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

router.get('/sample-images', async (req, res) => {
  try {
    const images = await getSampleImages();
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

router.get('/sample-image', async (req, res) => {
  try {
    const { imageName } = req.query;
    if (!imageName) {
      return res.status(400).json({ message: "Bad request: imageName query parameter is required." });
    }

    const imagePath = path.join(__dirname, '..', 'samples', `${imageName}.jpg`);

    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath);
    } else {
      return res.status(404).json({ message: "Not Found: The requested image does not exist." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;