import React, { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/solid";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity flex items-center justify-center backdrop-blur-sm" // Modified background overlay
    >
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden relative transform transition-transform duration-200 ease-out w-full max-w-md"> {/* Modified container */}
        <div className="p-6 border-b border-gray-200">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none" // Styled close button
                onClick={onClose}
                aria-label="Close"
                >
                <XMarkIcon className="h-5 w-5" />
              </button>
        </div>
          <div className="p-6">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;