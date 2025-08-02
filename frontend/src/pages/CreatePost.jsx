import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//react-icons
import { MdExpandMore } from "react-icons/md";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdGlobe } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineGifBox } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import LoadingSpin from "../components/normal/LoadingSpin";
import { Link } from "react-router-dom";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const imgRef = useRef(null);

  const createPostFn = async ({ text, img }) => {
    const isDev = import.meta.env.MODE === "development";

    try {
      const res = await fetch(
        isDev
          ? "/api/posts/create"
          : `${import.meta.env.VITE_API_BASE_URL}/api/posts/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ text, img }), //name same mind it
        }
      );

      const data = await res.json();
      if (!res.ok) {
        //res.ok
        throw new Error(data.error || "Creating post went wrong");
      }

      return data;
    } catch (e) {
      console.error("Create post FE error", e);
      throw new Error(e);
    }
  };

  const { data: authUser } = useQuery({ queryKey: ["authUser"] }); //authUser.data
  // console.log("this is authUser!", authUser);
  const queryClient = useQueryClient(); //to use global state
  const profileUrl = `/profile/${authUser?.username}`;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({ text, img });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; //always a list of input files
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        //after done reading its like assiging a function oh
        setImg(reader.result); // viewable img on web
      };
      reader.readAsDataURL(file); //what to read bruh
    }
  };

  return (
    <div className="w-full flex px-2 pb-2 pt-4 gap-3 border-b border-gray-800">
      {/**
       * left photo | whats happening?
       *    ----------------------------------
       *  img gif groak emoji location    post
       */}
      {/* <div className="w-10  p-3 h-10 rounded-full bg-primary "> </div> */}
      <Link to={`${profileUrl}`}>
        <img
          src={authUser?.profileImg || "/defaultuser.png"}
          alt="pfp"
          className="w-10 rounded-full h-10 "
        />
      </Link>
      <form className="w-full sm:w-[90%] " onSubmit={handleSubmit}>
        <div
          className="flex justify-start items-center text-primary border-white/30
        border w-fit rounded-xl px-3 font-bold hover:bg-blue-400/10 cursor-pointer"
        >
          Everyone
          <MdExpandMore className="text-[1.3rem]" />
        </div>
        {/* make the textarea frikcin strechable */}
        <textarea
          className="mt-2 w-full px-1 placeholder:text-gray-200/40 placeholder:text-xl text-lg resize-none  focus:outline-none border-none
        border-b-gray-800 textarea  max-h-[30vh]"
          placeholder="What's happening?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {img && (
          <div className="relative w-full pt-1 pb-4">
            <IoCloseOutline
              onClick={() => {
                setImg(null);
                imgRef.current.value = null;
              }}
              className="p-2 cursor-pointer rounded-full text-[40px] bg-gray-900 hover:bg-opacity-90 fixed 
            left-19 "
            />
            <img
              className="max-w-[83%] sm:max-w-[90%] max-h-60 rounded-2xl"
              src={img}
              alt="photo chosen to upload"
            ></img>
          </div>
        )}
        {/* icons section  */}
        <div
          className="flex justify-start sm:justify-between  pt-2 items-center max-w-[90%]
           sm:max-w-full border-t 
         border-gray-800"
        >
          <div className=" flex  justify-start gap-1">
            <IoImageOutline
              onClick={() => imgRef.current.click()}
              // simulates click on ref stored item
              className="text-[40px] text-primary p-2 transition-all duration-300 ease-in-out
            hover:bg-primary/30 rounded-full cursor-pointer"
            />
            <MdOutlineGifBox
              className="text-[40px] text-primary p-2 transition-all duration-300 ease-in-out
            hover:bg-primary/30 rounded-full cursor-pointer"
            />
            <IoMdGlobe
              className="text-[40px] text-primary p-2 transition-all duration-300 ease-in-out
            hover:bg-primary/30 rounded-full cursor-pointer"
            />
            <MdOutlineEmojiEmotions
              className="text-[40px] text-primary p-2 transition-all duration-300 ease-in-out
            hover:bg-primary/30 rounded-full cursor-pointer"
            />
            <IoLocationOutline
              className="text-[40px] text-primary p-2 transition-all duration-300 ease-in-out
            hover:bg-primary/30 rounded-full cursor-pointer"
            />
          </div>
          {/* button to post damn that ghost image choosing!  */}
          <input
            onChange={handleImageChange}
            type="file"
            accept="image/*"
            hidden
            ref={imgRef}
          />
          <button
            type="submit"
            className={`button bg-gray-200 text-stone-800   py-1
              transition-all duration-300 ease-in-out
              ${isPending ? "px-1" : "px-3"}
            ${
              text === "" && img === null
                ? "bg-white/40 cursor-default"
                : "bg-white active:scale-95 hover:bg-white/80"
            }
            rounded-3xl text-lg font-semibold
            `}
          >
            {isPending ? <LoadingSpin /> : "Post"}
          </button>
        </div>
        {isError && <div className="text-red-500">{error.message}</div>}
      </form>
    </div>
  );
};

export default CreatePost;
