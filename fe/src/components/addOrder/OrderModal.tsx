import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import TourSearch from "./TourSearch";
import CustomerForm from "./CustomerForm";
import OrderSummary from "./OrderSummary";
import { Customer, Order, Tour } from "../../types/tour";
import { apiCreateOrder } from "../../store/services/authService";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  order?: Order;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, type, order }) => {
  const disabledInput = type === "view";
  const modalTitle = type === "edit" ? "Edit Order" : type === "view" ? "Order Detail" : "Create Order";

  const [selectedTour, setSelectedTour] = useState<Tour | null>(order?.tourDetail || null);
  const [customer, setCustomer] = useState<Customer>(order?.customer || {
    name: "",
    email: "",
    phone: "",
  });
  const [quantity, setQuantity] = useState(order?.quantity || 1);
  const [totalPrice, setTotalPrice] = useState(order?.totalPrice || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
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

  useEffect(() => {
    if (selectedTour) {
      setTotalPrice(selectedTour?.price * quantity);
    } else {
      setTotalPrice(0);
    }
  }, [selectedTour, quantity]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedTour) {
      newErrors.tour = "Please select a tour";
    }

    if (!customer.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!customer.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(customer.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!customer.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,}$/.test(customer.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (quantity < 1) {
      newErrors.quantity = "Quantity must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm() && selectedTour) {
      const order: Order = {
        tourId: selectedTour.id || 0,
        customer,
        quantity,
        totalPrice,
      };

      try {
        switch (type) {
          case "create":
            const resp = await apiCreateOrder(order);

            if (resp?.result?.code === 0) {
              onClose();
            } else {
              setIsSubmitting(false);
            }
            break;
          case "edit":
            // Handle edit order logic here
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Error submitting tour data:", error);
      }
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      // Reset form
      setSelectedTour(null);
      setCustomer({ name: "", email: "", phone: "" });
      setQuantity(1);
      setErrors({});
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${isVisible ? "opacity-50" : "opacity-0"}`}
        onClick={handleClose}
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
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-xl leading-6 font-bold text-gray-900 mb-4">
                  {modalTitle}
                </h3>

                {type !== "create" && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">
                      OrderCode: {order?.code || "N/A"}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <TourSearch
                    onSelectTour={setSelectedTour}
                    selectedTour={selectedTour}
                    disabledInput={disabledInput}
                  />
                  {errors.tour && (
                    <p className="mt-1 text-sm text-red-600">{errors.tour}</p>
                  )}

                  <CustomerForm
                    customer={customer}
                    onCustomerChange={setCustomer}
                    errors={errors}
                    disabledInput={disabledInput}
                  />

                  <OrderSummary
                    quantity={quantity}
                    onQuantityChange={setQuantity}
                    price={selectedTour?.price || 0}
                    totalPrice={totalPrice}
                    errors={errors}
                    disabledInput={disabledInput}
                  />

                  <div className="mt-8 sm:flex sm:flex-row-reverse">
                    {type !== "view" && <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>} 
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:w-auto sm:text-sm transition-colors"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
