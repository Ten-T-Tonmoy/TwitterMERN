import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import Crown2Svg from "../Crown2";
import { LuCrown } from "react-icons/lu";
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
  const isDev = import.meta.env.MODE === "development";

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(
          isDev
            ? "/api/auth/logout"
            : `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
          {
            method: "POST",
            credentials: "include", // cookies must
          }
        );

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Logout failed");
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
  // console.log("This is for leftbar", authenticated);
  //damn gonna do the same fetchings?

  return (
    <div className="md:flex-[2_2_0] max-w-[13%] lg:w-96 sm:max-w-80  relative z-10">
      <div
        className="sticky md:justify-start m-0 p-0 top-0 left-0 h-screen justify-start
    flex flex-col border-r border-gray-700   md:w-full "
      >
        <div className="xl:mr-[80px]  ">
          <Link to="/" className="sm:pl-2  py-3 flex  md:justify-start">
            {/* <Crown2Svg className="px-2  w-12 h-12 rounded-full hover:bg-stone-900" /> */}
            <LuCrown className=" mx-auto w-9 h-9 md:scale-125 md:mx-0" />
          </Link>

          {/* the goddamn icons >>>>>>>>>>>>> */}

          <ul className="flex flex-col w-full justify-start gap-3 h-[80vh] mt-2">
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

            {/** USer Icon or pfp */}
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
                className="w-fit md:w-full bg-primary  text-white font-bold p-2 sm:p-3
                md:px-3 md:py-3
              rounded-full hover:bg-blue-600 transition-colors duration-200"
              >
                <span className="hidden md:inline">Post</span>
                <FaFeatherAlt className=" md:hidden text-[1.6rem]" />
              </button>
            </div>
          </ul>
          {/* profilesec >>>>>>>>>>>>>>>>>>>>>>>>>> */}
          {authenticated && (
            <Link
              className="inline-block mb-2 "
              // to={`/profile/${authenticated?.username}`}
            >
              {/* profile section */}
              <div className=" px-1 sm:px-2 ">
                <ProfileSection
                  logout={logout}
                  user={{
                    fullname: authenticated.fullname,
                    username: authenticated.username,
                    profileImg: authenticated.profileImg,
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
