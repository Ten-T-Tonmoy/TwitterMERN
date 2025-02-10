import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import CrownSvg from "../components/Crown";
import Crown2Svg from "../components/Crown2";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";

const Signup = () => {
  const [formInfo, setFormInfo] = useState({
    email: "",
    username: "",
    fullname: "",
    password: "",
  });

  const queryClient = useQueryClient();

  //ignore this shiii
  const oldFashionedFunc = async ({ email, username, fullname, password }) => {
    try {
      const resp = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          fullname,
          password,
        }),
      });
      //jsoing to see just not needed tho!?
      const parsedData = await resp.json();
      if (!resp.ok) {
        throw new Error(parsedData.error || "Failed to create acc");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, username, fullname, password }) => {
      try {
        const { data } = await axios.post("/api/auth/signup", {
          email,
          username,
          fullname,
          password,
        });
        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    onSuccess: () => {
      toast.success("Account registered Successfully");

      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      //invalidates cookies they refreshes
    },
  });

  const handleInputs = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
    //works for forms?
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formInfo);
  };
  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      <div className="flex-1 mx-5 hidden lg:flex items-center justify-center">
        <CrownSvg className="lg:w-[30vw] " />
      </div>
      <div
        className="flex flex-col flex-wrap 
	  items-center justify-center "
      >
        <Crown2Svg className="lg:hidden w-[100px] mb-2" />
        {/* Input form starts here */}
        <form
          className="mx-auto lg:w-[30vw] flex-col gap-4 flex"
          onSubmit={handleSubmit}
        >
          <h1
            className="text-4xl text-white font-extrabold
		   "
          >
            Join Today .
          </h1>
          <label className="input rounded-md input-bordered flex items-center gap-2">
            <MdOutlineMail className="text-white" />
            <input
              type="text"
              className="grow"
              placeholder="Email"
              name="email"
              value={formInfo.email}
              onChange={handleInputs}
            />
          </label>
          <label className="input rounded-md  input-bordered flex items-center gap-2">
            <FaUser className="text-white" />
            <input
              type="text"
              name="fullname"
              className="grow"
              placeholder="Full name"
              value={formInfo.fullname}
              onChange={handleInputs}
            />
          </label>
          <label className="input rounded-md  input-bordered flex items-center gap-2">
            <MdDriveFileRenameOutline className="text-white" />
            <input
              type="text"
              name="username"
              className="grow"
              placeholder="Username"
              value={formInfo.username}
              onChange={handleInputs}
            />
          </label>
          <label className="input input-bordered rounded-md flex items-center gap-2">
            <MdPassword className="text-white" />
            <input
              type="password"
              name="password"
              className="grow"
              placeholder="password"
              value={formInfo.password}
              onChange={handleInputs}
            />
          </label>
          <button
            className="btn rounded-full btn-primary
			  text-white w-full"
          >
            {isPending ? "Loading..." : "Sign up"}
          </button>
          {isError && <p className="text-red-500 ">{error.message}</p>}
        </form>
        <div className="flex flex-col flex-wrap  gap-2 mt-4">
          <p
            className="text-white 
		  text-lg"
          >
            Already have an account?
          </p>
          <Link to="/login">
            <button
              className="btn rounded-full text-white btn-primary
			  btn-outline w-full  "
            >
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
