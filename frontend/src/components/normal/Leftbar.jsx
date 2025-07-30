import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import Crown2Svg from "../Crown2";
import { IoSearchSharp } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { MdMailOutline } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { FaFeatherAlt } from "react-icons/fa";

import ProfileSection from "../../pages/ProfileSec";


const Leftbar = () => {
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.post("/api/auth/logout");
        if (res.status !== 200) {
          throw new Error(res.error || "Shit happened while trying to logOut");
        }
      } catch (error) {
        // optional chaining bruh
        throw new Error(error.message || error.response?.data?.message);
      }
    },
    onSuccess: () => {
      toast.success("Logged out Successfully");

      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },

    onError: () => {
      toast.error("Logout Failed");
    },
  });

  const { data: authenticated } = useQuery({ queryKey: ["authUser"] });
  //damn gonna do the same fetchings?

  return (
    <div className="md:flex-[2_2_0] lg:w-96 max-w-52 ">
      <div
        className="sticky md:justify-start m-0 p-0 top-0 left-0 h-screen justify-start
    flex flex-col border-r border-gray-700  md:w-full "
      >
        <div className="xl:mr-[80px] ">
          <Link to="/" className="pl-2 pt-2 flex  md:justify-start">
            <Crown2Svg className="px-2  w-12 h-12 rounded-full hover:bg-stone-900" />
          </Link>
          <ul className="flex flex-col gap-2 mt-2">
            {/** home icon */}
            <li className="flex justify-center md:justify-start ">
              <Link
                to="/"
                className="flex gap-2 
            items-center hover:bg-stone-900 transition-all rounded-full
            duration-300 py-2 pl-2 pr-2  cursor-pointer "
              >
                <GoHome className="w-6 h-6 " />
                <span className="text-lg hidden md:block">Home</span>
              </Link>
            </li>
            {/**Notif */}
            <li className="flex justify-center md:justify-start">
              <Link
                to="/"
                className="flex gap-2 
            items-center hover:bg-stone-900 transition-all rounded-full
            duration-300 py-2 pl-2 pr-2  cursor-pointer "
              >
                <IoNotifications className="w-6 h-6 " />
                <span className="text-lg hidden md:block">Notifications</span>
              </Link>
            </li>
            {/**Explore */}
            <li className="flex justify-center md:justify-start">
              <Link
                to="/404"
                className="flex gap-2 
            items-center hover:bg-stone-900 transition-all rounded-full
            duration-300 py-2 pl-2 pr-2  cursor-pointer "
              >
                <IoSearchSharp className="w-6 h-6 " />
                <span className="text-lg hidden md:block">Explore</span>
              </Link>
            </li>
            {/**Message */}
            <li className="flex justify-center md:justify-start">
              <Link
                to="/404"
                className="flex gap-2 
            items-center hover:bg-stone-900 transition-all rounded-full
            duration-300 py-2 pl-2 pr-2  cursor-pointer "
              >
                <MdMailOutline className="w-6 h-6 " />
                <span className="text-lg hidden md:block">Message</span>
              </Link>
            </li>
            {/**Community */}
            <li className="flex justify-center md:justify-start">
              <Link
                to="/404"
                className="flex gap-2 
            items-center hover:bg-stone-900 transition-all rounded-full
            duration-300 py-2 pl-2 pr-2  cursor-pointer "
              >
                <BsPeopleFill className="w-6 h-6 " />
                <span className="text-lg hidden md:block">Community</span>
              </Link>
            </li>
            {/**More */}
            <li className="flex justify-center md:justify-start">
              <Link
                to="/404"
                className="flex gap-2 
            items-center hover:bg-stone-900 transition-all rounded-full
            duration-300 py-2 pl-2 pr-2  cursor-pointer "
              >
                <CgMoreO className="w-6 h-6 " />
                <span className="text-lg hidden md:block">More</span>
              </Link>
            </li>

            {/** USer Icon */}
            <li className="flex justify-center md:justify-start">
              <Link
                to={`/profile/${authenticated?.username}`}
                className="flex gap-2 
            items-center hover:bg-stone-900 transition-all rounded-full
            duration-300 py-2 pl-2 pr-2  cursor-pointer "
              >
                <FaUser className="w-6 h-6 " />
                <span className="text-lg hidden md:block">Profile</span>
              </Link>
            </li>

            <div className="mx-auto md:w-full my-4">
              <button
                className="w-fit md:w-full bg-primary  text-white font-bold p-3
                md:px-3 md:py-3
              rounded-full hover:bg-blue-600 transition-colors duration-200"
              >
                <span className="hidden md:inline">Post</span>
                <FaFeatherAlt className=" md:hidden text-[1.6rem]" />
              </button>
            </div>
          </ul>

          {authenticated && (
            <Link
              className="inline-block mt-28"
              to={`/profile/${authenticated?.username}`}
            >
              {/* profile section */}
              <div className="mt-auto mb-4 px-3">
                <ProfileSection
                  user={{
                    name: authenticated?.username,
                    username: "@johndoe",
                    avatar: "/api/placeholder/40/40",
                  }}
                />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
