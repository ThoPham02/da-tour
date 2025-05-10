import React, { useState } from 'react';
import { Shield, Coffee, Camera } from 'lucide-react';
import { TOUR_LOCATION_LABELS } from '../../common/const';
import { Tour, Order } from '../../types/tour';
import { apiCreateOrder } from '../../store/services/authService';
import { getDate } from "../../utils/utils";

type OrderSectionProps = {
  tourDetail: Tour;
};

const OrderSection: React.FC<OrderSectionProps> = ({ tourDetail }) => {
  const [orderData, setOrderData] = useState<Partial<Order> & {
    date: string;
    travelers: number;
    name: string;
    email: string;
    phone: string;
  }>({
    tourId: tourDetail.id!,
    date: '',
    travelers: 1,
    name: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: name === 'travelers' ? parseInt(value) : value,
    }));
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalOrder: Order = {
      tourId: orderData.tourId!,
      customer: {
        name: orderData.name,
        email: orderData.email,
        phone: orderData.phone,
      },
      quantity: orderData.travelers,
      totalPrice: tourDetail.price * orderData.travelers,
      fullName: orderData.name,
      tourName: tourDetail.name,
    };

    const result = await apiCreateOrder(finalOrder);
    console.log(result);
  };

  return (
    <div className="py-20 bg-gray-50" id="booking">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Book Your Adventure</h2>
            <p className="text-xl text-gray-600">
              Secure your spot on this amazing journey through China
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Tour Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tour Price</span>
                    <span className="font-semibold">${tourDetail.price}/person</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">{tourDetail.duration} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Location</span>
                    <span className="font-semibold">
                      {TOUR_LOCATION_LABELS[tourDetail.location]}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">Why Book With Us</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Shield className="w-6 h-6 text-red-600 mr-3" />
                    <span>Secure Payment Protection</span>
                  </div>
                  <div className="flex items-center">
                    <Coffee className="w-6 h-6 text-red-600 mr-3" />
                    <span>24/7 Customer Support</span>
                  </div>
                  <div className="flex items-center">
                    <Camera className="w-6 h-6 text-red-600 mr-3" />
                    <span>Photo Opportunities Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleBooking} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Start Date
                  </label>
                  <input
                    type="text"
                    name="date"
                    value={getDate(new Date(tourDetail.departureDate).getTime())}
                    readOnly
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Number of Travelers</label>
                  <input
                    type="number"
                    name="travelers"
                    min="1"
                    value={orderData.travelers}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={orderData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={orderData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={orderData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center text-lg mb-4">
                  <span className="font-semibold">Total Amount</span>
                  <span className="text-2xl font-bold text-red-600">
                    ${tourDetail.price * orderData.travelers}
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300"
                >
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSection;
