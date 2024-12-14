export const fetchAPI = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return (await response.json()) as T;
    } catch (error) {
      console.error("API Request Failed:", error);
      throw error;
    }
  };
  