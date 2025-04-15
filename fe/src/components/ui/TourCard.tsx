// components/TourCard.tsx
import React from 'react';
import { Eye, Edit2 } from 'lucide-react';

interface TourCardProps {
  id: number;
  name: string;
  destination: string;
  price: number;
  duration: string;
  status: 'active' | 'inactive';
  description: string;
  image: string;
  onView: () => void;
  onEdit: () => void;
}

const TourCard: React.FC<TourCardProps> = ({
  name,
  destination,
  price,
  duration,
  status,
  description,
  image,
  onView,
  onEdit
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-blue-600 font-semibold">¥{price.toLocaleString()}</span>
          <span className="text-gray-500">{duration}</span>
        </div>
        <div className="flex justify-between items-center">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {status === 'active' ? 'Đang hoạt động' : 'Tạm ngưng'}
          </span>
          <div className="flex space-x-2">
            <button
              className="p-2 text-gray-600 hover:text-blue-600"
              onClick={onView}
              title="Xem chi tiết"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-gray-600 hover:text-blue-600"
              onClick={onEdit}
              title="Chỉnh sửa"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;