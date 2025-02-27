import React from "react";
import { useState } from "react";

import Post from "../components/normal/Post";

const Homepage = () => {
  const [type, setType] = useState("for user");
  return (
    <>
      <div className="flex-[4_4_auto]  mr-auto border-r  border-gray-700 min-h-screen">
        {/*header */}
        <div className="xl:fixed xl:w-[609px] bg-opacity-50 backdrop-blur-md z-10">
          <div className="flex w-full border-b border-gray-700">
            <div
              className={`flex justify-center flex-1 p-3 hover:bg-secondary transition 
          cursor-pointer  relative text-[.9rem] duration-300 ${
            type === "for user"
              ? "font-bold transition ease-in-out duration-300"
              : ""
          }`}
              onClick={() => setType("for user")}
            >
              For you
              {type === "for user" && (
                <div
                  className="absolute bottom-0 w-12
            h-1 rounded-full bg-primary"
                ></div>
              )}
            </div>
            <div
              className={`flex justify-center flex-1 p-3 hover:bg-secondary transition 
              cursor-pointer text-[.9rem]  relative duration-300 ${
                type === "following"
                  ? "font-bold transition ease-in-out duration-300"
                  : ""
              }`}
              onClick={() => setType("following")}
            >
              Following
              {type === "following" && (
                <div
                  className="absolute bottom-0 w-16
            h-1 rounded-full bg-primary"
                ></div>
              )}
            </div>
            <div
              className={`flex justify-center flex-1 p-3 hover:bg-secondary transition 
              cursor-pointer text-[.9rem]  relative duration-300 ${
                type === "Random Facts"
                  ? "font-bold transition ease-in-out duration-300"
                  : ""
              }`}
              onClick={() => setType("Random Facts")}
            >
              Random Facts
              {type === "Random Facts" && (
                <div
                  className="absolute bottom-0 w-16
            h-1 rounded-full bg-primary"
                ></div>
              )}
            </div>
          </div>
          <Post />
        </div>
      </div>
    </>
  );
};

export default Homepage;
