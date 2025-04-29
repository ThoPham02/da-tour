import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Download } from 'lucide-react';
import PaymentTable from './PaymentTable';
import PaymentStats from './PaymentStats';

const PaymentsPage: React.FC = () => {
  const [paymentFilter, setPaymentFilter] = useState('all');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Payment Management</h2>
        
        <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Export Payments
        </button>
      </div>
      
      <PaymentStats />
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search payments..."
                  className="pl-9 pr-4 py-2 w-full md:w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  paymentFilter === 'all' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`} 
                onClick={() => setPaymentFilter('all')}
              >
                All Payments
              </button>
              
              <button 
                className={`px-3 py-1.5 rounded-md font-medium text-sm ${
                  paymentFilter === 'completed' 
                    ? 'bg-green-50 text-green-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`} 
                onClick={() => setPaymentFilter('completed')}
              >
                Completed
              </button>
              
              <button 
                className={`px-3 py-1.5 rounded-md font-medium text-sm ${
                  paymentFilter === 'pending' 
                    ? 'bg-yellow-50 text-yellow-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`} 
                onClick={() => setPaymentFilter('pending')}
              >
                Pending
              </button>
              
              <button 
                className={`px-3 py-1.5 rounded-md font-medium text-sm ${
                  paymentFilter === 'refunded' 
                    ? 'bg-red-50 text-red-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`} 
                onClick={() => setPaymentFilter('refunded')}
              >
                Refunded
              </button>
            </div>
          </div>
        </div>
        
        <PaymentTable paymentFilter={paymentFilter} />
      </div>
    </div>
  );
};

export default PaymentsPage;