import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const JobPostingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
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

  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userdata"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      // Redirect to login if no user is found in local storage
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const postData = { ...formData, user: user._id };
        const res = await axios.post("/api/jobs/addjob", postData);

        console.log("data", res.data.data);

        localStorage.setItem("jobdetail", JSON.stringify(res.data.data));

        setTimeout(() => {
          toast.success("Form Submitted Successfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          navigate("/viewjobs");
        }, 2000);
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle error appropriately, e.g., set an error message
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.job_title) {
      errors.job_title = "Title is required";
    }

    if (!data.description) {
      errors.description = "Description is required";
    }

    if (!data.salary || data.salary <= 0) {
      errors.salary = "Salary must be a positive number";
    }

    if (!data.company) {
      errors.company = "Company is required";
    }

    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email address";
    }

    if (!data.job_category) {
      errors.job_category = "Job category is required";
    }

    if (!data.job_type) {
      errors.job_type = "Job type is required";
    }

    if (!data.job_experience) {
      errors.job_experience = "Job experience is required";
    }

    if (!data.job_vacancy || data.job_vacancy < 1) {
      errors.job_vacancy = "Job vacancy must be a positive number";
    }

    if (!data.job_deadline) {
      errors.job_deadline = "Job deadline is required";
    }

    return errors;
  };

  return (
    <div className="py-10 border bg-gray-50">
      <div className="border-b py-10 mb-10">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Add Job's Details
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
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
          {errors.job_title && (
            <p className="text-red-500 text-sm">{errors.job_title}</p>
          )}
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
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
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
          {errors.salary && (
            <p className="text-red-500 text-sm">{errors.salary}</p>
          )}
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
          {errors.company && (
            <p className="text-red-500 text-sm">{errors.company}</p>
          )}
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
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
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
          {errors.job_category && (
            <p className="text-red-500 text-sm">{errors.job_category}</p>
          )}
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
          {errors.job_type && (
            <p className="text-red-500 text-sm">{errors.job_type}</p>
          )}
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
          {errors.job_experience && (
            <p className="text-red-500 text-sm">{errors.job_experience}</p>
          )}
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
          {errors.job_vacancy && (
            <p className="text-red-500 text-sm">{errors.job_vacancy}</p>
          )}
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
          {errors.job_deadline && (
            <p className="text-red-500 text-sm">{errors.job_deadline}</p>
          )}
        </div>
        <button
          type="submit"
          className="flex items-center justify-center mx-auto relative h-12 w-40 overflow-hidden border border-indigo-600 text-indigo-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80"
        >
          <span className="relative z-10">Submit</span>
        </button>
      </form>
    </div>
  );
};

export default JobPostingForm;
