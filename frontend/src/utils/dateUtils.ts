export const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  export const getCurrentTimestamp = (): string => {
    return new Date().toISOString();
  };
  