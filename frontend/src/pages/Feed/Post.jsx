/* eslint-disable react/prop-types */

// react icons
import { FaRegCommentAlt } from "react-icons/fa";
import { GoComment } from "react-icons/go";

import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { MdOutlineFileUpload } from "react-icons/md"; //share
//when liked
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

import { IoIosMore } from "react-icons/io";

import { RiVerifiedBadgeFill } from "react-icons/ri"; //blue
import { MdVerified } from "react-icons/md"; //gold

//pop up more menu
import { RiUserFollowLine } from "react-icons/ri";
import { MdReportGmailerrorred } from "react-icons/md";
import { AiOutlineStop } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

import { FaCheck } from "react-icons/fa6";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { formatDate } from "./DateFomatter.js";

import LoadingSpin from "../../components/normal/LoadingSpin";

const PostCard = ({ post }) => {
  const [comment, setComment] = useState("");
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();
  const postCreator = post.user;
  const alreadyLiked = post.likes.includes(authUser._id);
  const ownPost = authUser._id === post.user._id;
  const structuredDate = formatDate(post.createdAt);

  //more option and popup
  const [moreOpen, setMoreOpen] = useState(false);
  const [surePopUpOpen, setSurePopUpOpen] = useState(false);
  const isDev = import.meta.env.MODE === "development";

  const deletePostFn = async () => {
    try {
      const res = await fetch(
        isDev
          ? `api/posts/${post._id}`
          : `${import.meta.env.VITE_API_BASE_URL}/api/posts/${post._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.Error || "error occured while deleting");
      }
      return data;
    } catch (e) {
      throw new Error(e);
    }
  };

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: deletePostFn,
    onSuccess: () => {
      toast.success("Post Deleted !");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDeletePost = () => {
    setSurePopUpOpen(true);
    deletePost();
    setMoreOpen(false);
    setSurePopUpOpen(false);
  };

  const profileUrl = `/profile/${post.user?.username}`;
  return (
    <>
      <div
        className="flex w-full gap-2 items-start p-4 pb-1 border-b
   border-gray-700"
      >
        {surePopUpOpen && (
          <div
            className="fixed top-0 left-0 h-screen items-center flex justify-center
           w-screen bg-black  bg-opacity-[90%] z-[100]"
          >
            <div
              className=" w-72 bg-black border
            border-gray-700 rounded-xl shadow-lg font-bold text-[1rem] py-2 z-50 "
            >
              <p className=" text-white text-center py-2">Are you sure ?</p>
              <div className="flex items-center justify-center gap-2 py-2">
                <button
                  className="btn rounded-full text-primary border-primary
                w-[45%] hover:text-white hover:bg-primary/30 flex items-center justify-center gap-2 "
                  onClick={handleDeletePost}
                >
                  <FaCheck className="text-[1.1rem]" />
                  Yes
                </button>
                <button
                  onClick={() => setSurePopUpOpen(false)}
                  className="btn rounded-full text-red-400 border-red-400
                    w-[45%] hover:text-red-400 hover:bg-red-400/30 flex items-center justify-center gap-2"
                >
                  <IoMdClose className="text-[1.1rem]" />
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* main post part >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

        {/* <div
          className="flex gap-2 items-start h-10 w-10 rounded-full 
          bg-primary border-gray-700"
        >
        </div> */}
        {/** avatar later */}
        <Link to={`${profileUrl}`}>
          <img
            src={post.user?.profileImg || "/defaultuser.png"}
            alt="pfp"
            className="w-10 rounded-full h-10 mt-2"
          />
        </Link>

        {/* main post card here */}
        {/**
         * pfp |name(tick) @username .23h         globe 3dots(del)
         *     |text # @filters
         *     |image 2xl rounded
         *     | icons
         *     |border-b
         */}
        <div className="w-[85%] sm:w-[90%] ">
          <div className="flex items-center w-full relative ">
            <p className="font-bold ">{post.user.fullname}</p>
            <RiVerifiedBadgeFill className="text-primary text-lg mx-1" />
            <p className="text-white/60 text-ellipsis w-[20%] font-light line-clamp-1">
              {"@" + post.user.username}
            </p>
            <p className="text-white/60 mx-1">
              <span className="font-extrabold">· </span>
              {structuredDate}
            </p>
            <IoIosMore
              onClick={() => setMoreOpen(!moreOpen)}
              className={`ml-auto p-2 text-[2rem] rounded-full 
            hover:text-primary hover:bg-primary/30 cursor-pointer
            ${moreOpen ? "bg-primary/30 text-primary " : ""}
            `}
            />
            {moreOpen && (
              <div
                className="absolute top-6 right-0 w-64 bg-black border
                       border-gray-700 rounded-xl shadow-lg font-bold text-[.9rem] py-2 z-50 "
              >
                <button
                  className="w-full text-left px-4 py-3 cursor-pointer flex items-center justify-between
                           hover:bg-secondary  transition-colors duration-200"
                >
                  Follow User+
                  <RiUserFollowLine className="text-[1.5rem]" />
                </button>

                <button
                  className="w-full text-left px-4 py-3 hover:bg-secondary
                          cursor-pointer transition-colors duration-200 flex items-center justify-between"
                  onClick={() => setMoreOpen(!moreOpen)}
                >
                  Close
                  <IoMdClose className="text-[1.5rem]" />
                </button>

                <button
                  className="w-full text-left px-4 py-3 text-red-500 flex items-center justify-between
                          cursor-pointer hover:bg-secondary transition-colors duration-200"
                >
                  Block {"@" + post.user.username}
                  <AiOutlineStop className="text-[1.4rem]" />
                </button>
                <button
                  className="w-full text-left px-4 py-3 text-red-500 flex items-center justify-between
                          cursor-pointer hover:bg-secondary transition-colors duration-200"
                >
                  Report Post
                  <MdReportGmailerrorred className="text-[1.4rem]" />
                </button>
                <button
                  className="w-full text-left px-4 py-3 text-red-500 flex items-center justify-between
                          cursor-pointer hover:bg-secondary transition-colors duration-200"
                  onClick={() => setSurePopUpOpen(true)}
                >
                  Delete post
                  <MdDeleteOutline className="text-[1.4rem]" />
                </button>
              </div>
            )}
          </div>

          {/* content */}
          <div
            className="max-w-[85%] sm:max-w-[90%] text-white pt-1 pb-3
           text-[1.1rem] whitespace-pre-line"
          >
            {post.text}
          </div>

          {post.img && (
            <img
              loading="lazy"
              className=" max-w-[95%]
          rounded-2xl  object-cover
          "
              src={post.img}
              alt="post image"
            />
          )}

          {/* bottomBar */}

          <div className="flex max-w-[85%] sm:max-w-[90%] justify-between pt-2 items-center text-white/70">
            <div className="flex justify-center items-center">
              <GoComment
                className="  p-3 text-[45px] hover:text-primary hover:bg-primary/20
              transition-all duration-300 ease-in-out rounded-full cursor-pointer active:scale-90"
              />
              {post.comments.length}
            </div>
            <div className="flex justify-center items-center">
              <FaRegHeart
                className="  p-3 text-[45px] hover:text-red-400 hover:bg-red-400/20
              transition-all duration-300 ease-in-out rounded-full cursor-pointer active:scale-90"
              />
              {post.likes.length}
            </div>
            <BiRepost
              className="  p-2  text-[50px] hover:text-green-400 hover:bg-green-400/20
              transition-all duration-300 ease-in-out rounded-full cursor-pointer active:scale-90"
            />

            <FaRegBookmark
              className="  p-3 text-[45px] hover:text-primary hover:bg-primary/20
            transition-all duration-300 ease-in-out rounded-full cursor-pointer active:scale-90"
            />
            <MdOutlineFileUpload
              className="  p-2 text-[45px] hover:text-primary hover:bg-primary/20
            transition-all duration-300 ease-in-out rounded-full cursor-pointer active:scale-90"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
