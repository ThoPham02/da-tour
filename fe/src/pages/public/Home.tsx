import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MapPin,
  Star,
  Users,
  Phone,
  Mail,
  Calendar,
  LogIn,
  Send,
} from "lucide-react";

import BgImg1 from "../../assets/images/bg-1.png";
import { ROUTE_PATHS } from "../../common/path";
import { RootState } from "../../store/redux";
import { USER_ROLES } from "../../common/const";
import User from "../../components/layout/User";

function Home() {
  const navigate = useNavigate();

  const { isLogined, user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.role === USER_ROLES.ADMIN;

  useEffect(() => {
    isAdmin && navigate(ROUTE_PATHS.MANAGE_DASHBOARD);
  }, [isAdmin, navigate]);

  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ fullname: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      {isLogined ? (
        <User />
      ) : (
        <div className="fixed top-0 right-0 p-6 z-50">
          <button
            onClick={() => navigate(`${ROUTE_PATHS.LOGIN}`)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition duration-300 flex items-center"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </button>
        </div>
      )}

      {/* Hero Section */}
      <div
        className="h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${BgImg1})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-6">探索中国的神奇之美</h1>
              <p className="text-2xl mb-2">Discover the Magic of China</p>
              <p className="text-xl mb-8">
                Experience ancient wonders, vibrant cities, and timeless
                traditions
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-300">
                Explore Tours
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Tours */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Popular China Tours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg transition duration-300 hover:shadow-xl"
              >
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <MapPin className="w-5 h-5 text-red-600 mr-2" />
                    <span className="text-gray-600">{tour.location}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{tour.name}</h3>
                  <p className="text-gray-600 mb-4">{tour.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-red-600">
                      ${tour.price}
                    </span>
                    <button
                      onClick={() => navigate(`/tour/${index + 1}`)}
                      className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Our China Tours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Local Expertise</h3>
              <p className="text-gray-600">
                Native guides with deep cultural knowledge
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Small Groups</h3>
              <p className="text-gray-600">
                Intimate tours with personalized attention
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Authentic Experiences</h3>
              <p className="text-gray-600">
                Immersive cultural activities and local interactions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-red-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Begin Your Chinese Adventure
            </h2>
            <p className="text-xl">
              Contact us to plan your perfect journey through China
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg p-8 shadow-lg"
            >
              <div className="mb-6">
                <label
                  htmlFor="fullname"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500 h-32 resize-none"
                  placeholder="Enter your message"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </form>
          </div>

          <div className="flex justify-center space-x-8 mt-12">
            <a
              href="tel:+1234567890"
              className="flex items-center hover:text-red-200 transition duration-300"
            >
              <Phone className="w-6 h-6 mr-2" />
              +1 234 567 890
            </a>
            <a
              href="mailto:info@chinatours.com"
              className="flex items-center hover:text-red-200 transition duration-300"
            >
              <Mail className="w-6 h-6 mr-2" />
              info@chinatours.com
            </a>
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
    description:
      "5-day adventure exploring the most scenic sections of the Great Wall",
    price: "1299",
    image:
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80",
  },
  {
    name: "Terracotta Warriors & Xi'an",
    location: "Xi'an",
    description:
      "4-day journey discovering ancient warriors and Tang Dynasty culture",
    price: "999",
    image:
      "https://images.unsplash.com/photo-1591014935536-c4702580aeca?auto=format&fit=crop&q=80",
  },
  {
    name: "Shanghai City Experience",
    location: "Shanghai",
    description: "3-day exploration of China's most dynamic and modern city",
    price: "899",
    image:
      "https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?auto=format&fit=crop&q=80",
  },
];

export default Home;
