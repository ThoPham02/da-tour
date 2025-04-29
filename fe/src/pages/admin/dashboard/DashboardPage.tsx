import React from 'react';
import StatCard from './StatCard';
import RecentOrdersTable from '../orders/RecentOrdersTable';
import TourPerformanceChart from './TourPerformanceChart';
import { Calendar, Users, DollarSign, MapPin } from 'lucide-react';

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Bookings" 
          value="1,284" 
          change="+12.5%" 
          trend="up"
          icon={<Calendar className="w-5 h-5 text-red-600" />}
          color="bg-red-50"
        />
        <StatCard 
          title="Total Revenue" 
          value="$86,400" 
          change="+8.2%" 
          trend="up"
          icon={<DollarSign className="w-5 h-5 text-green-600" />}
          color="bg-green-50"
        />
        <StatCard 
          title="Active Tours" 
          value="42" 
          change="+5%" 
          trend="up"
          icon={<MapPin className="w-5 h-5 text-purple-600" />}
          color="bg-purple-50"
        />
        <StatCard 
          title="Total Customers" 
          value="958" 
          change="+18.3%" 
          trend="up"
          icon={<Users className="w-5 h-5 text-orange-600" />}
          color="bg-orange-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Tour Performance</h2>
          <TourPerformanceChart />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Tours</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(index => (
              <div key={index} className="flex items-center p-3 border border-gray-100 rounded-md hover:bg-gray-50 transition-colors">
                <div className="h-10 w-10 rounded-md bg-red-100 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-red-600" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-800">Beijing Cultural Tour</p>
                  <p className="text-sm text-gray-500">May {10 + index}, 2025 • 14 bookings</p>
                </div>
              </div>
            ))}
            <button className="text-sm text-red-600 hover:text-red-800 font-medium">
              View all tours →
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <button className="text-sm text-red-600 hover:text-red-800 font-medium">
            View all orders →
          </button>
        </div>
        <RecentOrdersTable />
      </div>
    </div>
  );
};

export default DashboardPage;