import {create} from "zustand"


interface Notification{
    id:number;
    message:string;
    type: "success" | "error" | "info";
}

interface NotificationState {
    notification:Notification[];
    addNotification:(message:string,type:"success"|"error"|"info")=>void;
    removeNotification:(id:number)=>void
}

const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [],
    addNotification: (message, type) => {
      const id = Date.now();
      set((state) => ({
        notifications: [...state.notifications, { id, message, type }],
      }));
    },
    removeNotification: (id) =>
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      })),
  }));
  
  export default useNotificationStore;

