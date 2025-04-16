import { useState } from "react";
import { FiPhone } from "react-icons/fi";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import defaultAvatar from "../../assets/images/default_avatar.png";
import * as actions from "../../store/actions/authActions";
import { RootState, AppDispatch } from "../../store/redux"; // Bạn cần export type này từ store.ts

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

interface UserData {
  fullName?: string;
  phone?: string;
  role?: number;
}

const User = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isAvatarHovered, setIsAvatarHovered] = useState<boolean>(false);

  const { user } = useTypedSelector((state) => state.auth) as { user: UserData };

  const handleLogout = () => {
    dispatch(actions.logout());
  };

  return (
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
          <div className="d-flex align-items-center py-9 mx-7 border-bottom">
            <img
              src={defaultAvatar}
              className="rounded-full w-24 h-24"
              alt="avatar"
            />
            <div className="ms-3">
              <h5 className="mb-1 fs-4">
                {user.fullName || user.phone}
              </h5>
              <p className="mb-0 d-flex align-items-center gap-2">
                <FiPhone />
                <span>{user.phone}</span>
              </p>
            </div>
          </div>

          <div className="message-body">
            <div className="py-3 px-7 pb-0">
              <h5 className="mb-0 fs-5">User Profile</h5>
            </div>
          </div>

          <div className="d-grid py-4 px-7 pt-8">
            <button
              onClick={handleLogout}
              className="btn btn-info bg-red-600 text-white rounded-lg hover:bg-red-700 border-none"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
