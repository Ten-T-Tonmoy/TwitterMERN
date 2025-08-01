import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpin from "../../components/normal/LoadingSpin";

import { Link } from "react-router-dom";

import { IoArrowBackOutline } from "react-icons/io5";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import useProfileUpdate from "../../hooks/useProfileUpdater";

const ProfileUpdate = () => {
  // fullname,
  // email,
  // username,
  // currentPassword,
  // newPassword,
  // bio,
  // link,

  /**
   * params theke username
   *
   */

  const { username } = useParams();

  const [updateFormData, setUpdateFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    bio: "",
    link: "",
    newPassword: "",
    currentPassword: "",
  });

  const { isUpdating, updateProfile } = useProfileUpdate();
  const handleChange = (e) => {
    setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
  };




  //------------------------------------Dont put raw js below this----------------------------

  const { data: authUser, isLoading } = useQuery({ queryKey: ["authUser"] });
  if (isLoading)
    return (
      <div>
        <LoadingSpin />
      </div>
    );
  //   console.log("the goddamn editor", username);
  //   console.log("username !== authUser.username", username !== authUser.username);

  if (!authUser || username !== authUser.username) {
    // toast.error("Unathorized!");
    return <Navigate to="/login" replace />;
  }
  return (
    <div
      className="flex-[4_4_auto] relative overflow-x-clip  mr-auto border-r w-full
        border-gray-700 min-h-screen"
    >
      {/*header topbar? */}
      <div className=" w-full border-r  border-gray-700 ">
        {/* actual navBar  */}
        <div
          className="flex sticky justify-between py-3 sm:px-4 px-2 top-0 bg-opacity-50 backdrop-blur-md
          bg-black/50 z-10  w-full border-b items-center border-gray-700"
        >
          <div className="flex items-center gap-6 text-white">
            <Link to={`/profile/${username}`}>
              <IoArrowBackOutline
                className="text-[2.3rem] ml-4 p-2 rounded-full
                hover:bg-secondary cursor-pointer"
              />
            </Link>
            <div
              className="text-[1.3rem] font-bold flex flex-col 
                justify-start"
            >
              Edit Profile
            </div>
          </div>
          {/* functionality left  */}
          <button
            className="border py-1 px-4 mr-4 rounded-full text-black bg-white
               hover:opacity-80 font-bold cursor-pointer duration-300
              transition-all ease-in-out active:scale-90"
          >
            Save
          </button>
        </div>
        {/* scrollable section */}
        <div className="overflow-y-scroll relative z-0 w-full hide-scrollbar min-h-screen">
          {/* image and info section>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          <div className="relative group/cover">
            {/* cover image  */}
            <img
              className="h-44 w-full object-cover cursor-pointer"
              src={authUser?.coverImg || "/cover.png"}
              alt="cover pic"
            />
            <div
              className="absolute h-44 gap-4 w-full bg-black/10 top-0 flex justify-center
            items-center"
            >
              <div
                className="p-3 rounded-full 
                bg-secondary/30 hover:bg-secondary/60 "
              >
                <MdOutlineAddAPhoto className="text-[1.7rem] hover:text-white/80  text-white/50 cursor-pointer" />
              </div>
              <div
                className="p-3 rounded-full 
                bg-secondary/30 hover:bg-secondary/60 "
              >
                <IoMdClose className="text-[1.7rem] hover:text-white/80  text-white/50 cursor-pointer" />
              </div>
            </div>

            {/* add update functionality */}

            {/* profile image  */}
            <div className="absolute avatar -bottom-14 left-6">
              <div className="w-28 rounded-full relative group/avatar">
                <img
                  src={authUser?.profileImg || "/defaultuser.png"}
                  alt="pfp"
                  className="cursor-pointer relative z-10 "
                />
                <div
                  className="absolute h-full gap-4 w-full bg-black/10 top-0 flex justify-center
            items-center"
                >
                  <div
                    className="p-3 z-20 rounded-full 
                bg-secondary/30 hover:bg-secondary/60 "
                  >
                    <MdOutlineAddAPhoto className="text-[1.7rem] hover:text-white/80  text-white/50 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            {/* profile pic ends here >>>>>>>>>>>>>>>>>>>>>> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
