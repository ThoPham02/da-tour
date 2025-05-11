import React, { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { uploadImage } from "../../store/services/authService";
import { BiLoaderCircle } from "react-icons/bi";

interface ProofUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage: string;
  error?: {};
  disabled?: boolean;  // Vẫn giữ thuộc tính disabled ở đây
}

const ProofUpload: React.FC<ProofUploadProps> = ({
  onImageUpload,
  currentImage,
  disabled = false,  // Mặc định disabled là false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState(currentImage);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => {
    if (!disabled) setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  };

  const handleImageFile = async (file: File) => {
    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      setPreviewUrl(url);
      onImageUpload(url);
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }

    setIsUploading(false);
  };

  const handleButtonClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = () => {
    setPreviewUrl("");
    onImageUpload("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="">
      {previewUrl ? (
        <div className="relative rounded-lg overflow-hidden h-64 bg-gray-100">
          <img
            src={previewUrl}
            alt="Tour preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100 transition-opacity"
            disabled={disabled}  // Thêm disabled vào nút xóa ảnh
          >
            <X size={20} className="text-red-600" />
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-64 transition-colors cursor-pointer
            ${isDragging ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-red-400 hover:bg-gray-50"} 
            ${disabled ? "cursor-not-allowed opacity-50" : ""}`} 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          {isUploading ? (
            <div className="flex items-center space-x-2">
              <BiLoaderCircle className="animate-spin" />
              <span>Uploading...</span>
            </div>
          ) : (
            <>
              <Upload size={36} className="text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 text-center">
                <span className="font-medium text-red-600">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF up to 5MB
              </p>
            </>
          )}
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        className="hidden"
        disabled={isUploading || disabled}  // Thêm disabled vào input file
      />
    </div>
  );
};

export default ProofUpload;
