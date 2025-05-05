import React, { useState } from "react";
import { Tour, Activity, Service } from "../../types/tour";
import { Plus, Trash2 } from "lucide-react";

interface TourDetailsProps {
  tour: Tour;
  onActivitiesChange: (activities: Activity[]) => void;
  onServicesChange: (services: Service[]) => void;
  errors?: {};
}

const TourDetails: React.FC<TourDetailsProps> = ({
  tour,
  onActivitiesChange,
  onServicesChange,
}) => {
  const [newActivity, setNewActivity] = useState("");
  const [newService, setNewService] = useState("");

  const addActivity = () => {
    if (newActivity.trim()) {
      const updatedActivities = [
        ...tour?.activities || [],
        { id: Date.now(), name: newActivity.trim() },
      ];
      onActivitiesChange(updatedActivities);
      setNewActivity("");
    }
  };

  const removeActivity = (id: number) => {
    const updatedActivities = tour?.activities?.filter(
      (activity) => activity.id !== id
    ) || [];
    onActivitiesChange(updatedActivities);
  };

  const addService = () => {
    if (newService.trim()) {
      const updatedServices = [
        ...tour?.services || [],
        { id: Date.now(), name: newService.trim() },
      ];
      onServicesChange(updatedServices);
      setNewService("");
    }
  };

  const removeService = (id: number) => {
    const updatedServices = tour?.services?.filter(
      (service) => service.id !== id
    ) || [];
    onServicesChange(updatedServices);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    action: () => void
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Tour Activities <span className="text-red-500">*</span>
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, addActivity)}
              className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500"
              placeholder="Add an activity..."
            />
            <button
              type="button"
              onClick={addActivity}
              className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="space-y-2">
            {tour?.activities?.length === 0 && (
              <p className="text-sm text-gray-500 italic">
                No activities added yet.
              </p>
            )}

            {tour?.activities?.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md group"
              >
                <span>{activity.name}</span>
                <button
                  type="button"
                  onClick={() => removeActivity(activity.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-opacity"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Included Services <span className="text-red-500">*</span>
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, addService)}
              className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500"
              placeholder="Add a service..."
            />
            <button
              type="button"
              onClick={addService}
              className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="space-y-2">
            {tour?.services?.length === 0 && (
              <p className="text-sm text-gray-500 italic">
                No services added yet.
              </p>
            )}

            {tour?.services?.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md group"
              >
                <span>{service.name}</span>
                <button
                  type="button"
                  onClick={() => removeService(service.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-opacity"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
