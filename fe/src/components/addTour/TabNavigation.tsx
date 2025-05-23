import React from "react";
import { AlertCircle } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  hasError?: boolean;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: number;
  onChange: (index: number) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onChange,
}) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px space-x-8">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap flex items-center gap-2
              ${
                activeTab === index
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            onClick={() => onChange(index)}
            type="button"
          >
            {tab.label}
            {tab.hasError && <AlertCircle size={16} className="text-red-500" />}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;
