import axios, { AxiosResponse } from "axios";
import { apiUtils } from "@/utils/apiUtils";

interface StoryResponse {
  story: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const storiesService = {
  generateStory: async (prompt: string): Promise<StoryResponse> => {
    try {
        const token = localStorage.getItem("token")
      const response: AxiosResponse<StoryResponse> = await axios.post(
        `${API_BASE_URL}/stories`,
          { prompt },
          { headers: { Authorization: `Bearer ${token}` } }
      );
      return apiUtils.handleResponse(response);
    } catch (err) {
        throw apiUtils.handleError(err);
    }
  },
};