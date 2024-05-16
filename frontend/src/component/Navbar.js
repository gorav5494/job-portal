import React, { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import * as Icon from "react-icons/cg";

function Navbar () {

    const [isOpen, setIsOpen] = useState(false);
    const [user, setuser] = useState({});
    const navigate = useNavigate();
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const logout = () => {
        
        localStorage.removeItem("userdata");
        navigate("/login");
        window.location.reload();
    }
    useEffect(() => {
        setuser(localStorage.getItem("userdata"))
    })

    return(
        <>
       <header className="bg-black py-5">
            <nav className="container mx-auto">
                <ul className="flex items-center justify-end gap-5">
                    <li>
                        <Link to={"/"} className="text-white">
                            Home
                        </Link>
                    </li>
                    <li>
                    <Link to={"/register"} className="text-white">
                            Register
                        </Link>
                    </li>
                    <li>
                    <Link to={"/Login"} className="text-white">
                            Login
                        </Link>
                    </li>
                    <li>
                    <Link to={"/view"} className="text-white">
                           View
                        </Link>
                    </li>
                    {
                         user && <li> 
                            <Link to={"/addjob"} className="text-white">
                                    AddJob
                                </Link>
                         </li>
                    }
                    {
                        user && <li> 
                       
                        <div className="dropdown">
                            <button className="dropdown-toggle bg-white align-middle rounded p-1" onClick={toggleDropdown}>
                            <Icon.CgProfile />
                            </button>
                            
                    {isOpen && (
                        <div className="origin-top-right absolute  mt-2  rounded-md shadow-lg p-3 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="dropdown-menu text-white font-semibold block  uppercase">
                                <Link to={"/profile"} className="dropdown-item mb-1 hover:text-black text-slate-800">
                                    Profile
                                </Link>
                                <Link onClick={logout} className="dropdown-item  block hover:text-black text-slate-800">
                                    Logout
                                </Link>
                                </div>
                                </div>
                            )}
                    
                            </div>
                        </li>
                            
                    }
                    
                   
                </ul>
            </nav>
        </header>
        </>
    )
}
export default Navbar;