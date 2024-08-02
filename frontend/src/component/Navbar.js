import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Icon from "react-icons/cg";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setuser] = useState({});
  const [usertype, setUsertype] = useState({});
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.removeItem("userdata");
    navigate("/login");
    window.location.reload();
  };
  useEffect(() => {
    setuser(localStorage.getItem("userdata"));
    setUsertype(localStorage.getItem("usertype"));
    // console.log("hds", setuser);
  });

  return (
    <>
      <header className="bg-black py-8 shadow-2xl sticky top-0 w-full z-50 border-b border-b-zinc-400 ">
        <nav className="container mx-auto flex justify-between">
          <div className="text-white">
            <Link to={"/"} className="text-white">
              <h1>JOB PORTAL</h1>
            </Link>
          </div>
          <ul className="flex items-center justify-end gap-5">
            <li>
              <Link to={"/"} className="text-white uppercase">
                Home
              </Link>
            </li>

            <li>
              <Link to={"/viewjobs"} className="text-white uppercase">
                View Jobs
              </Link>
            </li>
            {user && usertype === "recruitment" && (
              <li>
                <Link to={"/applylist"} className="text-white uppercase">
                  AppliedJob list
                </Link>
              </li>
            )}
            <li>
              <Link to={"/about"} className="text-white uppercase">
                About
              </Link>
            </li>
            {!user && (
              <li>
                <Link to={"/register"} className="text-white uppercase">
                  Register
                </Link>
              </li>
            )}
            {!user && (
              <li className="">
                <Link to={"/Login"} className="text-white uppercase">
                  Login{" "}
                  <img
                    src={process.env.PUBLIC_URL + "/profile.png"}
                    height={20}
                    width={20}
                    className="rounded-2xl  inline-block align-middle"
                  />
                </Link>
              </li>
            )}
            {user && usertype === "recruitment" && (
              <li>
                <Link to={"/addjob"} className="text-white">
                  AddJob
                </Link>
              </li>
            )}
            {user && (
              <li>
                <div className="dropdown">
                  <button
                    className="dropdown-toggle bg-white align-middle rounded p-1"
                    onClick={toggleDropdown}
                  >
                    <Icon.CgProfile />
                  </button>

                  {isOpen && (
                    <div className="origin-top-right absolute z-10 mt-2  rounded-md shadow-lg p-3 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="dropdown-menu text-white font-semibold block  uppercase">
                        <Link
                          to={"/profile"}
                          className="dropdown-item mb-1 hover:text-black text-slate-800"
                        >
                          Profile
                        </Link>
                        <Link
                          onClick={logout}
                          className="dropdown-item  block hover:text-black text-slate-800"
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}
export default Navbar;
