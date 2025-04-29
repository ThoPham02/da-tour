import React from "react";
import {
  LayoutDashboard,
  MapPin,
  ShoppingBag,
  CreditCard,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "./NavLink";

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-20 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <div
          className={`flex items-center ${collapsed ? "justify-center w-full" : ""}`}
        >
          {!collapsed && (
            <h1 className="text-xl font-bold text-red-600">China Tours</h1>
          )}
          {collapsed && <MapPin className="w-8 h-8 text-red-600" />}
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none ml-8"
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
      </div>
      <nav className="p-3">
        <ul className="space-y-2">
          <NavLink
            to="/admin/dashboard"
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Dashboard"
            collapsed={collapsed}
          />
          <NavLink
            to="/admin/tours"
            icon={<MapPin className="w-5 h-5" />}
            label="Tours"
            collapsed={collapsed}
          />
          <NavLink
            to="/admin/orders"
            icon={<ShoppingBag className="w-5 h-5" />}
            label="Orders"
            collapsed={collapsed}
          />
          <NavLink
            to="/admin/payments"
            icon={<CreditCard className="w-5 h-5" />}
            label="Payments"
            collapsed={collapsed}
          />
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
