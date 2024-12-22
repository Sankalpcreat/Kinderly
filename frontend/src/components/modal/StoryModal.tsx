import React, { useEffect, useRef } from "react";
import Modal from "./Modal";

interface StoryModalProps {
  isOpen: boolean;
  story: string | null;
  onClose: () => void;
  title?: string;
  extraContent?: React.ReactNode;
  className?: string;
}

const StoryModal: React.FC<StoryModalProps> = ({
  isOpen,
  story,
  onClose,
  title = "Your Bedtime Story",
  extraContent,
  className,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  if (!story) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} className={className}>
        <div className="p-4 text-center text-gray-600">
          <p>No story available at the moment.</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={className}
      aria-label={title}
      role="dialog"
    >
      <div className="space-y-4">
        <div className="overflow-y-auto max-h-96 pr-4">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {story}
          </p>
        </div>
        {extraContent && (
          <div className="pt-4 border-t border-gray-200">{extraContent}</div>
        )}
        <div className="flex justify-end">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="text-indigo-600 hover:underline focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default StoryModal;