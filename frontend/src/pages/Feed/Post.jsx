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

import { RiVerifiedBadgeFill } from "react-icons/ri"; //blue
import { MdVerified } from "react-icons/md"; //gold

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

  const deletePostFn = async () => {
    try {
      const res = await fetch(`api/posts/${post._id}`, { method: "DELETE" });
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

  return (
    <>
      <div
        className="flex w-full gap-2 items-start p-4 pb-1 border-b
   border-gray-700"
      >
        <div
          className="flex gap-2 items-start h-10 w-10 rounded-full 
          bg-primary border-gray-700"
        >
          {/** avatar later */}
          <Link></Link>
        </div>

        {/* main post card here */}
        {/**
         * pfp |name(tick) @username .23h         globe 3dots(del)
         *     |text # @filters
         *     |image 2xl rounded
         *     | icons
         *     |border-b
         */}
        <div className="w-[90%]">
          <div className="flex items-center ">
            <p className="font-bold ">{post.user.fullname}</p>
            <RiVerifiedBadgeFill className="text-primary text-lg mx-1" />
            <p className="text-white/60 font-light">
              {"@" + post.user.username}
            </p>
            <p className="text-white/60 mx-1">
              <span className="font-extrabold">· </span>
              {structuredDate}
            </p>
          </div>

          {/* content */}
          <div
            className="max-w-[95%] text-white pt-1 pb-3
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

          <div className="flex max-w-[95%] justify-between pt-2 items-center text-white/70">
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
