import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/services/auth";


export const useAuthStoreHook = () => {
  const { user, setUser, clearUser } = useAuthStore();

  const login = async (email: string, password: string): Promise<void> => {
      try {
          const data = await authService.login(email, password);
         localStorage.setItem("token", data.token);
         setUser(data);
        } catch(err) {
            throw err;
      }

  };

  const logout = async (): Promise<void> => {
      try {
           await authService.logout();
          localStorage.removeItem("token");
           clearUser();
        } catch (err) {
            throw err;
        }

  };

    const signup = async (email: string, password: string, name: string): Promise<void> => {
       try {
            const data = await authService.signup(email, password, name);
             localStorage.setItem("token", data.token);
            setUser(data);
           } catch(err) {
                throw err;
            }
    };

  return { user, login, logout, signup };
};