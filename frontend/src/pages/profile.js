import React, { useEffect, useState } from "react";
// import * as Icon from "react-icons/cg";
import axios from "axios";
import { Link } from "react-router-dom";
// import profile from '../../public/profile.png'

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const usr = JSON.parse(localStorage.getItem("userdata"));
      const res = await axios.get(`/api/users/${usr._id}`);
      console.log("userr", res.data.data);

      setUser(res.data.data);
      console.log(setUser);
    };

    fetchUserData();
  }, []);

  return (
    <>
      <section className="h-screen">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="items-center flex flex-col">
            {/* <Icon.CgProfile /> */}
            <img
              src={process.env.PUBLIC_URL + "/profile.png"}
              height={100}
              width={100}
              className="rounded-2xl mb-5"
              alt={Profile}
            />
            <div>
              <h2 className="text-2xl font-bold text-center">{user.name}</h2>
              <p className="text-gray-600 font-bold">{user.email}</p>
            </div>
          </div>
          <div className="text-center">
            <Link
              to="/resetpassword"
              className="inline-block mt-5 w-2/12 mx-auto  bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  text-lg"
            >
              Reset Passoword
            </Link>
          </div>

          {/* <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">About</h3>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.
        </p>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Skills</h3>
        <div className="flex flex-wrap">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2">
            React
          </span>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2">
            JavaScript
          </span>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2">
            Node.js
          </span>
        </div>
      </div> */}
        </div>
      </section>
    </>
  );
};

export default Profile;
