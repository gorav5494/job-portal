import React, { useEffect, useState } from "react";
import axios from "axios";

function Viewjoblisting() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/alljobs");

        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              <p className="text-gray-700 mb-4">{job.description}</p>
              <p className="text-gray-900 font-bold">Company: {job.company}</p>
              <p className="text-gray-900 font-bold">Salary: ${job.salary}</p>
              <p className="text-gray-700">Category: {job.job_category}</p>
              <p className="text-gray-700">Type: {job.job_type}</p>
              <p className="text-gray-700">Experience: {job.job_experience}</p>
              <p className="text-gray-700">Vacancies: {job.job_vacancy}</p>
              <p className="text-gray-700">
                Deadline: {new Date(job.job_deadline).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Viewjoblisting;
