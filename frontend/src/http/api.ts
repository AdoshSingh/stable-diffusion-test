import axios from 'axios';

const generateImageFromPrompt = async (prompt: string) => {
  try {
    const response = await axios.post('http://localhost:8000/api/image/generate', {
      prompt,
    });
    const image = `data:image/jpeg;base64,${response.data.image}`;
    return image;
  } catch (error) {
    throw error;
  }
}

const getSampleImages = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/image/sample');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getGeneratedImages= async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/image/generated');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export { getSampleImages, getGeneratedImages, generateImageFromPrompt };