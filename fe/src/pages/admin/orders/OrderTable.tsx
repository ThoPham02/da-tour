import React, { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
import { Order } from "../../../types/tour";
import { getDate } from "../../../utils/utils";
import { ORDER_STATUS, ORDER_STATUS_TEXT } from "../../../common/const";
import OrderActionButton from "./OrderActionButton";
import OrderModal from "../../../components/addOrder/OrderModal";
import OrderDetailModal from "../../../components/addOrder/OrderDetailModal";

interface OrderTableProps {
  statusFilter: number;
  orders: Order[];
}

const ORDER_PER_PAGE = 10;

const OrderTable: React.FC<OrderTableProps> = ({ statusFilter, orders }) => {
  const filteredOrders =
    statusFilter === 0
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  const [openActionId, setOpenActionId] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [selectOrder, setSelectOrder] = useState<Order | null>(null);

  const totalPages = Math.ceil(filteredOrders.length / ORDER_PER_PAGE);
  const startIndex = (currentPage - 1) * ORDER_PER_PAGE;
  const endIndex = startIndex + ORDER_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Order ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Customer
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Tour
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              People
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Amount
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Paid
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedOrders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-blue-600">
                  {order.code}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {order.fullName}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{order.tourName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {getDate(order.createDate || 0)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  ${order.totalPrice}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  ${order.totalPrice}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === ORDER_STATUS.CONFIRMED
                      ? "bg-blue-100 text-blue-800"
                      : order.status === ORDER_STATUS.PENDING
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === ORDER_STATUS.COMPLETED
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                  }`}
                >
                  {ORDER_STATUS_TEXT[order.status || 0]}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative ">
                <div
                  className="inline-block cursor-pointer"
                  onMouseEnter={() => setOpenActionId(order.id || 0)}
                  onMouseLeave={() => setOpenActionId(0)}
                >
                  <MoreVertical className="w-5 h-5 text-gray-500 hover:text-gray-800" />
                  {openActionId === order.id && (
                    <OrderActionButton
                      orderID={order.id || 0}
                      orderStatus={order?.status || 0}
                      setModel={setIsModelOpen}
                      setSelectOrder={setSelectOrder}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <OrderDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModelOpen(false)}
        order={selectOrder}
      />

      {filteredOrders.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No tours found for this filter.</p>
        </div>
      )}

      <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 pt-8 mb-8">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1} to{" "}
          {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length}{" "}
          orders
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

export default OrderTable;
