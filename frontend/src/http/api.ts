import axios from 'axios';

const generateImageFromPrompt = async (prompt: string) => {
  try {
    const response = await axios.post('http://localhost:8000/api/generate', {
      prompt,
    });
    const image = `data:image/jpeg;base64,${response.data.image}`;
    return image;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

const getSampleImages = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/sample-images');
    return response.data;
  } catch (error) {
    console.error('Error getting images:', error);
    throw error;
  }
};

const getGeneratedImages= async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/generated-images');
    return response.data;
  } catch (error) {
    console.error('Error getting images:', error);
    throw error;
  }
}

export { getSampleImages, getGeneratedImages, generateImageFromPrompt };