import React from 'react';
import { MoreVertical, FileText, Mail } from 'lucide-react';

// Mock order data
const orders = [
  {
    id: '#ORD-1234',
    customerName: 'John Smith',
    tourName: 'Beijing Cultural Experience',
    date: '2025-05-20',
    amount: '$2,400',
    status: 'confirmed',
    paymentStatus: 'paid',
    people: 2
  },
  {
    id: '#ORD-1235',
    customerName: 'Emily Johnson',
    tourName: 'Shanghai City Tour',
    date: '2025-05-18',
    amount: '$1,900',
    status: 'pending',
    paymentStatus: 'pending',
    people: 2
  },
  {
    id: '#ORD-1236',
    customerName: 'Robert Brown',
    tourName: 'Great Wall Adventure',
    date: '2025-05-15',
    amount: '$1,500',
    status: 'confirmed',
    paymentStatus: 'paid',
    people: 3
  },
  {
    id: '#ORD-1237',
    customerName: 'Sarah Williams',
    tourName: 'Yangtze River Cruise',
    date: '2025-05-10',
    amount: '$4,400',
    status: 'cancelled',
    paymentStatus: 'refunded',
    people: 2
  },
  {
    id: '#ORD-1238',
    customerName: 'Michael Davis',
    tourName: 'Xi\'an Terracotta Army',
    date: '2025-05-08',
    amount: '$1,600',
    status: 'confirmed',
    paymentStatus: 'paid',
    people: 2
  },
];

interface OrderTableProps {
  statusFilter: string;
}

const OrderTable: React.FC<OrderTableProps> = ({ statusFilter }) => {
  // Filter orders based on status filter
  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tour
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              People
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredOrders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-blue-600">{order.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{order.tourName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.people}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{order.amount}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  order.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : order.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  order.paymentStatus === 'paid' 
                    ? 'bg-green-100 text-green-800' 
                    : order.paymentStatus === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                  <button className="p-1 rounded-md hover:bg-gray-100" title="View Invoice">
                    <FileText className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-1 rounded-md hover:bg-gray-100" title="Send Email">
                    <Mail className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-1 rounded-md hover:bg-gray-100" title="More Actions">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {filteredOrders.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No orders found for this filter.</p>
        </div>
      )}
      
      <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Showing {filteredOrders.length} of {orders.length} orders
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

export default OrderTable;