import React from 'react';
import { Tour } from '../../types/tour';
import { location as LOCATIONS } from "../../assets/data/location";

interface TourBasicInfoProps {
  tour: Tour;
  onChange: (data: Partial<Tour>) => void;
  errors?: {
    price?: string;
    seats?: string;
    departureDate?: string;
  };
  disabled: boolean;  // Thêm thuộc tính disabled ở đây
}

const TourBasicInfo: React.FC<TourBasicInfoProps> = ({ tour, onChange, disabled }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    onChange({ duration: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Tour Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={tour.name}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
          placeholder="e.g., Beijing Imperial Experience"
          disabled={disabled} 
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={tour.description}
          onChange={handleInputChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
          placeholder="Brief description of the tour..."
          disabled={disabled} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration (days) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={tour.duration || ''}
            onChange={handleDurationChange}
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
            disabled={disabled} 
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location <span className="text-red-500">*</span>
          </label>
          <select
            id="location"
            name="location"
            value={tour.location}
            onChange={handleSelectChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 text-sm"
            disabled={disabled}  
          >
            <option value="">Select a location</option>
            {LOCATIONS.map((loc) => (
              <option key={loc.id} value={String(loc.id)}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="overview" className="block text-sm font-medium text-gray-700">
          Tour Overview <span className="text-red-500">*</span>
        </label>
        <textarea
          id="overview"
          name="overview"
          value={tour.overview}
          onChange={handleInputChange}
          rows={5}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
          placeholder="Detailed overview of the tour experience..."
          disabled={disabled}  
        />
      </div>
    </div>
  );
};

export default TourBasicInfo;
