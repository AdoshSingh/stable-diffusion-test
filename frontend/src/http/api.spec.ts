import axios from 'axios';
import { generateImageFromPrompt, getSampleImages, getGeneratedImages } from './api';

jest.mock('axios');

describe('API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateImageFromPrompt', () => {
    it('should generate an image from a prompt', async () => {
      const prompt = 'example prompt';
      const imageData = 'example image data';

      (axios.post as jest.Mock).mockResolvedValueOnce({ data: { image: imageData } });

      const result = await generateImageFromPrompt(prompt);

      expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/image/generate', { prompt });
      expect(result).toBe(`data:image/jpeg;base64,${imageData}`);
    });

    it('should throw an error if the request fails', async () => {
      const prompt = 'example prompt';
      const error = new Error('Request failed');

      (axios.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(generateImageFromPrompt(prompt)).rejects.toThrow(error);
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/image/generate', { prompt });
    });
  });

  describe('getSampleImages', () => {
    it('should get sample images', async () => {
      const sampleImages = ['image1', 'image2'];

      (axios.get as jest.Mock).mockResolvedValueOnce({ data: sampleImages });

      const result = await getSampleImages();

      expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/image/sample');
      expect(result).toBe(sampleImages);
    });

    it('should throw an error if the request fails', async () => {
      const error = new Error('Request failed');

      (axios.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(getSampleImages()).rejects.toThrow(error);
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/image/sample');
    });
  });

  describe('getGeneratedImages', () => {
    it('should get generated images', async () => {
      const generatedImages = ['image1', 'image2'];

      (axios.get as jest.Mock).mockResolvedValueOnce({ data: generatedImages });

      const result = await getGeneratedImages();

      expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/image/generated');
      expect(result).toBe(generatedImages);
    });

    it('should throw an error if the request fails', async () => {
      const error = new Error('Request failed');

      (axios.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(getGeneratedImages()).rejects.toThrow(error);
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/image/generated');
    });
  });
});
