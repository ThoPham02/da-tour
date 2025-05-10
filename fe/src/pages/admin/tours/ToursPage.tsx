import React, { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Map,
  CheckCircle,
  Calendar,
} from "lucide-react";

import { location as LOCATIONS } from "../../../assets/data/location";
import TourTable from "./TourTable";
import TourModal from "../../../components/addTour/TourModal";
import { Tour } from "../../../types/tour";
import { apiFilterTour } from "../../../store/services/authService";
import { getTimeStamp } from "../../../utils/utils";

const ToursPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tours, setTours] = useState<Tour[]>([]);
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetchTours();
  }, [isModalOpen]);

  const fetchTours = async () => {
    try {
      const response = await apiFilterTour({
        search: searchText,
        location: location ? Number(location) : 0,
        departureDate: getTimeStamp(departureDate),
      });
      
      setTours(response.tours || []);
    } catch (error) {
      console.error("Failed to fetch tours");
    }
  };

  const handleSearch = async () => {
    fetchTours();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Tour Management</h2>

        <button
          onClick={openModal}
          className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Tour
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap items-center space-x-4 gap-2">
              {/* Search by name */}
              <div className="relative">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search tours..."
                  className="pl-9 pr-4 py-2 w-44 md:w-56 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <Search
                  onClick={handleSearch}
                  className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer"
                />
              </div>

              {/* Select location */}
              <div className="relative">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 pr-4 py-2 w-48 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                >
                  <option value={0}>All Locations</option>
                  {LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
                <Map className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>

              {/* Departure date */}
              <div className="relative">
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="pl-10 pr-4 py-2 w-40 md:w-44 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>

              {/* Filter button */}
              <button
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100"
                onClick={handleSearch}
              >
                Filter
              </button>
            </div>

            {/* Tab status */}
            <div className="flex space-x-2">
              {[0, 1, 2, 3].map((status) => (
                <button
                  key={status}
                  className={`px-3 py-1.5 rounded-md font-medium text-sm ${
                    activeTab === status
                      ? status === 1
                        ? "bg-green-50 text-green-600"
                        : status === 2
                          ? "bg-red-50 text-red-600"
                          : status === 3
                            ? "bg-gray-100 text-gray-600"
                            : "bg-purple-50 text-purple-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab(status)}
                >
                  {status === 1 && (
                    <>
                      <CheckCircle className="w-4 h-4 inline mr-1" /> Active
                    </>
                  )}
                  {status === 2 && (
                    <>
                      <Map className="w-4 h-4 inline mr-1" /> Inactive
                    </>
                  )}
                  {status === 3 && (
                    <>
                      <Map className="w-4 h-4 inline mr-1" /> Sold Out
                    </>
                  )}
                  {status === 0 && "All Tours"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <TourTable activeTab={activeTab} tours={tours} />
      </div>

      {isModalOpen && <TourModal onClose={closeModal} />}
    </div>
  );
};

export default ToursPage;
