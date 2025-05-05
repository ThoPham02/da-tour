import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import TabNavigation from "./TabNavigation";
import TourBasicInfo from "./TourBasicInfo";
import TourDetails from "./TourDetails";
import TourItinerary from "./TourItinerary";
import TourPricing from "./TourPricing";
import {
  Tour,
  Itinerary,
  Activity,
  Service,
  ValidationErrors,
} from "../../types/tour";
import { tourSchema } from "../../validation/tourSchema";
import { apiCreateTour } from "../../store/services/authService";

interface TourFormProps {
  onClose: () => void;
}

const TourForm: React.FC<TourFormProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [tabErrors, setTabErrors] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const [tour, setTour] = useState<Tour>({
    image: "",
    name: "",
    description: "",
    duration: 0,
    location: 0,
    overview: "",
    activities: [],
    services: [],
    itinerary: [],
    price: 0,
    quantity: 0,
    departureDate: "",
  });

  const validateForm = async () => {
    try {
      await tourSchema.validate(tour, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof Error) {
        const yupError = err as any;
        const newErrors: ValidationErrors = {};

        yupError.inner.forEach((error: any) => {
          newErrors[error.path] = error.message;
        });

        setErrors(newErrors);
        return false;
      }
      return false;
    }
  };

  const updateTabErrors = () => {
    const basicInfoHasError =
      !tour.name ||
      !tour.description ||
      !tour.duration ||
      !tour.location ||
      !tour.overview;
    const detailsHasError =
      tour.activities.length === 0 || tour.services.length === 0;
    const itineraryHasError = tour.itinerary.length === 0;
    const pricingHasError = !tour.price || !tour.quantity || !tour.departureDate;

    setTabErrors([
      basicInfoHasError,
      detailsHasError,
      itineraryHasError,
      pricingHasError,
    ]);
  };

  useEffect(() => {
    updateTabErrors();
  }, [tour]);

  const handleImageUpload = (imageUrl: string) => {
    setTour({ ...tour, image: imageUrl });
  };

  const handleBasicInfoChange = (basicInfo: Partial<Tour>) => {
    setTour({ ...tour, ...basicInfo });
  };

  const handleActivitiesChange = (activities: Activity[]) => {
    setTour({ ...tour, activities });
  };

  const handleServicesChange = (services: Service[]) => {
    setTour({ ...tour, services });
  };

  const handleItineraryChange = (itinerary: Itinerary[]) => {
    setTour({ ...tour, itinerary });
  };

  const handlePricingChange = (pricing: Partial<Tour>) => {
    setTour({ ...tour, ...pricing });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isValid = await validateForm();
    if (!isValid) {
      setIsSubmitting(false);
      // Find the first tab with an error and switch to it
      const firstErrorTab = tabErrors.findIndex((error) => error);
      if (firstErrorTab !== -1) {
        setActiveTab(firstErrorTab);
      }
      // return;
    }

    try {
      const resp = await apiCreateTour(tour);

      if (resp?.result?.code === 0) {
        onClose();
      } else {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting tour data:", error);
    }
  };

  const tabs = [
    { id: "basic", label: "Basic Info", hasError: tabErrors[0] },
    { id: "details", label: "Tour Details", hasError: tabErrors[1] },
    { id: "itinerary", label: "Itinerary", hasError: tabErrors[2] },
    { id: "pricing", label: "Pricing & Availability", hasError: tabErrors[3] },
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <TourBasicInfo
            tour={tour}
            onChange={handleBasicInfoChange}
            errors={errors}
          />
        );
      case 1:
        return (
          <TourDetails
            tour={tour}
            onActivitiesChange={handleActivitiesChange}
            onServicesChange={handleServicesChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <TourItinerary
            itinerary={tour.itinerary}
            onChange={handleItineraryChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <TourPricing
            tour={tour}
            onChange={handlePricingChange}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ImageUpload
        onImageUpload={handleImageUpload}
        currentImage={tour.image}
        error={errors.image}
      />

      <div className="mt-8">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="mt-4 p-4 bg-gray-50 rounded-md min-h-[300px]">
          {getTabContent()}
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
          {isSubmitting ? "Saving..." : "Save Tour"}
        </button>
      </div>
    </form>
  );
};

export default TourForm;
