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
import Profilepage from "./pages/Profilepage";

import Leftbar from "./components/normal/Leftbar";
import Rightbar from "./components/normal/Rightbar";

function App() {
  //
  const { data: authenticated, isLoading } = useQuery({
    queryKey: ["authUser"], // use this query key to get the user bruh?
    queryFn: async () => {
      try {
        const res = await axios.get("/api/auth/me");
        // axios response status check
        if (res.status !== 200) {
          throw new Error(
            res.error || "Shit happened while trying to check profile"
          );
        }
        console.log("Authenticated user : ", res);
        return res;
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
    <div className="flex max-w-[1270px] mx-auto">
      {authenticated && <Leftbar />}

      <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route
          path="/"
          element={authenticated ? <Homepage /> : <Navigate to="/login" />}
        />
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
