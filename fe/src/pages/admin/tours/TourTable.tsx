import React, { useEffect, useState } from "react";
import { Edit2, Trash, MoreVertical, ExternalLink } from "lucide-react";
import { Tour } from "../../../types/tour";
import { getDestinationNameById } from "../../../utils/utils";
import { TOUR_STATUS } from "../../../common/const";

interface TourTableProps {
  activeTab: number;
  tours: Array<Tour>;
}

const TOURS_PER_PAGE = 10;

const TourTable: React.FC<TourTableProps> = ({ activeTab, tours }) => {
  const [openActionId, setOpenActionId] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleAction = (type: string, tour: Tour) => {
    console.log(`${type} clicked for:`, tour);
    if (type === "view") {
    }
    if (type === "edit") {
    }
    if (type === "delete") {

    }
  };

  // Lọc tour theo tab
  const filteredTours =
    activeTab === 0
      ? tours
      : tours.filter((tour) => tour.status === activeTab);

  const totalPages = Math.ceil(filteredTours.length / TOURS_PER_PAGE);
  const startIndex = (currentPage - 1) * TOURS_PER_PAGE;
  const endIndex = startIndex + TOURS_PER_PAGE;
  const paginatedTours = filteredTours.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Tour Name",
              "Destination",
              "Duration",
              "Price",
              "Status",
              "Quantity",
              "Booked",
              "Start Date",
              "Actions",
            ].map((header, idx) => (
              <th
                key={idx}
                scope="col"
                className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  header === "Actions" ? "text-right" : "text-left"
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedTours.map((tour) => (
            <tr key={tour.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {tour.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {getDestinationNameById(tour.location)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {tour.duration} days
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${tour.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    tour.status === TOUR_STATUS.ACTIVE
                      ? "bg-green-100 text-green-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {tour.status === TOUR_STATUS.ACTIVE ? "Active" : "Upcoming"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {tour.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {tour.remain ? tour.quantity - tour.remain : tour.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(tour.departureDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                <div
                  className="inline-block cursor-pointer"
                  onMouseEnter={() => setOpenActionId(tour.id || 0)}
                  onMouseLeave={() => setOpenActionId(0)}
                >
                  <MoreVertical className="w-5 h-5 text-gray-500 hover:text-gray-800" />
                  {openActionId === tour.id && (
                    <div className="absolute right-0 mr-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <button
                        onClick={() => handleAction("view", tour)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <ExternalLink className="inline-block w-4 h-4 mr-2" />
                        View
                      </button>
                      <button
                        onClick={() => handleAction("edit", tour)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Edit2 className="inline-block w-4 h-4 mr-2" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleAction("delete", tour)}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash className="inline-block w-4 h-4 mr-2" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredTours.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No tours found for this filter.</p>
        </div>
      )}

      <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 pt-12 mb-12">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredTours.length)}{" "}
          of {filteredTours.length} tours
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourTable;
