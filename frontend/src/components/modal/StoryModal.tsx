import React from "react";
import Modal from "./Modal";

interface StoryModalProps {
  isOpen: boolean;
  story: string;
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
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} className={className}>
      <div className="space-y-4">
        <div className="overflow-y-auto max-h-96 pr-4">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{story}</p>
        </div>
        {extraContent && <div className="pt-4 border-t border-gray-200">{extraContent}</div>}
      </div>
    </Modal>
  );
};

export default StoryModal;