import React, { useEffect, useRef, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpin from "../../components/normal/LoadingSpin";
import { MdOutlineNavigateNext } from "react-icons/md";

import { Link } from "react-router-dom";

import { LuCrown } from "react-icons/lu";

import { IoArrowBackOutline } from "react-icons/io5";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import useProfileUpdate from "../../hooks/useProfileUpdater";

const ProfileUpdate = () => {
  const { data: authUser, isLoading } = useQuery({ queryKey: ["authUser"] });

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

  const { isUpdating, updateProfile } = useProfileUpdate();
  const { username } = useParams();

  const [initialCoverImg, setCoverImg] = useState(null);
  const [initialProfileImg, setProfileImg] = useState(null);
  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);

  const [updateFormData, setUpdateFormData] = useState({
    fullname: "",
    // username: "",
    email: "",
    bio: "",
    link: "",
    newPassword: "",
    currentPassword: "",
    coverImg: "",
    profileImg: "",
  });

  const handleImgUpdate = (e, field) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (field === "coverImg") {
          setCoverImg(reader.result);
          setUpdateFormData((prev) => ({
            ...prev,
            coverImg: reader.result,
          }));
        }
        if (field === "profileImg") {
          setProfileImg(reader.result);
          setUpdateFormData((prev) => ({
            ...prev,
            profileImg: reader.result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("form data to update shiit", updateFormData);
    updateProfile(updateFormData);
  };

  useEffect(() => {
    if (authUser) {
      setCoverImg(authUser.coverImg);
      setProfileImg(authUser.profileImg);
      setUpdateFormData({
        fullname: authUser.fullname,
        username: authUser.username,
        email: authUser.email,
        bio: authUser.bio,
        link: authUser.link,
        newPassword: "",
        currentPassword: "",

        // coverImg: initialCoverImg,
        // profileImg: initialProfileImg,
      });
    }
  }, [authUser]);

  //------------------------------------Dont put raw js below this----------------------------

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
          bg-black/50 z-30  w-full border-b items-center border-gray-700"
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
            onClick={handleSubmit}
            className="border py-1 px-4 mr-4 rounded-full text-black bg-white
               hover:opacity-80 font-bold cursor-pointer duration-300
              transition-all ease-in-out active:scale-90"
          >
            {isUpdating ? <LoadingSpin /> : "Save"}
          </button>
        </div>
        {/* scrollable section */}
        {/* image and info section>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
        <div className="relative group/cover">
          {/* cover image  */}
          <img
            className="h-44 w-full object-cover cursor-pointer"
            src={initialCoverImg || "/cover.png"}
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
              <MdOutlineAddAPhoto
                onClick={() => coverImgRef.current.click()}
                className="text-[1.7rem] hover:text-white/80  text-white/50 cursor-pointer"
              />
              <input
                onChange={(e) => handleImgUpdate(e, "coverImg")}
                type="file"
                accept="image/*"
                hidden
                ref={coverImgRef}
              />
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
                src={initialProfileImg || "/defaultuser.png"}
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
                  <MdOutlineAddAPhoto
                    onClick={() => profileImgRef.current.click()}
                    className="text-[1.7rem] hover:text-white/80  text-white/50 cursor-pointer"
                  />
                  <input
                    onChange={(e) => handleImgUpdate(e, "profileImg")}
                    type="file"
                    accept="image/*"
                    hidden
                    ref={profileImgRef}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* profile pic ends here >>>>>>>>>>>>>>>>>>>>>> */}
        </div>
        <form
          className="overflow-y-scroll mt-16 relative z-0 w-full sm:w-2/3 
        p-4  hide-scrollbar min-h-screen flex flex-col gap-3"
        >
          {/* fullname editor input  */}
          <div className="w-full h-[60px] relative mb-4">
            <input
              type="text"
              name="fullname"
              id="username"
              className={`peer input h-full text-lg w-full pt-2 pb-0 border rounded-[4px] border-gray-700
            focus:outline-primary shadow-md  ${
              updateFormData.fullname === "" ? "focus:outline-red-400" : ""
            }
            `}
              value={updateFormData.fullname}
              onChange={handleChange}
              placeholder=" "
            ></input>
            <label
              htmlFor="username"
              className={`absolute   top-1 text-gray-500 text-lg transition-all
               peer-placeholder-shown:top-4 peer-placeholder-shown:text-md
                peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs
                 peer-focus:text-primary ${
                   updateFormData.fullname === ""
                     ? "left-4 peer-focus:text-red-400"
                     : "top-2 left-4 text-xs"
                 }`}
            >
              fullname
            </label>
            {updateFormData.fullname === "" && (
              <p className="text-red-500 text-sm p-1">{`Name can't be blank!`}</p>
            )}
          </div>

          {/* username editor input  ------------------------------------------------------*/}
          <div className="w-full h-[60px] relative mb-4">
            <input
              type="text"
              name="username"
              id="username"
              className={`peer input h-full text-lg w-full pt-2 pb-0 border rounded-[4px] border-gray-700
            focus:outline-primary shadow-md  ${
              updateFormData.username === "" ? "focus:outline-red-400" : ""
            }
            `}
              value={updateFormData.username}
              onChange={handleChange}
              placeholder=" "
            ></input>
            <label
              htmlFor="username"
              className={`absolute   top-1 text-gray-500 text-lg transition-all
               peer-placeholder-shown:top-4 peer-placeholder-shown:text-md
                peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs
                 peer-focus:text-primary ${
                   updateFormData.username === ""
                     ? "left-4 peer-focus:text-red-400"
                     : "top-2 left-4 text-xs"
                 }`}
            >
              @username
            </label>
            {updateFormData.username === "" && (
              <p className="text-red-500 text-sm p-1">{`Username can't be blank!`}</p>
            )}
          </div>

          {/*bio  editor input  ---------------------------------------------------------*/}
          <div className="w-full h-[140px] relative">
            <textarea
              type="text"
              name="bio"
              id="bio"
              className={`peer input h-full text-lg w-full pt-6 pb-0 border rounded-[4px] border-gray-700
            focus:outline-primary shadow-md whitespace-pre-line resize-none ${
              updateFormData.bio === "" ? "focus:outline-red-400" : ""
            }
            `}
              value={updateFormData.bio}
              onChange={handleChange}
              placeholder=" "
            />
            <label
              htmlFor="bio"
              className={`absolute   top-1 text-gray-500 text-lg transition-all
               peer-placeholder-shown:top-4 peer-placeholder-shown:text-md
                peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs
                 peer-focus:text-primary ${
                   updateFormData.bio === ""
                     ? "left-4 peer-focus:text-red-400"
                     : "top-2 left-4 text-xs"
                 }`}
            >
              Tell about yourself...
            </label>
          </div>

          {/* website input -------------------------------------------------  */}
          <div className="w-full h-[60px] relative">
            <input
              type="text"
              name="link"
              id="link"
              className={`peer input h-full text-lg w-full pt-2 pb-0 border rounded-[4px] border-gray-700
            focus:outline-primary shadow-md  ${
              updateFormData.link === "" ? "focus:outline-red-400" : ""
            }
            `}
              value={updateFormData.link}
              onChange={handleChange}
              placeholder=" "
            ></input>
            <label
              htmlFor="link"
              className={`absolute   top-1 text-gray-500 text-lg transition-all
               peer-placeholder-shown:top-4 peer-placeholder-shown:text-md
                peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs
                 peer-focus:text-primary ${
                   updateFormData.link === ""
                     ? "left-4 peer-focus:text-red-400"
                     : "top-2 left-4 text-xs"
                 }`}
            >
              website link ...
            </label>
          </div>
          {/* location input -------------------------------------------------  */}
          <div className="w-full h-[60px] relative">
            <input
              type="text"
              name="location"
              id="location"
              className={`peer input h-full text-lg w-full pt-2 pb-0 border rounded-[4px] border-gray-700
            focus:outline-primary shadow-md 
            `}
              value={"BD , Earth"}
              placeholder=" "
            ></input>
            <label
              htmlFor="link"
              className={`absolute   top-1 text-gray-500 text-xs transition-all
               peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs
                peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs
                 peer-focus:text-primary left-4`}
            >
              website link ...
            </label>
          </div>

          {/* extraa portions on bottom ----------------------------------------- */}

          <div className="w-full mt-8 mb-12">
            <div
              className="text-lg font-semibold hover:bg-secondary flex justify-between items-center
             py-4 cursor-pointer active:scale-90 p-2 duration-300 transition-all ease-in-out"
            >
              <p>
                Birth Date
                <p className="text-[.9rem] text-white/50">X January , 19XX</p>
              </p>
              <MdOutlineNavigateNext className="text-[1.8rem] text-white/50" />
            </div>
            <div
              className="text-lg font-semibold hover:bg-secondary flex justify-between items-center
             py-4 cursor-pointer active:scale-90 p-2 duration-300 transition-all ease-in-out"
            >
              Create Expanded Bio
              <MdOutlineNavigateNext className="text-[1.8rem] text-white/50" />
            </div>
            <div
              className="text-lg font-semibold hover:bg-secondary flex justify-between items-center
             py-4 cursor-pointer active:scale-90 p-2 duration-300 transition-all ease-in-out"
            >
              Switch to Professional
              <MdOutlineNavigateNext className="text-[1.8rem] text-white/50" />
            </div>
          </div>
        </form>
      </div>
      {/* small footer  */}
      <div
        className="text-gray-400/50  justify-center flex flex-col md:flex-row md:gap-1
            text-[.9rem] items-center"
      >
        Desgin inspired from X & programmed by
        <span className="text-primary font-bold ">FH Tonmoy </span>
        <p className="flex items-center gap-1">
          ©2025 . XCROWN <LuCrown className="text-white inline" />
        </p>
      </div>
    </div>
  );
};

export default ProfileUpdate;
