import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

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

  const handleInputs = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
    //works for forms?
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
        <form className="mx-auto lg:w-[30vw] flex-col gap-4 flex">
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
            Sign up
          </button>
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
