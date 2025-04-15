import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineDashboardCustomize, MdPerson, MdShoppingCart, MdPayment, MdTravelExplore  } from "react-icons/md";

import logo from "../../assets/images/logo.png";
import { ROUTE_PATHS } from "../../common/path";
import { USER_ROLES } from "../../common/const";
import { RootState } from "../../store/redux";

interface NavBarManageProps {
  isExpanded: boolean;
}

interface MenuItem {
  icon: React.ReactElement;
  label: string;
  path: string;
}

const NavBarManage: React.FC<NavBarManageProps> = ({ isExpanded }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const { currentPage } = useSelector((state: RootState) => state.app);

  const menuItems: MenuItem[] =
    user?.role !== USER_ROLES.ADMIN
      ? [
          {
            icon: <MdOutlineDashboardCustomize className="text-3xl" />,
            label: "Dashboard",
            path: ROUTE_PATHS.MANAGE_DASHBOARD,
          },
          {
            icon: <MdTravelExplore className="text-3xl" />,
            label: "Sản phẩm",
            path: ROUTE_PATHS.MANAGE_TOUR,
          },
          {
            icon: <MdShoppingCart className="text-3xl" />,
            label: "Đơn hàng",
            path: ROUTE_PATHS.MANAGE_ORDER,
          },
          {
            icon: <MdPerson className="text-3xl" />,
            label: "Khách hàng",
            path: ROUTE_PATHS.MANAGE_USER,
          },
          {
            icon: <MdPayment className="text-3xl" />,
            label: "Thanh toán",
            path: ROUTE_PATHS.MANAGE_PAYMENT,
          },
        ]
      : [];

  const shouldExpand = isExpanded || isHovered;

  return (
    <div>
      <div
        className={`fixed top-0 left-0 h-screen transition-width duration-300 ${
          shouldExpand ? "w-260" : "w-80"
        } shadow-custom bg-white z-50`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col h-full text-black">
          <Link to={ROUTE_PATHS.ROOT}>
            <div
              className={`flex items-center p-4 ${
                shouldExpand ? "text-left" : "text-center justify-center"
              } h-70`}
            >
              <img
                src={logo}
                alt="logo"
                className={`rounded-full ${
                  shouldExpand ? "w-16 h-16" : "w-8 h-8"
                }`}
              />
              {shouldExpand && (
                <h1 className="text-xl font-bold ml-4 uppercase whitespace-nowrap text-red-600">
                  China Tour <br/> Admin
                </h1>
              )}
            </div>
          </Link>

          <div className="flex-grow">
            <ul className="list-unstyled">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`p-4 hover:text-red-600 cursor-pointer font-semibold ${
                    currentPage === item.path ? "text-red-600" : ""
                  } ${shouldExpand ? "justify-start" : "justify-center"}`}
                >
                  <Link to={item.path} className="flex items-center">
                    {item.icon}
                    {shouldExpand && (
                      <span className="ml-4 whitespace-nowrap">{item.label}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        className={`h-screen transition-width duration-300 ${
          shouldExpand ? "w-260" : "w-80"
        }`}
      ></div>
    </div>
  );
};

export default NavBarManage;
