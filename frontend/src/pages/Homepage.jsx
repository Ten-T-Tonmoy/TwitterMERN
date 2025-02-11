import React from "react";
import { useState } from "react";

const Homepage = () => {
  const [type, setType] = useState("for user");
  return (
    <>
      <div className="flex-[4_4_0] mr-auto border-r  border-gray-700 min-h-screen">
        {/*header */}
        <div className="flex w-full border-b border-gray-700">
          <div
            className={`flex justify-center flex-1 p-3 hover:bg-secondary transition 
          cursor-pointer  relative duration-300 ${
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
              cursor-pointer  relative duration-300 ${
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
        </div>
      </div>
    </>
  );
};

export default Homepage;
