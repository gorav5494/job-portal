import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    company: "",
    job_type: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFilterChange = () => {
    setFilters({
      search,
      company,
      job_type: type,
    });
  };

  // Fetch all jobs from the API
  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/jobs");

      // Debugging point: Log response to verify structure
      console.log("API Response:", response.data);

      // Check if response.data.jobs is an array before setting state
      const allJobs = Array.isArray(response.data.jobs)
        ? response.data.jobs
        : [];
      setJobs(allJobs);
      setFilteredJobs(allJobs); // Display all jobs initially
    } catch (error) {
      setError("Failed to fetch jobs.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter jobs based on the search criteria
  const filterJobs = () => {
    if (!Array.isArray(jobs)) {
      console.error("Jobs data is not an array:", jobs);
      return;
    }

    const filtered = jobs.filter((job) => {
      const title = job.title ? job.title.toLowerCase() : "";
      const companyName = job.company ? job.company.toLowerCase() : "";
      const jobType = job.job_type || "";
      const matchesTitle = title.includes(filters.search.toLowerCase());
      const matchesCompany = companyName.includes(
        filters.company.toLowerCase()
      );
      const matchesType = filters.job_type
        ? jobType === filters.job_type
        : true;

      return matchesTitle && matchesCompany && matchesType;
    });

    // Debugging point: Log filtered data to ensure correct filtering
    console.log("Filtered Data:", company, type, search, filtered, jobs);

    setFilteredJobs(filtered);
  };

  // Fetch jobs when component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  // Run filterJobs only when filters change
  useEffect(() => {
    filterJobs();
  }, [filters, jobs]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Job Search Portal
        </h1>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded p-2"
            />
            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="border rounded p-2"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border rounded p-2"
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <button
            onClick={handleFilterChange}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center text-gray-600">
            No jobs found. Try adjusting your search criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredJobs.map((job) => (
              <div key={job._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {job.title}
                    </h2>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {job.job_type}
                  </span>
                </div>
                <p className="mt-4 text-gray-700">{job.job_category}</p>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-gray-600">{job.salary}</span>
                  <span className="text-gray-500 text-sm">
                    job_deadline:{" "}
                    {new Date(job.job_deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Search;
