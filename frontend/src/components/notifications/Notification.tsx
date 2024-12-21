import React, { useState, useEffect } from "react";
import { useNotificationStore } from "@/stores/notificationStore";
import { XMarkIcon } from "@heroicons/react/solid";

interface NotificationProps {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const NotificationItem: React.FC<NotificationProps> = ({
  id,
  type,
  message,
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const notificationClasses = {
    success: "bg-green-200 text-green-800 border-green-300",
    error: "bg-red-200 text-red-800 border-red-300",
    warning: "bg-yellow-200 text-yellow-800 border-yellow-300",
    info: "bg-blue-200 text-blue-800 border-blue-300",
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 300);
  };

  useEffect(() => {
    if (duration && isVisible) {
      const timer = setTimeout(() => {
          handleClose()
        }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, isVisible, handleClose]);

  return isVisible ? (
    <div
        className={`relative p-4 mb-2 rounded-md shadow-lg border transition-all duration-300 transform ${
        notificationClasses[type]
        }`}
        role="alert"
      aria-live="assertive"
    >
        <p className="font-medium">{message}</p>
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none" onClick={handleClose} aria-label="Dismiss">
             <XMarkIcon className="h-4 w-4"/>
        </button>
    </div>
  ) : null;
};


interface NotificationContainerProps {
    position?: "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center"
}


const Notification: React.FC<NotificationContainerProps> = ({position = "top-right"}) => {
  const notifications = useNotificationStore((state) => state.notifications);
  const removeNotification = useNotificationStore(
    (state) => state.removeNotification
  );

    const positionClasses = {
        "top-right": "top-0 right-0",
        "top-left": "top-0 left-0",
        "top-center": "top-0 left-1/2 transform -translate-x-1/2",
        "bottom-right": "bottom-0 right-0",
        "bottom-left": "bottom-0 left-0",
        "bottom-center": "bottom-0 left-1/2 transform -translate-x-1/2",
    }

  if (!notifications.length) return null;

  return (
    <div
      className={`fixed p-4 space-y-2 z-50 ${positionClasses[position]}`}
      aria-live="polite"
      >
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          id={notification.id}
          type={notification.type}
          message={notification.message}
          duration={notification.duration}
          onClose={removeNotification}
        />
      ))}
    </div>
  );
};

export default Notification;