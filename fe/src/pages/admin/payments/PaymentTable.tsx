import React from 'react';
import { MoreVertical, FileText, ArrowDownCircle } from 'lucide-react';

// Mock payment data
const payments = [
  {
    id: '#PAY-1234',
    orderId: '#ORD-1234',
    customerName: 'John Smith',
    date: '2025-05-20',
    amount: '$2,400',
    status: 'completed',
    method: 'Credit Card'
  },
  {
    id: '#PAY-1235',
    orderId: '#ORD-1236',
    customerName: 'Robert Brown',
    date: '2025-05-15',
    amount: '$1,500',
    status: 'completed',
    method: 'PayPal'
  },
  {
    id: '#PAY-1236',
    orderId: '#ORD-1235',
    customerName: 'Emily Johnson',
    date: '2025-05-18',
    amount: '$950',
    status: 'pending',
    method: 'Bank Transfer'
  },
  {
    id: '#PAY-1237',
    orderId: '#ORD-1237',
    customerName: 'Sarah Williams',
    date: '2025-05-10',
    amount: '$4,400',
    status: 'refunded',
    method: 'Credit Card'
  },
  {
    id: '#PAY-1238',
    orderId: '#ORD-1238',
    customerName: 'Michael Davis',
    date: '2025-05-08',
    amount: '$1,600',
    status: 'completed',
    method: 'PayPal'
  },
];

interface PaymentTableProps {
  paymentFilter: string;
}

const PaymentTable: React.FC<PaymentTableProps> = ({ paymentFilter }) => {
  // Filter payments based on status filter
  const filteredPayments = paymentFilter === 'all' 
    ? payments 
    : payments.filter(payment => payment.status === paymentFilter);
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Method
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredPayments.map((payment) => (
            <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-blue-600">{payment.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{payment.orderId}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{payment.customerName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{new Date(payment.date).toLocaleDateString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{payment.method}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{payment.amount}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  payment.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : payment.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                  <button className="p-1 rounded-md hover:bg-gray-100" title="Download Receipt">
                    <ArrowDownCircle className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-1 rounded-md hover:bg-gray-100" title="View Invoice">
                    <FileText className="w-4 h-4 text-gray-500" />
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
      
      {filteredPayments.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No payments found for this filter.</p>
        </div>
      )}
      
      <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Showing {filteredPayments.length} of {payments.length} payments
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

export default PaymentTable;