import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Viewjoblisting() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const jobdetails = () => {
    navigate("/jobdetails");
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/jobs");
        console.log("dkfd", res.data.data);
        if (Array.isArray(res.data)) {
          setJobs(res.data);
          console.log("dkfd", jobs);
        }

        setJobs(res.data.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [jobs]);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-lg border shadow-lg hover:shadow-2xl"
            >
              <h2 className="text-xl font-semibold mb-2 capitalize ">
                <span className="font-bold ">Profile :</span> {job.title}
              </h2>
              <p className="text-gray-700 mb-4">
                <span className="font-bold">Description :</span>{" "}
                {job.description}
              </p>
              <p>
                <span className="text-gray-900 font-bold">Company:</span>{" "}
                {job.company}
              </p>
              <p>
                <span className="text-gray-700 font-bold">Category:</span>{" "}
                {job.job_category}
              </p>
              <p>
                <span className="text-gray-700 font-bold">Deadline:</span>{" "}
                {new Date(job.job_deadline).toLocaleDateString()}
              </p>
              <div className="text-center mt-5">
                <button
                  onClick={jobdetails}
                  className="relative h-12 w-40 overflow-hidden border border-indigo-600 text-indigo-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80"
                >
                  <span class="relative z-10">More Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Viewjoblisting;
