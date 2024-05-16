import React, { useEffect, useState } from 'react';
import axios from 'axios';



const JobPostingForm = () => {


  const [formData, setFormData] = useState({
    user: '6645d6d1eb467541878da6dss1',
    title: 'Software Engineer',
    description: 'We are seeking a talented Software Engineer to join our team.',
    salary: 80000,
    company: 'Acme Inc.',
    email: 'careers@acme.com',
    job_category: 'Engineering',
    job_type: 'Full-time',
    job_experience: 'Mid-level',
    job_vacancy: 2,
    job_deadline: '2024-06-30',
  });



  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});


useEffect(() => {
setUser(JSON.parse(localStorage.getItem("userdata")))

},[])
  
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
      
      console.log(formData);
      formData.user = user?._id;
      console.log("dsd", formData);
      const res = await axios.post('/api/jobs/addjob', formData);
      console.log(res.data); 

    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.title) {
      errors.title = 'Title is required';
    }

    if (!data.description) {
      errors.description = 'Description is required';
    }

    if (!data.salary || data.salary < 0) {
      errors.salary = 'Salary must be a positive number';
    }

    if (!data.company) {
      errors.company = 'Company is required';
    }

    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid email address';
    }

    if (!data.job_category) {
      errors.job_category = 'Job category is required';
    }

    if (!data.job_type) {
      errors.job_type = 'Job type is required';
    }

    if (!data.job_experience) {
      errors.job_experience = 'Job experience is required';
    }

    if (!data.job_vacancy || data.job_vacancy < 1) {
      errors.job_vacancy = 'Job vacancy must be a positive number';
    }

    if (!data.job_deadline) {
      errors.job_deadline = 'Job deadline is required';
    }

    return errors;
  };

  return (
    <div className='py-10 border '>
        <div className='border-b py-10 mb-10'>
        <h1 className='text-center text-2xl font-bold'>Add Job's Details</h1>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        {errors.title && <p className="text-red-500">{errors.title}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block font-bold mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="salary" className="block font-bold mb-2">
          Salary
        </label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        {errors.salary && <p className="text-red-500">{errors.salary}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="company" className="block font-bold mb-2">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        {errors.company && <p className="text-red-500">{errors.company}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="job_category" className="block font-bold mb-2">
          Job Category
        </label>
        <input
          type="text"
          id="job_category"
          name="job_category"
          value={formData.job_category}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        {errors.job_category && (
          <p className="text-red-500">{errors.job_category}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="job_type" className="block font-bold mb-2">
          Job Type
        </label>
        <input
          type="text"
          id="job_type"
          name="job_type"
          value={formData.job_type}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        {errors.job_type && <p className="text-red-500">{errors.job_type}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="job_experience" className="block font-bold mb-2">
          Job Experience
        </label>
        <input
          type="text"
          id="job_experience"
          name="job_experience"
          value={formData.job_experience}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        {errors.job_experience && (
          <p className="text-red-500">{errors.job_experience}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="job_vacancy" className="block font-bold mb-2">
          Job Vacancy
        </label>
        <input
          type="number"
          id="job_vacancy"
          name="job_vacancy"
          value={formData.job_vacancy}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        {errors.job_vacancy && (
          <p className="text-red-500">{errors.job_vacancy}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="job_deadline" className="block font-bold mb-2">
          Job Deadline
        </label>
        <input
          type="date"
          id="job_deadline"
          name="job_deadline"
          value={formData.job_deadline}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"/>
          </div>
          {errors.job_deadline && (
          <p className="text-red-500">{errors.job_deadline}</p>
        )}

          <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
    </div>
    
  );
};

export default JobPostingForm;