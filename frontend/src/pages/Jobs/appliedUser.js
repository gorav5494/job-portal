import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useParams } from "react-router-dom";

const UserList = () => {
  const [applyusers, setapplyUsers] = useState([]);

  useEffect(() => {
    const applyJobs = async () => {
      try {
        const res = await axios.get("/api/applyjobs");
        if (res.data && res.data.success && Array.isArray(res.data.applyjob)) {
          setapplyUsers(res.data.applyjob);
          console.log("data", res.data);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    applyJobs();
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h1 className="text-2xl uppercase text-center mb-10">
          Registered Users
        </h1>
        <div className="grid grid-cols-1 gap-4">
          {applyusers && applyusers.length > 0 ? (
            applyusers.map((user) => (
              <div key={user._id} className="bg-white p-4 rounded shadow-md">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p>{user.email}</p>
                <p>{user.about}</p>
                <p>{user.job}</p>
                <a
                  href={`http://localhost:4000/uploads/${user.cv}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Download CV
                </a>
              </div>
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserList;
