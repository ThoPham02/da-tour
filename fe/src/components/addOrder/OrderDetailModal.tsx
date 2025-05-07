import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Order } from "../../types/tour";

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order?: Order | null;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        document.body.style.overflow = "";
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${isVisible ? "opacity-50" : "opacity-0"}`}
        onClick={onClose}
      ></div>

      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white px-6 pt-6 pb-8 sm:p-8">
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              Order Detail
            </h3>
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                <strong>Order Code:</strong> {order?.code}
              </p>
              <p>
                <strong>Tour Name:</strong> {order?.tourDetail?.name}
              </p>
              <p>
                <strong>Customer Name:</strong> {order?.customer.name}
              </p>
              <p>
                <strong>Email:</strong> {order?.customer.email}
              </p>
              <p>
                <strong>Phone:</strong> {order?.customer.phone}
              </p>
              <p>
                <strong>Quantity:</strong> {order?.quantity}
              </p>
              <p>
                <strong>Total Price:</strong> ${order?.totalPrice}
              </p>
              <p>
                <strong>Status:</strong> {order?.status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
