import axios, { AxiosResponse } from "axios";
import { apiUtils } from "@/utils/apiUtils";
import { Notification } from "@/types/notification";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const notificationsService = {
  fetchNotifications: async (): Promise<Notification[]> => {
    try {
        const token = localStorage.getItem("token");
      const response: AxiosResponse<Notification[]> = await axios.get(
        `${API_BASE_URL}/notifications`,
            { headers: { Authorization: `Bearer ${token}` } }
      );
        return apiUtils.handleResponse(response);
     } catch(err) {
        throw apiUtils.handleError(err);
     }
  },

  createNotification: async (message: string): Promise<Notification> => {
      try {
          const token = localStorage.getItem("token");
        const response: AxiosResponse<Notification> = await axios.post(
             `${API_BASE_URL}/notifications`,
             { message },
                { headers: { Authorization: `Bearer ${token}` } }
        );
      return apiUtils.handleResponse(response);
    } catch (err) {
        throw apiUtils.handleError(err);
    }
  },
};