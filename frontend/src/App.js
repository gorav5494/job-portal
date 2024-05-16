import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./component/Navbar";
import Profile from "./pages/profile";
import JobPostingForm from "./pages/Jobs/addjob";

const App = () => {
  return (
    <div>
        <Router>
         <Navbar />
          <Routes>          
              <Route path="/" element={<Home/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/addjob" element={<JobPostingForm />} />

          </Routes>            
        </Router>
    </div>
  );
};

export default App;
