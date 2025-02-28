import React, { useState } from "react";
import Post from "../components/normal/Post";
import ProfileSection from "./ProfileSec";
const Homepage = () => {
  const [type, setType] = useState("for user");

  return (
    <div className="flex">
      {/* Left Sidebar */}
      <div className="w-20 md:w-64 fixed h-screen flex flex-col border-r border-gray-700">
        {/* Logo */}
        <div className="p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="#1DA1F2"
            stroke="none"
          >
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
          </svg>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 mt-4">
          <a
            href="#"
            className="flex items-center p-3 text-lg font-medium hover:bg-secondary rounded-full mx-2 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="ml-4 hidden md:block">Home</span>
          </a>

          <a
            href="#"
            className="flex items-center p-3 text-lg font-medium hover:bg-secondary rounded-full mx-2 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="ml-4 hidden md:block">Explore</span>
          </a>

          <a
            href="#"
            className="flex items-center p-3 text-lg font-medium hover:bg-secondary rounded-full mx-2 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="ml-4 hidden md:block">Notifications</span>
          </a>

          <a
            href="#"
            className="flex items-center p-3 text-lg font-medium hover:bg-secondary rounded-full mx-2 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span className="ml-4 hidden md:block">Messages</span>
          </a>
        </nav>

        {/* Tweet Button */}
        <div className="px-3 mb-4">
          <button className="w-full bg-primary text-white font-bold py-3 px-4 rounded-full hover:bg-blue-600 transition-colors duration-200">
            <span className="hidden md:inline">Tweet</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="md:hidden mx-auto"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>

        {/* Profile Section */}
        <div className="mt-auto mb-4 px-3">
          <ProfileSection
            user={{
              name: "John Doe",
              username: "@johndoe",
              avatar: "/api/placeholder/40/40",
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-20 md:ml-64 flex-1">
        <div className="flex-[4_4_auto] mr-auto min-h-screen">
          {/*header */}
          <div className="xl:fixed xl:w-[609px] bg-opacity-50 backdrop-blur-md z-10">
            <div className="flex w-full border-b border-gray-700">
              <div
                className={`flex justify-center flex-1 p-3 hover:bg-secondary transition 
                cursor-pointer relative text-[.9rem] duration-300 ${
                  type === "for user"
                    ? "font-bold transition ease-in-out duration-300"
                    : ""
                }`}
                onClick={() => setType("for user")}
              >
                For you
                {type === "for user" && (
                  <div className="absolute bottom-0 w-12 h-1 rounded-full bg-primary"></div>
                )}
              </div>
              <div
                className={`flex justify-center flex-1 p-3 hover:bg-secondary transition 
                cursor-pointer text-[.9rem] relative duration-300 ${
                  type === "following"
                    ? "font-bold transition ease-in-out duration-300"
                    : ""
                }`}
                onClick={() => setType("following")}
              >
                Following
                {type === "following" && (
                  <div className="absolute bottom-0 w-16 h-1 rounded-full bg-primary"></div>
                )}
              </div>
              <div
                className={`flex justify-center flex-1 p-3 hover:bg-secondary transition 
                cursor-pointer text-[.9rem] relative duration-300 ${
                  type === "Random Facts"
                    ? "font-bold transition ease-in-out duration-300"
                    : ""
                }`}
                onClick={() => setType("Random Facts")}
              >
                Random Facts
                {type === "Random Facts" && (
                  <div className="absolute bottom-0 w-16 h-1 rounded-full bg-primary"></div>
                )}
              </div>
            </div>
            <Post />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
