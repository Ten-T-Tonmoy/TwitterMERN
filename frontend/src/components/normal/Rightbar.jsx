import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IoSearchSharp } from "react-icons/io5";
import { RiMoreLine } from "react-icons/ri";

const Rightbar = () => {
  return (
    <div className="w-64 mr-[80px]">
      {/*  search Part */}
      <div className="flex flex-col justify-center">
        <label
          className="input ml-8 mt-2 h-9 font-extralight w-[340px] rounded-full input-bordered 
        flex items-center gap-2"
        >
          <IoSearchSharp className="font-extralight   opacity-60" />
          <input
            type="text"
            className="grow font-extralight"
            placeholder="Search"
          />
        </label>

        {/** get premium */}
        <div className="p-3 gap-2 flex  ml-8 flex-col mt-4  w-[340px] border-stone-900 border rounded-2xl">
          <h1 className="text-[1.1rem] text-white  font-bold left-0 ">
            Subscribe to Premium
          </h1>
          <p className="text-[.8rem] ">
            Subscribe to unlock new features and if eligible, receive a share of
            revenue.
          </p>
          <button className="h-8 w-28 hover:bg-primary/90 font-[500] left-0 bg-primary  rounded-full text-white ">
            Subscribe
          </button>
        </div>

        {/** Trending shits */}
        <div className=" gap-2 flex  ml-8 flex-col mt-4  w-[340px] border-stone-900 border rounded-2xl">
          <h1 className="text-[1.2rem] mt-4 text-white font-bold ml-4">
            What’s happening{" "}
          </h1>
          <div>
            <div className="flex-col flex hover:bg-secondary/50 ">
              <div className="flex mx-2 mt-2 flex-row justify-between">
                <p
                  className="text-[.7rem] 
              font-[250]"
                >
                  Trending in Bangladesh
                </p>
                <RiMoreLine className=" hover:bg-primary/30 hover:text-primary text-[1.5rem] rounded-full p-1" />
              </div>
              <h1 className="mx-2 font-bold text-white"> #Mannat </h1>
              <h1
                className="mx-2 text-[.8rem] 
              font-[250] mb-1"
              >
                {" "}
                6,961 posts
              </h1>
            </div>
            Trending in Bangladesh Security 531K posts Music · Trending Lisa
            275K posts Trending in Bangladesh HASINA 15 YEARS OF FASCISM 2,365
            posts
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
