import axios, { AxiosResponse } from "axios";
import { apiUtils } from "@/utils/apiUtils";
import { User } from "@/types/user"; // Import the User type

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
      try {
           const response: AxiosResponse<User> = await axios.post(
                `${API_BASE_URL}/auth/login`,
                 { email, password }
                );
             return apiUtils.handleResponse(response);
      } catch (err) {
         throw apiUtils.handleError(err);
      }
  },

  signup: async (email: string, password: string, name: string): Promise<User> => {
        try{
             const response: AxiosResponse<User> = await axios.post(
                 `${API_BASE_URL}/auth/signup`,
                { email, password, name }
             );
          return apiUtils.handleResponse(response);
        } catch(err){
             throw apiUtils.handleError(err);
        }
  },


  logout: async (): Promise<void> => {
    try {
          const token = localStorage.getItem("token");
        if(!token) {
            return;
        }

          const response = await axios.post(
               `${API_BASE_URL}/auth/logout`,
               {},
              { headers: { Authorization: `Bearer ${token}`}}
          );
          return apiUtils.handleResponse(response);
        } catch (err) {
            throw apiUtils.handleError(err)
        }
  },
};