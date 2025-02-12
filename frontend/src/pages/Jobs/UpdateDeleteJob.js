import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateDeleteJob() {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    job_title: "",
    description: "",
    salary: "",
    company: "",
    email: "",
    job_category: "",
    job_type: "",
    job_experience: "",
    job_vacancy: "",
    job_deadline: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("/api/jobs");
      setJobs(response.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/jobs/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post("/api/jobs", formData);
      }
      // Reset form after successful submission
      setFormData({
        job_title: "",
        description: "",
        salary: "",
        company: "",
        email: "",
        job_category: "",
        job_type: "",
        job_experience: "",
        job_vacancy: "",
        job_deadline: "",
      });
      fetchJobs();
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/jobs/${id}`);
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleEdit = (job) => {
    setFormData({
      job_title: job.job_title,
      description: job.description,
      salary: job.salary,
      company: job.company,
      email: job.email,
      job_category: job.job_category,
      job_type: job.job_type,
      job_experience: job.job_experience,
      job_vacancy: job.job_vacancy,
      job_deadline: job.job_deadline,
    });
    setEditingId(job._id);
    // Scroll to the form
    window.scrollTo({
      top: document.querySelector("form").offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-6 rounded-lg border shadow-lg hover:shadow-2xl"
              >
                <h2 className="text-xl font-semibold mb-2 capitalize">
                  <span className="font-bold">Profile:</span> {job.job_title}
                </h2>
                <p className="text-gray-700 mb-4">
                  <span className="font-bold">Description:</span>{" "}
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
                <div className="flex justify-center gap-4 mt-5">
                  <button
                    onClick={() => handleEdit(job)}
                    className="relative h-12 w-40 overflow-hidden border border-indigo-600 text-indigo-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80"
                  >
                    <span className="relative z-10">Edit Job</span>
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="relative h-12 w-40 overflow-hidden border border-red-600 text-red-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-red-600 before:duration-300 before:ease-out hover:text-white hover:shadow-red-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80"
                  >
                    <span className="relative z-10">Delete Job</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      </div>

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">
          {editingId ? "Edit Job" : "Add New Job"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          {/* Form fields remain the same, but update onChange handlers */}
          <div className="mb-6">
            <label
              htmlFor="job_title"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Job Profile
            </label>
            <input
              type="text"
              id="job_title"
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="salary"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Salary
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="company"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="job_category"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Job Category
            </label>
            <select
              id="job_category"
              name="job_category"
              value={formData.job_category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Job Category</option>
              <option value="IT and Development job">
                IT and Development job
              </option>
              <option value="Accounting Job">Accounting Job</option>
              <option value="Administrative Job">Administrative Job</option>
              <option value="Customer service Job">Customer service Job</option>
              <option value="Human Resources(HR)">Human Resources(HR)</option>
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="job_type"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Job Type
            </label>
            <select
              id="job_type"
              name="job_type"
              value={formData.job_type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="job_experience"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Job Experience
            </label>
            <input
              type="text"
              id="job_experience"
              name="job_experience"
              value={formData.job_experience}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="job_vacancy"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Job Vacancy
            </label>
            <input
              type="number"
              id="job_vacancy"
              name="job_vacancy"
              value={formData.job_vacancy}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="job_deadline"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Job Deadline
            </label>
            <input
              type="date"
              id="job_deadline"
              name="job_deadline"
              value={formData.job_deadline}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              {editingId ? "Update Job" : "Add Job"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    job_title: "",
                    description: "",
                    salary: "",
                    company: "",
                    email: "",
                    job_category: "",
                    job_type: "",
                    job_experience: "",
                    job_vacancy: "",
                    job_deadline: "",
                  });
                }}
                className="mt-4 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateDeleteJob;
