import axios, { AxiosResponse } from "axios";
import { apiUtils } from "@/utils/apiUtils";
import { Milestone } from "@/types/milestone"; // Import Milestone type


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const milestonesService = {
  fetchMilestones: async (): Promise<Milestone[]> => {
      try {
          const response: AxiosResponse<Milestone[]> = await axios.get(`${API_BASE_URL}/milestones`);
          return apiUtils.handleResponse(response);
      } catch (err) {
        throw apiUtils.handleError(err);
      }

  },

  createMilestone: async (title: string, date: string): Promise<Milestone> => {
    try {
          const token = localStorage.getItem("token");
         const response: AxiosResponse<Milestone> = await axios.post(
              `${API_BASE_URL}/milestones`,
             { title, date },
                { headers: { Authorization: `Bearer ${token}` }}
          );
          return apiUtils.handleResponse(response);
    } catch (err) {
        throw apiUtils.handleError(err);
    }
  },
};