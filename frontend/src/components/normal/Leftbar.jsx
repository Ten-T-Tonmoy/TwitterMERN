import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import Crown2Svg from "../Crown2";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

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
    <div className="md:flex-[2_2_0]  w-18 max-w-52 ">
      <div
        className="sticky top-0 left-0 h-screen
    flex flex-col border-r border-gray-700 w-20 md:w-full "
      >
        <Link to="/">
          <Crown2Svg className="px-2  w-14 h-14 rounded-full hover:bg-stone-900" />
        </Link>
        <ul className="flex flex-col gap-3 mt-4">
          {/** home icon */}
          <li className="flex justify-center md:justify-start">
            <Link
              to="/"
              className="flex gap-3 
            items-center hover:bg-stone-900 transition-all rounded-full
            duration-300 py-2 pl-2 pr-2  cursor-pointer "
            >
              <MdHomeFilled className="w-8 h-8 " />
              <span className="text-lg hidden md:block">Home</span>
            </Link>
          </li>
          {/**Notif */}
          <li className="flex justify-center md:justify-start">
            <Link
              to="/"
              className="flex gap-3 
            items-center hover:bg-stone-900 transition-all rounded-full
            duration-300 py-2 pl-2 pr-2  cursor-pointer "
            >
              <IoNotifications className="w-8 h-8 " />
              <span className="text-lg hidden md:block">Notifications</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Leftbar;
