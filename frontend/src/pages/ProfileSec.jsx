import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userDefaultImage from "../assets/images/user.png";
import { FaRegUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";

const ProfileSection = ({
  user = {
    fullname,
    username,
    profileImg,
  },
  logout,
}) => {
  // console.log("Username blank why tf", user.fullname, user.username);
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
    console.log("Logging out...");
    logout();
    setIsMenuOpen(false);
    setTimeout(() => {
      window.location.reload();
      //instant hit suks
    }, 400);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* pfp icon to trigger huh */}
      <button
        className="flex items-center  w-full md:p-3 mt-auto rounded-full
         hover:bg-secondary transition-colors duration-200"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {user.profileImg ? (
          <img
            src={user.profileImg}
            alt="Profile"
            className={` w-14 rounded-full object-cover
            ${user.profileImg ? "" : "bg-white"}`}
          />
        ) : (
          <FaRegUserCircle
            className="text-white text-[2.8rem] md:text-[3.2rem] md:mx-0 mx-auto
          "
          />
        )}
        <div className="ml-3 hidden md:block">
          <p className="font-bold text-sm whitespace-nowrap">{user.fullname}</p>
          <p className="text-gray-500 text-sm">{"@" + user.username}</p>
        </div>
        <div className="ml-auto hidden md:block px-4">
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

      {/* pop up menu>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      {isMenuOpen && (
        <div
          className="absolute bottom-16 left-0 w-64 bg-black border
         border-gray-700 rounded-xl shadow-lg font-bold text-[.9rem] py-2 z-50 "
        >
          <div className="px-4 py-3 border-b w-full bg-black  border-gray-700 flex justify-between">
            <p className="font-bold text-white text-[1rem]">{user.fullname}</p>
            <p className="text-gray-500 font-semibold">{"@" + user.username}</p>
          </div>

          <button
            className="w-full text-left px-4 py-3 cursor-pointer flex items-center justify-between
             hover:bg-secondary  transition-colors duration-200"
            onClick={() => {
              navigate(`/profile/${user.username.substring(1)}`);
              setIsMenuOpen(false);
            }}
          >
            Profile
            <FaCircleUser className="text-[1.5rem]" />
          </button>

          <button
            className="w-full text-left px-4 py-3 hover:bg-secondary
            cursor-pointer transition-colors duration-200 flex items-center justify-between"
            onClick={() => {
              navigate("/settings");
              setIsMenuOpen(false);
            }}
          >
            Settings
            <MdOutlineSettings className="text-[1.5rem]" />
          </button>

          <button
            className="w-full text-left px-4 py-3 text-red-500 flex items-center justify-between
            cursor-pointer hover:bg-secondary transition-colors duration-200"
            onClick={handleLogout}
          >
            Log out
            <MdLogout className="text-[1.4rem]" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
