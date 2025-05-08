import { Tour } from "../../types/tour";

interface TourCardProps {
    tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={tour.image} alt={tour.name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-bold">{tour.name}</h2>
                <p className="text-gray-600">{tour.description}</p>
                <p className="text-lg font-semibold mt-2">{`$${tour.price}`}</p>
            </div>
        </div>
    );
}

export default TourCard;