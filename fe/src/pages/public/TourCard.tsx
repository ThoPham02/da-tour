import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Tour } from "../../types/tour";
import { TOUR_LOCATION_LABELS } from "../../common/const";

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const navigate = useNavigate();

  const formattedStartDate = new Date(tour.departureDate).toLocaleDateString();

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition duration-300 hover:shadow-xl">
      <img src={tour.image} alt={tour.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex items-center mb-2">
          <MapPin className="w-5 h-5 text-red-600 mr-2" />
          <span className="text-gray-600">
            {TOUR_LOCATION_LABELS[tour.location]}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">{tour.name}</h3>
        <p className="text-gray-600 mb-4">{tour.description}</p>
        <div className="mb-4">
          <span className="text-gray-600 font-medium">Start Date: </span>
          <span className="text-gray-800">{formattedStartDate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-red-600">
            ${tour.price}
          </span>
          <button
            onClick={() => navigate(`/tour/${tour.id}`)}
            className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
