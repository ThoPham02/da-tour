import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { apiFilterOrder } from "../../../store/services/authService";
import { Order, Tour } from "../../../types/tour";
import { TOUR_LOCATION_LABELS } from "../../../common/const";
import { apiGetTourById } from "../../../store/services/authService";
import { getDate } from "../../../utils/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const BookedToursModal = ({ isOpen, onClose }: Props) => {
  const [bookings, setBookings] = useState<Order[]>([]);
  const [tourDetailsMap, setTourDetailsMap] = useState<Record<number, Tour>>({});

  useEffect(() => {
    if (isOpen) {
      const fetchBookings = async () => {
        try {
          const response = await apiFilterOrder({});
          console.log("Response:", response);
          if (response && Array.isArray(response.orders)) {
            setBookings(response.orders);
            
          } else {
            setBookings([]);
          }
          console.log("Bookings:", response.orders);
        } catch (error) {
          console.error("Không thể tải danh sách tour", error);
        }
      };

      fetchBookings();
    }
  }, [isOpen]);



  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-xl p-6 shadow-xl max-w-4xl w-full overflow-auto max-h-[90vh]">
          <Dialog.Title className="text-xl font-bold text-gray-800 mb-4">
            Tour đã đặt
          </Dialog.Title>

          {bookings.length === 0 ? (
            <p className="text-gray-500">Bạn chưa đặt tour nào.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-sm text-left">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 border">Ngày đặt</th>
                    <th className="px-4 py-2 border">Tên tour</th>
                    <th className="px-4 py-2 border">Ngày khởi hành</th>
                    <th className="px-4 py-2 border">Số lượng</th>
                    <th className="px-4 py-2 border">Thành tiền</th>
                    <th className="px-4 py-2 border">Đã trả</th>
                    <th className="px-4 py-2 border">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((order, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-4 py-2 border">{getDate(order.createDate || 0)}</td>
                      <td className="px-4 py-2 border">{order.tourName}</td>
                      <td className="px-4 py-2 border">{getDate(order.departureDate || 0)}</td>
                      <td className="px-4 py-2 border">{order.quantity}</td>
                      <td className="px-4 py-2 border">${order.totalPrice.toFixed(2)}</td>
                      <td className="px-4 py-2 border">${order.totalPrice.toFixed(2)}</td>
                      <td className="px-4 py-2 border">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${order.status === 0
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === 1
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-600"
                            }`}
                        >
                          {order.status === 0
                            ? "Chờ xác nhận"
                            : order.status === 1
                              ? "Đã xác nhận"
                              : "Đã hủy"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-red-500 transition"
            >
              Đóng
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default BookedToursModal;
