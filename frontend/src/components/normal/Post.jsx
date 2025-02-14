import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import LoadingSpin from "./LoadingSpin";

const Post = () => {
  return (
    <div
      className="flex gap-2 items-start p-4 border-b
   border-gray-700"
    >
      Post
    </div>
  );
};

export default Post;
