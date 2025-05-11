import React, { useState, useEffect } from "react";
import { Itinerary } from "../../types/tour";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface TourItineraryProps {
  itinerary: Itinerary[];
  onChange: (itineraries: Itinerary[]) => void;
  errors?: {};
  disabled: boolean;
}

const TourItinerary: React.FC<TourItineraryProps> = ({
  itinerary,
  onChange,
  disabled,
}) => {
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({});
  console.log("TourItinerary component mounted or updated", itinerary);

  useEffect(() => {
    if (itinerary?.length > 0) {
      const initialExpanded: Record<number, boolean> = {};
      itinerary.forEach((day) => {
        initialExpanded[day.id] = true;
      });
      setExpandedDays(initialExpanded);
    }
  }, [itinerary]);

  const toggleDayExpansion = (dayId: number) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayId]: !prev[dayId],
    }));
  };

  const addDay = () => {
    const newDay: Itinerary = {
      id: Date.now(),
      title: `Day ${itinerary.length + 1}`,
      description: "",
    };

    onChange([...itinerary, newDay]);
    setExpandedDays((prev) => ({
      ...prev,
      [newDay.id]: true,
    }));
  };

  const removeDay = (id: number) => {
    const updatedItinerary = itinerary
      .filter((day) => day.id !== id)
      .map((day, index) => ({
        ...day,
        title: `Day ${index + 1}${day.title.replace(/^Day \d+/, "")}`,
      }));

    onChange(updatedItinerary);
  };

  const updateDay = (id: number, data: Partial<Itinerary>) => {
    const updatedItinerary = itinerary.map((day) =>
      day.id === id ? { ...day, ...data } : day
    );
    onChange(updatedItinerary);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">
          Daily Itinerary <span className="text-red-500">*</span>
        </h3>
        <button
          type="button"
          onClick={addDay}
          className="flex items-center gap-1 text-sm bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors"
          disabled={disabled}
        >
          <Plus size={16} />
          <span>Add Day</span>
        </button>
      </div>

      <div className="space-y-4">
        {itinerary.length === 0 && (
          <p className="text-sm text-gray-500 italic">
            No itinerary days added yet.
          </p>
        )}

        {itinerary.map((day, index) => (
          <div
            key={day.id}
            className="border border-gray-200 rounded-md overflow-hidden"
          >
            <div
              className="flex items-center justify-between bg-gray-50 p-3 cursor-pointer"
              onClick={() => toggleDayExpansion(day.id)}
            >
              <div className="flex items-center gap-2">
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                  Day {index + 1}
                </span>
                <input
                  type="text"
                  value={day.title?.replace(/^Day \d+\s*/, "")}
                  onChange={(e) =>
                    updateDay(day.id, {
                      title: `Day ${index + 1} ${e.target.value}`,
                    })
                  }
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-800 font-medium bg-transparent border-none p-0 focus:ring-0 min-w-0 flex-1"
                  placeholder="Day title..."
                  disabled={disabled}
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeDay(day.id);
                  }}
                  className="text-gray-400 hover:text-red-600"
                  disabled={disabled}
                >
                  <Trash2 size={18} />
                </button>
                {expandedDays[day.id] ? (
                  <ChevronUp size={18} className="text-gray-500" />
                ) : (
                  <ChevronDown size={18} className="text-gray-500" />
                )}
              </div>
            </div>

            {expandedDays[day.id] && (
              <div className="p-4 space-y-4 bg-white">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={day.description}
                    onChange={(e) =>
                      updateDay(day.id, { description: e.target.value })
                    }
                    rows={3}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                    placeholder="What will travelers experience this day..."
                    disabled={disabled}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourItinerary;
