import React from "react";
import { Tour } from "../../types/tour";

interface TourPricingProps {
  tour: Tour;
  onChange: (data: Partial<Tour>) => void;
  errors?: {
    price?: string;
    seats?: string;
    departureDate?: string;
  };
  disabled?: boolean; // Bổ sung thuộc tính disabled
}

const TourPricing: React.FC<TourPricingProps> = ({ tour, onChange, errors, disabled }) => {
  const formattedDate = tour.departureDate
  ? new Date(tour.departureDate).toISOString().slice(0, 10)
  : '';

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onChange({ price: value });
  };

  const handleSeatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    onChange({ quantity: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ departureDate: e.target.value });
  };

  return (
    <div className="space-y-6">
      {/* Price Field */}
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price per Person (USD) <span className="text-red-500">*</span>
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            id="price"
            value={tour.price || ""}
            onChange={handlePriceChange}
            min="0"
            step="0.01"
            className={`p-2 pl-7 block w-full border ${errors?.price ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-red-500 focus:border-red-500`}
            placeholder="Enter price..."
            required
            disabled={disabled} // Áp dụng disabled
          />
          {errors?.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
        </div>
      </div>

      {/* Seats Field */}
      <div>
        <label
          htmlFor="seats"
          className="block text-sm font-medium text-gray-700"
        >
          Number of Seats Available <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="seats"
          value={tour.quantity !== undefined ? tour.quantity : ""}
          onChange={handleSeatsChange}
          min="1"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          placeholder="Enter number of seats..."
          required
          disabled={disabled}
        />
        {errors?.seats && <p className="text-sm text-red-500 mt-1">{errors.seats}</p>}
      </div>

      {/* Departure Date Field */}
      <div>
        <label
          htmlFor="departureDate"
          className="block text-sm font-medium text-gray-700"
        >
          Departure Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="departureDate"
          value={formattedDate}
          onChange={handleDateChange}
          className={`mt-1 p-2 block w-full border ${errors?.departureDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-red-500 focus:border-red-500`}
          required
          disabled={disabled} // Áp dụng disabled
        />
        {errors?.departureDate && <p className="text-sm text-red-500 mt-1">{errors.departureDate}</p>}
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Important Information
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Make sure you've set accurate pricing and available seats. After
                this tour is published, travelers will be able to book based on
                this information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPricing;
