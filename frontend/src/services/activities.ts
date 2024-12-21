import axios, { AxiosResponse } from "axios";
import { apiUtils } from "@/utils/apiUtils";
import { Activity } from "@/types/activity";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const activitiesService = {
    fetchActivities: async (age: number): Promise<Activity[]> => {
        try {
            const response: AxiosResponse<Activity[]> = await axios.get(
                `${API_BASE_URL}/activities`,
                { params: { age } }
            );
           return apiUtils.handleResponse(response);
        } catch (err) {
          throw apiUtils.handleError(err);
        }
    },
};