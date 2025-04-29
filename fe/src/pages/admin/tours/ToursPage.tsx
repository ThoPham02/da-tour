import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Map,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import TourTable from "./TourTable";
import TourModal from "../../../components/addTour/TourModal";

const ToursPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tours..."
                  className="pl-9 pr-4 py-2 w-full md:w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>

              <div className="relative">
                <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                className={`px-3 py-1.5 rounded-md font-medium text-sm ${
                  activeTab === "all"
                    ? "bg-red-50 text-red-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All Tours
              </button>

              <button
                className={`px-3 py-1.5 rounded-md font-medium text-sm ${
                  activeTab === "active"
                    ? "bg-green-50 text-green-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("active")}
              >
                <CheckCircle className="w-4 h-4 inline mr-1" />
                Active
              </button>

              <button
                className={`px-3 py-1.5 rounded-md font-medium text-sm ${
                  activeTab === "upcoming"
                    ? "bg-purple-50 text-purple-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("upcoming")}
              >
                <Map className="w-4 h-4 inline mr-1" />
                Upcoming
              </button>
            </div>
          </div>
        </div>

        <TourTable activeTab={activeTab} />
      </div>

      {isModalOpen && <TourModal onClose={closeModal} />}
    </div>
  );
};

export default ToursPage;
