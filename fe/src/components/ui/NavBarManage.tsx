import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdPayment } from "react-icons/md";
import { LiaFileContractSolid } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
import { FiCalendar } from "react-icons/fi";

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
            icon: <LiaFileContractSolid className="text-3xl" />,
            label: "Hợp đồng",
            path: ROUTE_PATHS.HOME,
          },
          {
            icon: <MdPayment className="text-3xl" />,
            label: "Thanh toán",
            path: ROUTE_PATHS.HOME,
          },
          {
            icon: <FiCalendar className="text-3xl" />,
            label: "Lịch hẹn",
            path: ROUTE_PATHS.HOME,
          },
          {
            icon: <IoSettingsOutline className="text-3xl" />,
            label: "Cài đặt",
            path: ROUTE_PATHS.HOME,
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
                <h1 className="text-xl font-bold ml-4 uppercase whitespace-nowrap">
                  Nhà Trọ <br /> HUMG
                </h1>
              )}
            </div>
          </Link>

          <div className="flex-grow">
            <ul className="list-unstyled">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`p-4 hover:text-blue-700 cursor-pointer ${
                    currentPage === item.path ? "text-blue-700" : ""
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
