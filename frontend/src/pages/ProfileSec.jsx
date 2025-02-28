import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileSection = ({
  user = {
    name: "John Doe",
    username: "@johndoe",
    avatar: "/api/placeholder/40/40",
  },
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Your logout logic here
    console.log("Logging out...");
    // Example: localStorage.removeItem("token");
    // Then navigate to login
    // navigate("/login");
    setIsMenuOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile button that toggles the menu */}
      <button
        className="flex items-center w-full md:p-3 mt-auto rounded-full hover:bg-secondary transition-colors duration-200"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <img
          src={user.avatar}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3 hidden md:block">
          <p className="font-bold text-sm">{user.name}</p>
          <p className="text-gray-500 text-sm">{user.username}</p>
        </div>
        <div className="ml-auto hidden md:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </div>
      </button>

      {/* Dropdown menu */}
      {isMenuOpen && (
        <div className="absolute bottom-16 left-0 w-64 bg-black border border-gray-700 rounded-xl shadow-lg py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="font-bold">{user.name}</p>
            <p className="text-gray-500">{user.username}</p>
          </div>

          <button
            className="w-full text-left px-4 py-3 hover:bg-secondary transition-colors duration-200"
            onClick={() => {
              navigate(`/profile/${user.username.substring(1)}`);
              setIsMenuOpen(false);
            }}
          >
            Profile
          </button>

          <button
            className="w-full text-left px-4 py-3 hover:bg-secondary transition-colors duration-200"
            onClick={() => {
              navigate("/settings");
              setIsMenuOpen(false);
            }}
          >
            Settings
          </button>

          <button
            className="w-full text-left px-4 py-3 text-red-500 hover:bg-secondary transition-colors duration-200"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
