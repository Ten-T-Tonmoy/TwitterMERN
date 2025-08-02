import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Posts from "../Feed/Posts";

//react icons--------------------------
import { IoArrowBackOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { memberSinceDate } from "./JoinedAtTime";

import { CiLocationOn } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
// import { GrFormNextLink } from "react-icons/gr";
//get verified random pop advertising?
import NotVerified from "./NotVerified";

const ProfilePageComponent = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const isDev = import.meta.env.MODE === "development";
  //prof infos
  const { username } = useParams();
  const [typeOfFeed, setTypeOfFeed] = useState("userPosts");

  const getUserProfileFn = async () => {
    try {
      const res = await fetch(
        isDev
          ? `/api/users/profile/${username}`
          : `${
              import.meta.env.VITE_API_BASE_URL
            }/api/users/profile/${username}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "user profile page fetch error occured");
      }

      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  //query used here
  const {
    data: user,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfileFn,
  });
  const memberSince = memberSinceDate(user?.createdAt);
  const isFollowedByMe = authUser.following.includes(user?._id);

  // console.log("This is profile page check", user); backend unresolved promise made the fetch result undefined ! beaware

  useEffect(() => {
    refetch();
  }, [username, refetch]);

  //updating stuffs

  // const handleImgUpdate = (e, field) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       field === "coverImg" && setCoverImg(reader.result);
  //       field === "profileImg" && setProfileImg(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  //--------------------------------------------------------------------------------------
  return (
    <>
      <div
        className="flex-[4_4_auto] relative overflow-x-clip  mr-auto border-r w-[87%] sm:w-full
        border-gray-700 min-h-screen"
      >
        {/*header topbar? */}
        <div className="w-full border-r border-gray-700 ">
          {/* nahhh  */}
          <div
            className="flex sticky justify-between top-0 bg-opacity-50 backdrop-blur-md
          bg-black/50 z-10 py-[2px] w-full border-b items-center border-gray-700"
          >
            <div className="flex items-center gap-6 text-white">
              <Link to={"/home"}>
                <IoArrowBackOutline
                  className="text-[2.3rem] ml-4 p-2 rounded-full
                hover:bg-secondary cursor-pointer"
                />
              </Link>
              <div
                className="text-[1.4rem] font-bold flex flex-col 
                justify-start"
              >
                {user?.fullname || "name unavailable"}
                <p className="text-[.8rem] font-normal text-gray-200/60">
                  {"@" + username}
                </p>
              </div>
            </div>
            {/* functionality left  */}
            <IoSearchOutline
              className="text-[2.5rem] mr-2 ml-4 p-2 rounded-full
                hover:bg-secondary cursor-pointer"
            />
          </div>
          {/**
           *      coverPage
           * ---ppfpp-------------
           *     pfp          edit profile
           * fullname
           * @username
           *
           * bio... description
           *
           * location    createdAt calender
           *
           * following 50    24 followers
           *
           * not verified card deleteable
           *
           * filter  posts | highlights |media | articles
           * feed
           * random sugg
           * feed again
           *
           *
           */}

          {/* image and info section>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          <div className="relative group/cover">
            {/* cover image  */}
            <img
              className="h-44 w-full object-cover cursor-pointer"
              src={user?.coverImg || "/cover.png"}
              alt="cover pic"
            />

            {/* add update functionality */}

            {/* profile image  */}
            <div className="absolute avatar -bottom-14 left-6">
              <div className="w-28 rounded-full relative group/avatar">
                <img
                  src={user?.profileImg || "/defaultuser.png"}
                  alt="pfp"
                  className="cursor-pointer "
                />
              </div>
            </div>
          </div>
          <div className="h-14 w-full flex items-center justify-end px-4">
            {authUser.username !== username ? (
              <div>
                {/**
                 * more mail bell
                 * follow
                 * following
                 * unfollow =>are you sure!
                 */}
                aint u
              </div>
            ) : (
              <Link to={`/profile/${username}/update`}>
                <button
                  className="border py-1 px-3  rounded-full text-white border-white
              hover:text-black  hover:bg-white font-bold cursor-pointer duration-300
              transition-all ease-in-out active:scale-90"
                >
                  Edit Profile
                </button>
              </Link>
            )}
          </div>

          {/* info part ------------------------------- */}
          <div className="w-full px-5">
            <div
              className="text-[1.4rem] font-bold flex flex-col 
                justify-start"
            >
              {user?.fullname || "name unavailable"}
              <p className="text-[1.05rem] font-normal text-gray-200/60">
                {"@" + username}
              </p>
            </div>

            <p
              className={`text-lg tracking-wide py-3 whitespace-pre-line 
                 text-gray-200
              ${user?.bio === "" ? "text-opacity-30" : ""} `}
            >
              {user?.bio || "Describe about yourself ..."}
            </p>
            {/* // cilocation SlCalender GrFormNext RiVerfied       */}
            <div
              className="flex justify-start items-center py-1 gap-4 text-sm
            font-semibold sm:text-md text-gray-200/50"
            >
              <div className="flex justify-center gap-1 items-center">
                <SlCalender className="text-[1rem]" />
                {memberSince || "Joined January 2025"}
              </div>
              <div className="flex justify-center items-center">
                <CiLocationOn className="text-[1.2rem]" />
                BD , Earth
              </div>
            </div>

            {/* followers and following  */}

            <div className="flex justify-start gap-4">
              <p
                className={`text-[1.1rem]  py-2 whitespace-pre-line
                font-semibold text-gray-200 `}
              >
                {user?.following === 0 || "00"}
                <span className=" text-gray-200/40 font-normal">
                  {" "}
                  Following
                </span>
              </p>
              <p
                className={`text-[1.1rem]  py-2 whitespace-pre-line
                font-semibold text-gray-200 `}
              >
                {user?.followers === 0 || "00"}
                <span className=" text-gray-200/40 font-normal">
                  {" "}
                  Followers
                </span>
              </p>
            </div>
          </div>
          <NotVerified />
          {/**
           * posts
           *replies
           *heighlits
           * articles
           * media
           * */}
          <div
            className="flex w-full justify-start border-b border-gray-700 shadow-lg
          mt-2"
          >
            <div
              className={`flex justify-center items-center hover:bg-secondary  font-bold
            duration-300 transition-all ease-in-out cursor-pointer relative  py-3 w-[25%]
            ${typeOfFeed === "posts" ? "text-white" : "text-gray-200/30"} `}
              onClick={() => setTypeOfFeed("posts")}
            >
              Posts
              {typeOfFeed === "posts" && (
                <div className="absolute bottom-0 w-12 h-1 rounded-full bg-primary"></div>
              )}
            </div>
            <div
              className={`flex justify-center items-center hover:bg-secondary  font-bold
            duration-300 transition-all ease-in-out cursor-pointer relative  py-3 w-[25%]
            ${
              typeOfFeed === "likedPosts" ? "text-white" : "text-gray-200/30"
            } `}
              onClick={() => setTypeOfFeed("likedPosts")}
            >
              Replies
              {typeOfFeed === "likedPosts" && (
                <div className="absolute bottom-0 w-16 h-1 rounded-full bg-primary"></div>
              )}
            </div>
            <div
              className={`flex justify-center items-center hover:bg-secondary  font-bold
            duration-300 transition-all ease-in-out cursor-pointer relative  py-3 w-[30%]
            ${
              typeOfFeed === "heighlights" ? "text-white" : "text-gray-200/30"
            } `}
              onClick={() => setTypeOfFeed("heighlights")}
            >
              Heighlights
              {typeOfFeed === "heighlights" && (
                <div className="absolute bottom-0 w-24 h-1 rounded-full bg-primary"></div>
              )}
            </div>
            <div
              className={`flex justify-center items-center hover:bg-secondary  font-bold
            duration-300 transition-all ease-in-out cursor-pointer relative  py-3 w-[20%]
            ${typeOfFeed === "media" ? "text-white" : "text-gray-200/30"} `}
              onClick={() => setTypeOfFeed("media")}
            >
              Media
              {typeOfFeed === "media" && (
                <div className="absolute bottom-0 w-14 h-1 rounded-full bg-primary"></div>
              )}
            </div>
          </div>

          {/* profile post section -----------------------------------------*/}

          <div className="overflow-y-scroll w-full  hide-scrollbar h-full">
            {/* <CreatePost /> */}
            <Posts
              postType={typeOfFeed}
              username={username}
              userId={user?._id}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePageComponent;
