/* eslint-disable react/prop-types */

import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

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
        className="flex  gap-2 items-start p-4 border-b
   border-gray-700"
      >
        <div className="flex gap-2 items-start p-4 border-b border-gray-700">
          {/** avatar later */}
          <Link></Link>
        </div>
        Post
      </div>
    </>
  );
};

export default PostCard;
