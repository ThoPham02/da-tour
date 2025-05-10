import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../../store/redux";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

interface UserData {
  fullName?: string;
  email?: string;
  role?: number;
}

const AccountModal = ({ isOpen, onClose }: Props) => {
  const { user } = useTypedSelector((state) => state.auth) as {
    user: UserData;
  };
  const [profile, setProfile] = useState({
    fullName: user.fullName,
    email: user.email,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = () => {
    const newErrors: typeof errors = {};
    if (!profile.fullName) {
      newErrors.fullName = "Họ tên không được để trống";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Cập nhật:", profile);
      alert("Cập nhật thông tin thành công!");
    }
  };

  const handleChangePassword = () => {
    const newErrors: typeof errors = {};

    if (!passwords.currentPassword)
      newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    if (!passwords.newPassword)
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
    if (!passwords.confirmPassword)
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu mới";
    if (
      passwords.newPassword &&
      passwords.confirmPassword &&
      passwords.newPassword !== passwords.confirmPassword
    ) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Đổi mật khẩu:", passwords);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-xl p-6 shadow-xl max-w-lg w-full">
          <Dialog.Title className="text-lg font-bold text-gray-800">
            Tài khoản của tôi
          </Dialog.Title>

          {/* Cập nhật thông tin */}
          <div className="mt-6">
            <h3 className="text-md font-semibold text-gray-700 mb-2">
              Thông tin cá nhân
            </h3>
            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="Họ tên"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName}</p>
                )}
              </div>
              <input
                disabled
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                placeholder="Email"
              />
              <button
                onClick={handleUpdateProfile}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition w-full"
              >
                Cập nhật thông tin
              </button>
            </div>
          </div>

          {/* Đổi mật khẩu */}
          <div className="mt-8">
            <h3 className="text-md font-semibold text-gray-700 mb-2">
              Đổi mật khẩu
            </h3>
            <div className="space-y-3">
              <div>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="Mật khẩu hiện tại"
                  required
                />
                {errors.currentPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.currentPassword}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="Mật khẩu mới"
                  required
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm">{errors.newPassword}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="Xác nhận mật khẩu mới"
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <button
                onClick={handleChangePassword}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition w-full"
              >
                Đổi mật khẩu
              </button>
            </div>
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-red-500 transition"
            >
              Đóng
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AccountModal;
