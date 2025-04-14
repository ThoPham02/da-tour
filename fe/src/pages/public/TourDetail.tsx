import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, ArrowLeft, Star, Utensils, Hotel, Bus, Camera, Coffee, Shield } from 'lucide-react';

function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tourIndex = parseInt(id!) - 1;
  const tour = tours[tourIndex];

  const [bookingData, setBookingData] = useState({
    date: '',
    travelers: 1,
    name: '',
    email: '',
    phone: ''
  });

  if (!tour) {
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

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', bookingData);
    // Add booking logic here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
        style={{ backgroundImage: `url(${tour.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-3xl">
              <h1 className="text-6xl font-bold mb-6">{tour.name}</h1>
              <p className="text-2xl mb-8">{tour.description}</p>
              <div className="flex items-center space-x-8 text-lg">
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 mr-2" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-6 h-6 mr-2" />
                  <span>{tour.duration} days</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-6 h-6 mr-2 text-yellow-400" />
                  <span>{tour.rating} ({tour.reviews} reviews)</span>
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
            <p className="text-xl text-gray-600 leading-relaxed">{tour.fullDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {tour.highlights.map((highlight, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <Star className="w-8 h-8 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{highlight}</h3>
                <p className="text-gray-600">Experience the magic of {highlight.toLowerCase()} with our expert guides.</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Hotel className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Luxury Hotels</h3>
              <p className="text-gray-600">4-5 star accommodations throughout your journey</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Utensils className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gourmet Meals</h3>
              <p className="text-gray-600">Traditional Chinese cuisine and international options</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Bus className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transportation</h3>
              <p className="text-gray-600">Comfortable private vehicles and transfers</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Guides</h3>
              <p className="text-gray-600">Professional English-speaking tour guides</p>
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Your Journey</h2>
          <div className="max-w-4xl mx-auto">
            {tour.itinerary.map((day, index) => (
              <div key={index} className="relative pl-8 pb-12 last:pb-0">
                <div className="absolute left-0 top-0 h-full w-px bg-red-600"></div>
                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-red-600 -translate-x-1/2"></div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold mb-4">Day {index + 1}</h3>
                  <p className="text-gray-600 leading-relaxed">{day}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="py-20 bg-gray-50" id="booking">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Book Your Adventure</h2>
              <p className="text-xl text-gray-600">Secure your spot on this amazing journey through China</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Tour Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tour Price</span>
                      <span className="font-semibold">${tour.price}/person</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-semibold">{tour.duration} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Location</span>
                      <span className="font-semibold">{tour.location}</span>
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
                      Select Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={bookingData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Number of Travelers
                    </label>
                    <input
                      type="number"
                      name="travelers"
                      min="1"
                      value={bookingData.travelers}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={bookingData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingData.phone}
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
                      ${parseInt(tour.price) * bookingData.travelers}
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
    </div>
  );
}

const tours = [
  {
    name: "Great Wall Explorer",
    location: "Beijing",
    description: "5-day adventure exploring the most scenic sections of the Great Wall",
    fullDescription: "Embark on an unforgettable journey along China's most iconic monument. This carefully crafted tour takes you to both famous and lesser-known sections of the Great Wall, offering unique perspectives and photo opportunities. Experience the wall during sunrise and sunset, and learn about its rich history from expert local guides.",
    price: "1299",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80",
    duration: 5,
    rating: 4.8,
    reviews: 124,
    highlights: [
      "Mutianyu Section",
      "Sunrise viewing",
      "Local village visit",
      "Traditional dinner",
      "Photography spots",
      "Expert guides"
    ],
    itinerary: [
      "Arrival in Beijing, welcome dinner and orientation",
      "Explore Mutianyu section, including toboggan ride down",
      "Hike the wild wall at Jinshanling",
      "Visit local villages and learn about wall history",
      "Sunrise at Simatai and departure"
    ]
  },
  {
    name: "Terracotta Warriors & Xi'an",
    location: "Xi'an",
    description: "4-day journey discovering ancient warriors and Tang Dynasty culture",
    fullDescription: "Step back in time to the glory days of ancient China as you discover the incredible Terracotta Warriors and the rich cultural heritage of Xi'an. This tour combines archaeological wonders with immersive cultural experiences, from traditional dumpling making to cycling the ancient city walls.",
    price: "999",
    image: "https://images.unsplash.com/photo-1591014935536-c4702580aeca?auto=format&fit=crop&q=80",
    duration: 4,
    rating: 4.9,
    reviews: 89,
    highlights: [
      "Terracotta Warriors",
      "City Wall cycling",
      "Muslim Quarter",
      "Dumpling making",
      "Tang Dynasty show",
      "Local markets"
    ],
    itinerary: [
      "Arrival and Muslim Quarter food tour",
      "Full day at Terracotta Warriors",
      "City wall cycling and dumpling class",
      "Morning market and departure"
    ]
  },
  {
    name: "Shanghai City Experience",
    location: "Shanghai",
    description: "3-day exploration of China's most dynamic and modern city",
    fullDescription: "Discover the perfect blend of old and new in China's most cosmopolitan city. From the historic Bund to futuristic Pudong, experience Shanghai's unique character. This tour includes hidden local spots, modern art galleries, and traditional gardens, showcasing the city's fascinating contrasts.",
    price: "899",
    image: "https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?auto=format&fit=crop&q=80",
    duration: 3,
    rating: 4.7,
    reviews: 156,
    highlights: [
      "The Bund",
      "Yu Garden",
      "Pudong skyline",
      "Local breakfast",
      "Art galleries",
      "River cruise"
    ],
    itinerary: [
      "Arrival, Bund tour, and river cruise",
      "Yu Garden, local breakfast, and Pudong",
      "Morning market and art district visit"
    ]
  }
];

export default TourDetail;