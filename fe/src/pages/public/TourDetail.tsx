import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin, Calendar, Users, ArrowLeft, Star, Ratio,
  Utensils, Hotel, Bus, Camera, Coffee, Shield
} from 'lucide-react';
import { apiGetTourById } from "../../store/services/authService";
import { Tour } from '../../types/tour';
import { TOUR_LOCATION_LABELS } from "../../common/const";
import OrderSection from './OrderSection';


function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tourDetail, setTourDetail] = useState<Tour | null>(null);

  const fetchTour = async () => {
    try {
      if (!id) return;
      const response = await apiGetTourById(Number(id));
      setTourDetail(response);
      console.log('Tour detail:', response);
      // console.log('Tour ID:', response?.itineraries);
    } catch (error) {
      console.error('Lỗi khi fetch tour:', error);
    }
  };

  useEffect(() => {
    fetchTour();
  }, [id]);

  const [bookingData, setBookingData] = useState({
    date: '',
    travelers: 1,
    name: '',
    email: '',
    phone: ''
  });

  if (!tourDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Tour not found</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center text-red-600 hover:text-red-700"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Tours
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="fixed top-0 left-0 p-6 z-50">
        <button
          onClick={() => navigate('/')}
          className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-gray-800 hover:text-red-600 transition-colors flex items-center shadow-md"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Tours
        </button>
      </div>

      {/* Hero Section */}
      <div
        className="h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${tourDetail.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-3xl">
              <h1 className="text-6xl font-bold mb-6">{tourDetail.name}</h1>
              <p className="text-2xl mb-8">{tourDetail.description}</p>
              <div className="flex items-center space-x-8 text-lg">
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 mr-2" />
                  {TOUR_LOCATION_LABELS[tourDetail.location]}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-6 h-6 mr-2" />
                  <span>{tourDetail.duration} days</span>
                </div>
                <div className="flex items-center">
                  {/* <Star className="w-6 h-6 mr-2 text-yellow-400" /> */}
                  {/* <span>{tourDetail.rating} ({tourDetail.reviews} reviews)</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Tour Overview</h2>
            <p className="text-xl text-gray-600 leading-relaxed">{tourDetail.overview}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {tourDetail.activities?.map((activity, index) => (
              <div
                key={activity.id || index}
                className="bg-gray-50 p-6 rounded-xl flex flex-col items-center justify-center text-center"
              >
                <Star className="w-8 h-8 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                <p className="text-gray-600">{activity.detail}</p>
              </div>
            ))}
          </div>



        </div>
      </div>

      {/* Service Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tourDetail.services?.map((service) => (
              <div key={service.id} className="text-center">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Ratio className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description || 'No detail provided'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Itinerary Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Your Journey</h2>
          <div className="max-w-4xl mx-auto">
            {tourDetail.itineraries?.map((day, index) => (
              <div key={day.id} className="relative pl-8 pb-12 last:pb-0">
                <div className="absolute left-0 top-0 h-full w-px bg-red-600"></div>
                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-red-600 -translate-x-1/2"></div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold mb-4">{day.name || `Day ${index + 1}`}</h3>
                  <p className="text-gray-600 leading-relaxed">{day.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <OrderSection
        tourDetail={tourDetail}
      />


    </div>
  );
}

export default TourDetail;