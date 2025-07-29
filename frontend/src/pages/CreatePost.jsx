import React from "react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const imgRef = useRef(null);

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient(); //to use global state

  const {
    mutate: createPost, //renamed mutate fn no needto type mutation.mutate
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: createPostFn,
    onSuccess: () => {
      setText("");
      setImg(null);
      toast.success("Post Created!");
      queryClient.invalidateQueries({ queryKey: ["posts"] }); //post related cache!
    },
  });

  const createPostFn = async ({ text, img }) => {
    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, img }), //name same mind it
      });

      const data = await res.json();
      if (!res.success) {
        throw new Error(data.error || "Creating post went wrong");
      }

      return data;
    } catch (e) {
      console.error("Create post FE error", e);
    }
  };

  return <div></div>;
};

export default CreatePost;
