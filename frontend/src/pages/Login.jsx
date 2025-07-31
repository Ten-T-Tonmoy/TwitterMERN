import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import CrownSvg from "../components/Crown";
import Crown2Svg from "../components/Crown2";

import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";

const Login = () => {
  const [formInfo, setFormInfo] = useState({
    username: "",
    password: "",
  });
  const queryClient = useQueryClient();
  const isDev = import.meta.env.MODE === "development";

  const {
    mutate: mutateLogin,
    //basically renamed on destructing
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const { data } = await axios.post(
          isDev
            ? "/api/auth/login"
            : `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
          {
            username,
            password,
          }
        );
        console.log(`${data.username} logged in`);
        //if resp used then resp.data.username
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },

    onSuccess: () => {
      toast.success("Logged in Successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleInputs = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutateLogin(formInfo);
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
        {/* Input form starts here */}
        <Crown2Svg className="lg:hidden w-[100px] mb-2" />
        <form
          onSubmit={handleSubmit}
          className="mx-auto lg:w-[30vw] flex-col gap-4 flex"
        >
          <h1
            className="text-4xl text-white font-extrabold
		   "
          >
            Join Today .
          </h1>

          <label className="input rounded-md  input-bordered flex items-center gap-2">
            <MdOutlineMail className="text-white" />
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
            {isPending ? "Loading..." : "Log in"}
          </button>
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
        <div className="flex flex-col flex-wrap  gap-2 mt-4">
          <p
            className="text-white 
		  text-lg"
          >
            {"Don't "}
            have an account?
          </p>
          <Link to="/signup">
            <button
              className="btn rounded-full text-white btn-primary
			  btn-outline w-full  "
            >
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
