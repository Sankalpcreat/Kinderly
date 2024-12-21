import React from "react";
import { useNotificationStore } from "@/stores/notificationStore";
import { XMarkIcon } from "@heroicons/react/solid";

interface NotificationItemProps {
    id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
}


const NotificationItem: React.FC<NotificationItemProps> = ({
    id,
    message,
    type,
}) => {
    const removeNotification = useNotificationStore((state) => state.removeNotification)

    const handleDismiss = () => {
         removeNotification(id);
    };

   const notificationClasses = {
       success: "bg-green-100 text-green-800 border-green-200",
       error: "bg-red-100 text-red-800 border-red-200",
       warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
       info: "bg-blue-100 text-blue-800 border-blue-200",
   };

    return (
        <li
            className={`relative p-3 rounded-md border flex items-center justify-between mb-2 ${notificationClasses[type]}`}
            role="alert"
            aria-live="assertive"
        >
            <span className="flex-1 overflow-hidden pr-3">{message}</span>
              <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none ml-2"
                  onClick={handleDismiss}
                  aria-label="Dismiss Notification"
                  >
                    <XMarkIcon className="h-4 w-4" />
                 </button>
        </li>
    )
}

interface NotificationListProps {
     className?: string;
}


const NotificationList: React.FC<NotificationListProps> = ({className}) => {
  const notifications = useNotificationStore((state) => state.notifications);

  return (
    <ul className={`space-y-2 ${className ? className : ""}`} aria-live="polite">
      {notifications.map((notification) => (
        <NotificationItem
            key={notification.id}
            id={notification.id}
          message={notification.message}
          type={notification.type}
        />
      ))}
    </ul>
  );
};

export default NotificationList;