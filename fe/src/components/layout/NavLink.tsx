import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({
  to,
  icon,
  label,
  collapsed,
}) => {
  const location = useLocation();
  const isActive =
    location.pathname === to ||
    (to === "/admin/dashboard" && location.pathname === "/");

  return (
    <li>
      <Link
        to={to}
        className={`flex items-center p-2 rounded-md transition-colors duration-200 ${
          isActive
            ? "bg-red-50 text-red-600"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <span className="flex items-center justify-center">{icon}</span>
        {!collapsed && <span className="ml-3">{label}</span>}
      </Link>
    </li>
  );
};
