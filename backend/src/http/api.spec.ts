import axios from "axios";
import { generateImageFromPrompt } from "./api";
import { UnhandledError } from "../errors/apiError";

jest.mock("axios");

describe("generateImageFromPrompt", () => {
  it("should return the base64 image when API call is successful", async () => {
    const mockResponse = {
      data: {
        artifacts: [{ base64: "base64Image" }],
      },
    };
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const userPrompt = "Test prompt";
    const apiKey = "testApiKey";
    const result = await generateImageFromPrompt(userPrompt, apiKey);

    expect(result).toBe("base64Image");
  });

  it("should throw UnhandledError when an unhandled error occurs", async () => {
    const mockError = new Error("Unhandled error");
    (axios.post as jest.Mock).mockRejectedValue(mockError);

    const userPrompt = "Test prompt";
    const apiKey = "testApiKey";

    await expect(generateImageFromPrompt(userPrompt, apiKey)).rejects.toThrow(
      UnhandledError
    );
  });
});
