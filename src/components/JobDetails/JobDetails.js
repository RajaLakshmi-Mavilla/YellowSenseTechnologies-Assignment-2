import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./JobDetails.css";

const JobDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { job } = location.state || {};

  if (!job) {
    return <p>Job details not available.</p>;
  }

  return (
    <div className="job-details-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>
      <h2>{job.title}</h2>
      <p>
        <strong>Location:</strong> {job.primary_details?.Place || "N/A"}
      </p>
      <p>
        <strong>Salary:</strong> {job.primary_details?.Salary || "N/A"}
      </p>
      <p>
        <strong>Phone:</strong> {job.primary_details?.Phone || "N/A"}
      </p>
      {/* Add more details if available */}
      <p>
        <strong>Description:</strong>{" "}
        {job.description || "No description available."}
      </p>
      {/* Assuming the API provides a description field */}
    </div>
  );
};

export default JobDetails;
