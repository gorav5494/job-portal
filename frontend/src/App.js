import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./component/Navbar";
import Profile from "./pages/profile";
import JobPostingForm from "./pages/Jobs/addjob";
import Jobdetails from "./pages/Jobs/jobdetails";
import Applyjob from "./pages/Jobs/applyjob";
import Footer from "./component/Footer";
import Viewjoblisting from "./pages/Jobs/viewjoblisting";
import JobPortalPopup from "./pages/shared/popup";
import ForgetPassoword from "./pages/shared/forgotPassword";
import ResetPassword from "./pages/shared/resetpassword";
import UserList from "./pages/Jobs/appliedUser";

const App = () => {
  return (
    <div>
      <Router>
        <JobPortalPopup />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/addjob" element={<JobPostingForm />} />
          <Route path="/jobdetails/:id" element={<Jobdetails />} />
          <Route path="/applyjob" element={<Applyjob />} />
          <Route path="/viewjobs" element={<Viewjoblisting />} />
          <Route path="/forgotpassword" element={<ForgetPassoword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/applylist" element={<UserList />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
