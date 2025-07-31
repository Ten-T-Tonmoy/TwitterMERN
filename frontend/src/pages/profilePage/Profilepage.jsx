import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Posts from "../Feed/Posts";
import CreatePost from "../CreatePost";

//react icons--------------------------
import { IoArrowBackOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { memberSinceDate } from "./JoinedAtTime";

const ProfilePage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const isDev = import.meta.env.MODE === "development";
  //prof infos
  const { username } = useParams();
  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
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

  useEffect(() => {
    refetch();
  }, [username, refetch]);

  //updating stuffs

  const handleImgUpdate = (e, field) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        field === "coverImg" && setCoverImg(reader.result);
        field === "profileImg" && setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //--------------------------------------------------------------------------------------
  return (
    <>
      <div
        className="flex-[4_4_auto] relative overflow-x-clip  mr-auto border-r w-[87%] sm:w-full
        border-gray-700 min-h-screen"
      >
        {/*header topbar? */}
        <div className="w-full border-r border-gray-700 ">
          {/* actual navBar  */}
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
                {username}
                <p className="text-[.8rem] font-normal text-gray-200/60">
                  15posts
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
              src={coverImg || user?.coverImg || "/cover.png"}
              alt="cover pic"
            />

            {/* add update functionality */}

            {/* profile image  */}
            <div className="absolute avatar -bottom-14 left-6">
              <div className="w-28 rounded-full relative group/avatar">
                <img
                  src={profileImg || user?.profileImg || "/defaultuser.png"}
                  alt="pfp"
                  className=""
                />
              </div>
            </div>
          </div>

          {/* profile post section -----------------------------------------*/}
          <div className="overflow-y-scroll w-full  hide-scrollbar h-full">
            <CreatePost />
            <Posts postType={typeOfFeed} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
