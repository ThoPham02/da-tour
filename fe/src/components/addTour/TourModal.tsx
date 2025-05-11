import React from "react";
import { X } from "lucide-react";
import TourForm from "./TourForm";
import { Tour } from "../../types/tour"; // Đường dẫn đúng tùy vào project

interface TourModalProps {
  onClose: () => void;
  initialData?: Tour;
  mode: "view" | "edit" | "create";
}

const TourModal: React.FC<TourModalProps> = ({ onClose, initialData, mode }) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getTitle = () => {
    if (mode === "create") return "Add New Tour";
    if (mode === "edit") return "Edit Tour";
    return "View Tour";
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800">{getTitle()}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          <TourForm
            onClose={onClose}
            initialData={initialData}
            mode={mode}
          />
        </div>
      </div>
    </div>
  );
};

export default TourModal;
