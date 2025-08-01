import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Homepage from "./pages/Homepage";

import LoadingSpin from "./components/normal/LoadingSpin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotificationPage from "./pages/NotificationPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import ProfileUpdate from "./pages/profilePage/ProfileUpdate";

import Leftbar from "./components/normal/Leftbar";
import Rightbar from "./components/normal/Rightbar";

function App() {
  //
  const isDev = import.meta.env.MODE === "development";

  const { data: authenticated, isLoading } = useQuery({
    queryKey: ["authUser"], // use this query key to get the user bruh?
    queryFn: async () => {
      try {
        const res = await fetch(
          isDev
            ? "/api/auth/me"
            : `${import.meta.env.VITE_API_BASE_URL}/api/auth/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          const data = await res.json();
          throw new Error(
            data.error || "Shit happened while trying to check profile"
          );
        }

        const data = await res.json();
        console.log("Authenticated user : ", data);
        return data;
      } catch (error) {
        // optional chaining bruh
        throw new Error(error.message || error.response?.data?.message);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpin size="lg" />
      </div>
    );
  }

  //ps short note for me
  //while navigating to conditional make sure priority order is in flow
  return (
    <div className="flex max-w-[1270px] mx-auto ">
      {authenticated && <Leftbar />}

      <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route
          path="/"
          element={authenticated ? <Homepage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:username"
          element={authenticated ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route path="/profile/:username/update" element={<ProfileUpdate />} />
        <Route
          path="/notifications"
          element={
            authenticated ? <NotificationPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/signup"
          element={!authenticated ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authenticated ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
      {authenticated && <Rightbar />}
      <Toaster />
    </div>
  );
}

export default App;
