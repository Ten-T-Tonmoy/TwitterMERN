import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const NotVerified = () => {
  return (
    <div className="w-[95%] mx-auto my-1 rounded-xl py-3 px-4 md:px-14 bg-primary/30">
      <h1
        className="text-white flex justify-center items-center
      gap-2 text-xl font-bold"
      >
        You aren’t verified - now 30% off
        <RiVerifiedBadgeFill />
      </h1>
      <p className=" text-start text-gray-200/50 my-1">
        Get verified for boosted replies , analytics , ad-free browsing , and
        more . Upgrade your profile now.
      </p>
      <button
        className=" bg-white w-full md:w-fit  text-stone-800 my-2 text-md transition-all ease-in-out
        duration-300
      font-semibold hover:opacity-70 active:scale-90  rounded-3xl px-3 py-1 "
      >
        Get verified
      </button>
    </div>
  );
};

export default NotVerified;
