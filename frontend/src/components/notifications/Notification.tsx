import React, { useState, useEffect, useCallback } from "react";
import { useNotificationStore } from "@/stores/notificationStore";
import { XMarkIcon } from "@heroicons/react/solid";

interface NotificationProps {
  id: number;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
  onClose: (id: number) => void;
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

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 300); // Allow time for transition
  }, [id, onClose]);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => handleClose(), duration);
      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  return isVisible ? (
    <div
      className={`relative p-4 mb-2 rounded-md shadow-lg border transition-all duration-300 transform ${
        notificationClasses[type]
      }`}
      role="alert"
      aria-label={`Notification: ${type}`}
    >
      <p className="font-medium">{message}</p>
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={handleClose}
        aria-label="Dismiss Notification"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  ) : null;
};

interface NotificationContainerProps {
  position?: "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";
}

const Notification: React.FC<NotificationContainerProps> = ({ position = "top-right" }) => {
  const notifications = useNotificationStore((state) => state.notifications);
  const removeNotification = useNotificationStore((state) => state.removeNotification);

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
  };

  if (!notifications.length) return null;

  return (
    <div
      className={`fixed z-50 p-4 space-y-2 ${positionClasses[position]}`}
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