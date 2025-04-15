import React, { useEffect, MouseEvent } from "react";
import { TfiViewList } from "react-icons/tfi";

interface HeaderManageProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

interface HeaderButtonProps {
  icon: React.ReactElement;
  onClick: () => void;
}

const HeaderManage: React.FC<HeaderManageProps> = ({
  isExpanded,
  setIsExpanded,
}) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | MouseEvent) => {
    //   if (
    //     notificationRef.current &&
    //     !(notificationRef.current as any).contains(event.target)
    //   ) {
    //     setIsNotificationOpen(false);
    //   }
    };

    document.addEventListener("mousedown", handleClickOutside as any);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside as any);
    };
  }, []);

  return (
    <div>
      <header
        className={`fixed flex items-center justify-between h-70 px-4 bg-gray-300 z-20 transition-width duration-300 w-full ${
          isExpanded ? "width260px" : "width80px"
        }`}
      >
        <div className="flex items-center w-full">
          <HeaderButton
            icon={<TfiViewList className="text-xl" />}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </div>
        {/* <User /> */}
        <div></div>
      </header>
      <div className="h-70"></div>
    </div>
  );
};

export default HeaderManage;

const HeaderButton: React.FC<HeaderButtonProps> = ({ icon, onClick }) => {
  return (
    <button
      className="p-3 text-white rounded-full flex items-center justify-center hover:bg-yellow-400 ml-2 transition duration-300"
      onClick={onClick}
    >
      {icon}
    </button>
  );
};