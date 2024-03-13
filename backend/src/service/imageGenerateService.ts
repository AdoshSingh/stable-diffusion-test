import axios from "axios";

async function generateImageFromPrompt(userPrompt: string, apiKey: string) {
  try {
      const response = await axios.post(
          "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image",
          {
              cfg_scale: 7,
              clip_guidance_preset: "FAST_BLUE",
              height: 512,
              width: 512,
              sampler: "K_DPM_2_ANCESTRAL",
              samples: 1,
              steps: 30,
              text_prompts: [{ text: userPrompt, weight: 1 }],
          },
          {
              headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${apiKey}`,
              },
          }
      );
      return response.data.artifacts[0].base64;
  } catch (error) {
      console.error("API Call Error:", error);
      throw error;
  }
}

export {
  generateImageFromPrompt,
}