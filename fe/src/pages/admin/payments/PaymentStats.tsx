import React from 'react';
import { CreditCard, DollarSign, RefreshCcw, TrendingUp } from 'lucide-react';

const PaymentStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
            <p className="text-2xl font-semibold mt-1">$86,400</p>
          </div>
          <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-500">+12.5%</span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">Online Payments</p>
            <p className="text-2xl font-semibold mt-1">$62,580</p>
          </div>
          <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-500">+8.2%</span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">Pending Payments</p>
            <p className="text-2xl font-semibold mt-1">$12,450</p>
          </div>
          <div className="bg-yellow-50 w-12 h-12 rounded-full flex items-center justify-center">
            <RefreshCcw className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-500">+3.1%</span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">Refunded Amount</p>
            <p className="text-2xl font-semibold mt-1">$4,400</p>
          </div>
          <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center">
            <RefreshCcw className="w-6 h-6 text-red-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-sm font-medium text-red-500">+2.3%</span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStats;