import React from "react";
import { Bell, Search } from "lucide-react";
import User from "./User";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center px-4">
      <div className="ml-auto flex items-center space-x-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>

        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell className="h-5 w-5 text-gray-600" />
        </button>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            {/* <User className="h-5 w-5" /> */}
            <User />
          </div>
          <span className="hidden md:inline text-sm font-medium text-gray-700">
            Admin User
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
