import useNotificationStore from "../stores/notificationStore";

export const notify = (message: string, type: "success" | "error" | "info"): void => {
  const { addNotification } = useNotificationStore.getState();
  addNotification(message, type);
};
