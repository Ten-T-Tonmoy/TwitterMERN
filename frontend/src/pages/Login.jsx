import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpin from "../components/normal/LoadingSpin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import CrownSvg from "../components/Crown";
import Crown2Svg from "../components/Crown2";
import { IoKeyOutline } from "react-icons/io5";

import { MdOutlineMail } from "react-icons/md";
import { LuCrown } from "react-icons/lu";

const Login = () => {
  const [formInfo, setFormInfo] = useState({
    username: "",
    password: "",
  });
  const queryClient = useQueryClient();
  const isDev = import.meta.env.MODE === "development";
  const navigate = useNavigate();

  const {
    mutate: mutateLogin,
    //basically renamed on destructing
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const res = await fetch(
          isDev
            ? "/api/auth/login"
            : `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
            credentials: "include",
          }
        );

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Login failed");
        }

        return await res.json();
      } catch (error) {
        throw new Error(error);
      }
    },

    onSuccess: () => {
      toast.success("Logged in Successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
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
    <div className="w-[100vw] h-screen flex flex-col pb-1">
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
              className="text-4xl text-white font-extrabold text-center
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
              <IoKeyOutline className="text-white" />
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
              Log in
              {isPending && <LoadingSpin />}
            </button>
          </form>
          <div className="flex flex-col flex-wrap  gap-2 mt-4">
            <p
              className="text-white/70
		  text-md"
            >
              {"Don't "}
              have an account?
            </p>
            <Link to="/signup">
              <button
                className="btn rounded-full text-primary border-primary
			         w-full hover:text-white hover:bg-primary "
              >
                Sign up
              </button>
            </Link>
          </div>
          {isError ? (
            <p className="text-red-500 text-center">{error.message}</p>
          ) : (
            <p className="text-black">pholder</p>
          )}
        </div>
      </div>

      {/* small footer  */}
      <div
        className="text-gray-400/50  justify-center flex flex-col md:flex-row md:gap-1
            text-[.9rem] items-center"
      >
        Desgin inspired from X & programmed by
        <span className="text-primary font-bold ">FH Tonmoy </span>
        <p className="flex items-center gap-1">
          ©2025 . XCROWN <LuCrown className="text-white inline" />
        </p>
      </div>
    </div>
  );
};

export default Login;
