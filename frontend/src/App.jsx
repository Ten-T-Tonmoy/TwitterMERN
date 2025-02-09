import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import NotificationPage from "./pages/NotificationPage";
import Profilepage from "./pages/Profilepage";
import Signup from "./pages/Signup";

import Leftbar from "./components/normal/Leftbar";
import Rightbar from "./components/normal/Rightbar";

function App() {
  return (
    <div className="flex max-w-6xl mx-auto">
      <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
