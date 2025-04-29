import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import TabNavigation from './TabNavigation';
import TourBasicInfo from './TourBasicInfo';
import TourDetails from './TourDetails';
import TourItinerary from './TourItinerary';
import TourPricing from './TourPricing';
import { Tour, Itinerary, Activity, Service } from '../types/tour';

interface TourFormProps {
  onClose: () => void;
}

const TourForm: React.FC<TourFormProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [tour, setTour] = useState<Tour>({
    image: '',
    name: '',
    description: '',
    duration: 0,
    location: '',
    overview: '',
    activities: [],
    services: [],
    itinerary: [],
    price: 0,
    seats: 0,
    departureDate: ''
  });

  const handleImageUpload = (imageUrl: string) => {
    setTour({...tour, image: imageUrl});
  };

  const handleBasicInfoChange = (basicInfo: Partial<Tour>) => {
    setTour({...tour, ...basicInfo});
  };

  const handleActivitiesChange = (activities: Activity[]) => {
    setTour({...tour, activities});
  };

  const handleServicesChange = (services: Service[]) => {
    setTour({...tour, services});
  };

  const handleItineraryChange = (itinerary: Itinerary[]) => {
    setTour({...tour, itinerary});
  };

  const handlePricingChange = (pricing: Partial<Tour>) => {
    setTour({...tour, ...pricing});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Submitting tour:', tour);
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', content: <TourBasicInfo tour={tour} onChange={handleBasicInfoChange} /> },
    { id: 'details', label: 'Tour Details', content: <TourDetails 
      tour={tour} 
      onActivitiesChange={handleActivitiesChange} 
      onServicesChange={handleServicesChange} 
    /> },
    { id: 'itinerary', label: 'Itinerary', content: <TourItinerary itinerary={tour.itinerary} onChange={handleItineraryChange} /> },
    { id: 'pricing', label: 'Pricing & Availability', content: <TourPricing tour={tour} onChange={handlePricingChange} /> },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ImageUpload onImageUpload={handleImageUpload} currentImage={tour.image} />
      
      <div className="mt-8">
        <TabNavigation 
          tabs={tabs.map(tab => ({ id: tab.id, label: tab.label }))} 
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        
        <div className="mt-4 p-4 bg-gray-50 rounded-md min-h-[300px]">
          {tabs[activeTab].content}
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors disabled:opacity-70"
        >
          {isSubmitting ? 'Saving...' : 'Save Tour'}
        </button>
      </div>
    </form>
  );
};

export default TourForm;