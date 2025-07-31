import React from "react";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const AreYouSure = ({ value, inverter }) => {
  return (
    <div
      className="fixed top-0 left-0 h-screen
     w-screen bg-black  bg-opacity-[8%] z-[100]"
    >
      <div
        className="fixed top-1/2 left-[25vw] md:left-[42vw] w-72 bg-black border
      border-gray-700 rounded-xl shadow-lg font-bold text-[1rem] py-2 z-50 "
      >
        <p className=" text-white text-center py-2">Are you sure ?</p>
        <div className="flex items-center justify-center gap-2 py-2">
          <button
            className="btn rounded-full text-primary border-primary
          w-[45%] hover:text-white hover:bg-primary/30 flex items-center justify-center gap-2 "
          >
            <FaCheck className="text-[1.1rem]" />
            Yes
          </button>
          <button
            onClick={(value) => inverter(!value)}
            className="btn rounded-full text-red-400 border-red-400
              w-[45%] hover:text-red-400 hover:bg-red-400/30 flex items-center justify-center gap-2"
          >
            <IoMdClose className="text-[1.1rem]" />
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreYouSure;
