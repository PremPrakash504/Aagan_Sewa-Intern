import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import { FaUserCircle, FaCamera } from "react-icons/fa";

const ProfileManagement = () => {
  const { email, role, avatar } = useSelector((state) => state.user);

  const [localAvatar, setLocalAvatar] = useState(null);
  const fileInputRef = useRef();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLocalAvatar(URL.createObjectURL(file));
    }
  };

  const handleClickAvatar = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-20">
      <div className="flex flex-col items-center">
        <div
          className="relative w-28 h-28 rounded-full bg-gray-200 cursor-pointer flex items-center justify-center"
          onClick={handleClickAvatar}
        >
          {localAvatar ? (
            <img
              src={localAvatar}
              alt="Admin Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          ) : avatar ? (
            <img
              src={avatar}
              alt="Admin Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <FaUserCircle className="w-full h-full text-gray-400" />
          )}

          <div className="absolute -bottom-0.5 -right-0.5 w-9 h-9 rounded-full flex items-center justify-center bg-gray-200 border border-white">
            <FaCamera className="w-4.5 h-4.5 text-gray-600" />
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleAvatarChange}
          className="hidden"
        />

        <div className="mt-4 text-center space-y-1 text-gray-700">
          <p>Email: {email}</p>
          <p>Role: {role}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
