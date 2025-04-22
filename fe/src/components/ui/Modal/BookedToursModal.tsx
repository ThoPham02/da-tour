import { Dialog } from "@headlessui/react";

interface TourBooking {
  bookingDate: string;
  tourName: string;
  departureDate: string;
  quantity: number;
  totalAmount: number;
  paidAmount: number;
  status: "Chờ xác nhận" | "Đã xác nhận" | "Đã hủy";
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  bookings: TourBooking[];
}

const BookedToursModal = ({ isOpen, onClose, bookings }: Props) => {
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
                  {bookings.map((tour, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-4 py-2 border">{tour.bookingDate}</td>
                      <td className="px-4 py-2 border">{tour.tourName}</td>
                      <td className="px-4 py-2 border">{tour.departureDate}</td>
                      <td className="px-4 py-2 border">{tour.quantity}</td>
                      <td className="px-4 py-2 border">${tour.totalAmount.toFixed(2)}</td>
                      <td className="px-4 py-2 border">${tour.paidAmount.toFixed(2)}</td>
                      <td className="px-4 py-2 border">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            tour.status === "Chờ xác nhận"
                              ? "bg-yellow-100 text-yellow-800"
                              : tour.status === "Đã xác nhận"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {tour.status}
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
