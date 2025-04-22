import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { RootState, AppDispatch } from "../../store/redux"; // Bạn cần export type này từ store.ts
import { MdOutlineTour } from "react-icons/md";

import defaultAvatar from "../../assets/images/default_avatar.png";
import * as actions from "../../store/actions/authActions";
import AccountModal from "./Modal/AccountModal";
import BookedToursModal from "./Modal/BookedToursModal";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

interface UserData {
  fullName?: string;
  email?: string;
  role?: number;
}

const mockBookings = [
  {
    bookingDate: "2025-04-01",
    tourName: "Hạ Long Bay Adventure",
    departureDate: "2025-04-20",
    quantity: 2,
    totalAmount: 3000,
    paidAmount: 1500,
    status: "Chờ xác nhận",
  },
  {
    bookingDate: "2025-03-15",
    tourName: "Hội An Discovery",
    departureDate: "2025-03-30",
    quantity: 1,
    totalAmount: 1200,
    paidAmount: 1200,
    status: "Đã xác nhận",
  },
];

const User = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isAvatarHovered, setIsAvatarHovered] = useState<boolean>(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const { user } = useTypedSelector((state) => state.auth) as {
    user: UserData;
  };

  const handleLogout = () => {
    dispatch(actions.logout());
  };

  return (
    <>
      <div
        className="flex items-center absolute right-12 top-0 z-50"
        onMouseEnter={() => setIsAvatarHovered(true)}
        onMouseLeave={() => setIsAvatarHovered(false)}
      >
        <button className="rounded-circle flex items-center justify-center m-2">
          <img
            src={defaultAvatar}
            alt="avatar"
            className="rounded-full w-12 h-12"
          />
        </button>

        {isAvatarHovered && (
          <div
            className="absolute w-360 bg-white shadow-md rounded-md z-50"
            style={{ top: "100%", right: 0 }}
          >
            <div className="flex items-center py-9 mx-7 border-bottom">
              <img
                src={defaultAvatar}
                className="rounded-full w-24 h-24"
                alt="avatar"
              />
              <div className="ms-3">
                <h5 className="mb-1 font-medium">
                  {user.fullName || user.email}
                </h5>
                <p className="mb-0 flex items-center gap-2">
                  <FiMail />
                  <span>{user.email}</span>
                </p>
              </div>
            </div>

            <div className="px-7 pt-3">
              <div className="pb-4">
                <h5 className="text-base font-semibold text-gray-800">
                  User Profile
                </h5>
              </div>

              <button
                onClick={() => {
                  setIsAvatarHovered(false);
                  setIsTourOpen(true);
                }}
                className="flex items-center py-2 gap-4 group hover:bg-red-50 rounded-lg px-4 transition w-full text-left"
              >
                <span className="flex items-center justify-center bg-red-100 text-red-500 rounded-lg p-3">
                  <MdOutlineTour className="w-6 h-6" />
                </span>
                <div className="flex-1">
                  <h6 className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-200">
                    Tour đã đặt
                  </h6>
                  <span className="text-xs text-gray-500">Chi tiết</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsAvatarHovered(false);
                  setIsAccountOpen(true);
                }}
                className="flex items-center py-2 gap-4 group hover:bg-red-50 rounded-lg px-4 transition w-full text-left mt-2"
              >
                <span className="flex items-center justify-center bg-red-100 text-red-500 rounded-lg p-3">
                  <FaRegUserCircle className="w-6 h-6" />
                </span>
                <div className="flex-1">
                  <h6 className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-200">
                    Tài khoản của tôi
                  </h6>
                  <span className="text-xs text-gray-500">Cài đặt</span>
                </div>
              </button>
            </div>

            <div className="grid py-4 px-7 pt-8">
              <button
                onClick={handleLogout}
                className="btn bg-red-600 text-white rounded-lg hover:bg-red-700 border-none"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        )}
      </div>
      <BookedToursModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        bookings={[
          {
            bookingDate: "2025-04-01",
            tourName: "Hạ Long Bay Adventure",
            departureDate: "2025-04-20",
            quantity: 2,
            totalAmount: 3000,
            paidAmount: 1500,
            status: "Chờ xác nhận",
          },
          {
            bookingDate: "2025-03-15",
            tourName: "Hội An Discovery",
            departureDate: "2025-03-30",
            quantity: 1,
            totalAmount: 1200,
            paidAmount: 1200,
            status: "Đã xác nhận",
          },
        ]}
      />
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />
    </>
  );
};

export default User;
