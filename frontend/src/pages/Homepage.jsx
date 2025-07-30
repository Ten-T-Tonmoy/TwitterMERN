import { useState } from "react";

import Posts from "./Feed/Posts";
import CreatePost from "./CreatePost";

const Homepage = () => {
  const [type, setType] = useState("foruser");
  return (
    <>
      <div className="flex-[4_4_auto] relative mr-auto border-r  border-gray-700 min-h-screen">
        {/*header topbar? */}
        <div className="w-full border-r border-gray-700 ">
          {/* actual navBar  */}
          <div
            className="flex sticky top-0 bg-opacity-50 backdrop-blur-md
          bg-black/50 z-10 w-full border-b  border-gray-700"
          >
            <div
              className={`flex justify-center flex-1 p-3 hover:bg-secondary transition 
          cursor-pointer  relative text-[.9rem] duration-300 ${
            type === "for user"
              ? "font-bold transition ease-in-out duration-300"
              : ""
          }`}
              onClick={() => setType("foruser")}
            >
              For you
              {type === "foruser" && (
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
              onClick={() => setType("allposts")}
            >
              All Posts
              {type === "allposts" && (
                <div
                  className="absolute bottom-0 w-16
            h-1 rounded-full bg-primary"
                ></div>
              )}
            </div>
          </div>
          {/* newsFeed section */}
          <div className="overflow-y-scroll h-full">
            <CreatePost />
            <Posts postType={type} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
