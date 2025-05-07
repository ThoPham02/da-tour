import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Tour } from "../../types/tour";
import { getDestinationNameById } from "../../utils/utils";
import { apiFilterTour } from "../../store/services/authService";

interface TourSearchProps {
  onSelectTour: (tour: Tour | null) => void;
  selectedTour: Tour | null;
}

const TourSearch: React.FC<TourSearchProps> = ({
  onSelectTour,
  selectedTour,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Tour[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    fetchTours();
  }, [searchTerm]);

  const fetchTours = async () => {
    if (searchTerm.length > 0) {
      try {
        const response = await apiFilterTour({
          search: searchTerm,
        });

        setSearchResults(response.tours || []);
        setIsSearchOpen(true);
      } catch (error) {
        setSearchResults([]);
        setIsSearchOpen(false);
      }
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };

  const handleSelectTour = (tour: Tour) => {
    onSelectTour(tour);
    setSearchTerm(tour.name);
    setIsSearchOpen(false);
  };

  const handleClearSelection = () => {
    onSelectTour(null);
    setSearchTerm("");
  };

  return (
    <div className="mb-6">
      <label
        htmlFor="tour-search"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Search and Select Tour
      </label>
      <div className="relative">
        <div className="flex">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="tour-search"
              className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Search by tour name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setSearchResults(searchResults)}
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={handleClearSelection}
              >
                <span className="text-xl">&times;</span>
              </button>
            )}
          </div>
        </div>

        {isSearchOpen && searchResults.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-80 overflow-y-auto">
            {searchResults.map((tour) => (
              <div
                key={tour.id}
                className="flex p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleSelectTour(tour)}
              >
                <div className="w-16 h-16 flex-shrink-0">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="ml-3 flex-grow">
                  <div className="text-sm font-medium text-gray-900">
                    {tour.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {getDestinationNameById(tour.location)} - {tour.duration}{" "}
                    days
                  </div>
                  <div className="text-xs text-gray-700 mt-1 truncate w-64">
                    {tour.description}
                  </div>
                  <div className="text-sm font-semibold text-red-600 mt-1">
                    ${tour.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedTour && (
        <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
          <div className="flex items-start">
            <div className="w-24 h-20 flex-shrink-0">
              <img
                src={selectedTour.image}
                alt={selectedTour.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="ml-4 flex-grow">
              <div className="flex justify-between">
                <span className="text-lg font-medium text-gray-900">
                  {selectedTour.name}
                </span>
                <span className="text-lg font-bold text-red-600">
                  ${selectedTour.price}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {getDestinationNameById(selectedTour.location)} -{" "}
                {selectedTour.duration} days
              </div>
              <div className="text-sm text-gray-700 mt-1 truncate w-64">
                {selectedTour.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourSearch;
