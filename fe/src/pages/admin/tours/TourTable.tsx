import React from 'react';
import { Edit2, Trash, MoreVertical, ExternalLink } from 'lucide-react';

// Mock tour data
const tours = [
  {
    id: 1,
    name: 'Beijing Cultural Experience',
    destination: 'Beijing',
    duration: 7,
    price: 1200,
    status: 'active',
    bookings: 24,
    startDate: '2025-06-15',
  },
  {
    id: 2,
    name: 'Shanghai City Tour',
    destination: 'Shanghai',
    duration: 5,
    price: 950,
    status: 'active',
    bookings: 18,
    startDate: '2025-06-22',
  },
  {
    id: 3,
    name: 'Great Wall Adventure',
    destination: 'Beijing',
    duration: 3,
    price: 500,
    status: 'upcoming',
    bookings: 12,
    startDate: '2025-07-10',
  },
  {
    id: 4,
    name: 'Yangtze River Cruise',
    destination: 'Chongqing',
    duration: 10,
    price: 2200,
    status: 'upcoming',
    bookings: 6,
    startDate: '2025-08-05',
  },
  {
    id: 5,
    name: 'Xi\'an Terracotta Army',
    destination: 'Xi\'an',
    duration: 4,
    price: 800,
    status: 'active',
    bookings: 15,
    startDate: '2025-07-01',
  },
];

interface TourTableProps {
  activeTab: string;
}

const TourTable: React.FC<TourTableProps> = ({ activeTab }) => {
  // Filter tours based on active tab
  const filteredTours = activeTab === 'all' 
    ? tours 
    : tours.filter(tour => tour.status === activeTab);
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tour Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Destination
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Duration
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bookings
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredTours.map((tour) => (
            <tr key={tour.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{tour.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{tour.destination}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{tour.duration} days</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">${tour.price}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  tour.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {tour.status === 'active' ? 'Active' : 'Upcoming'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {tour.bookings}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(tour.startDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                  <button className="p-1 rounded-md hover:bg-gray-100">
                    <Edit2 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-1 rounded-md hover:bg-gray-100">
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-1 rounded-md hover:bg-gray-100">
                    <Trash className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-1 rounded-md hover:bg-gray-100">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
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
      
      <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Showing {filteredTours.length} of {tours.length} tours
        </div>
        
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 disabled:opacity-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourTable;