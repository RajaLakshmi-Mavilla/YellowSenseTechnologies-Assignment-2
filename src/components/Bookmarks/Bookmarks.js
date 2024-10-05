// src/components/Bookmarks/Bookmarks.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Bookmarks.css";

const Bookmarks = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookmarks = () => {
      const bookmarks =
        JSON.parse(localStorage.getItem("bookmarkedJobs")) || [];
      setBookmarkedJobs(bookmarks);
    };

    fetchBookmarks();
  }, []);

  const handleViewDetails = (job) => {
    navigate(`/job/${job.id}`, { state: { job } });
  };

  const handleRemoveBookmark = (jobId) => {
    const updatedBookmarks = bookmarkedJobs.filter((job) => job.id !== jobId);
    setBookmarkedJobs(updatedBookmarks);
    localStorage.setItem("bookmarkedJobs", JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="bookmarks-container">
      <h2>Bookmarked Jobs</h2>
      {bookmarkedJobs.length === 0 ? (
        <p>No jobs bookmarked yet</p>
      ) : (
        <div className="bookmarks-list">
          {bookmarkedJobs.map((job) => (
            <div key={job.id} className="bookmark-card">
              <h3 onClick={() => handleViewDetails(job)} className="job-title">
                {job.title}
              </h3>
              <p>
                <strong>Location:</strong> {job.primary_details?.Place || "N/A"}
              </p>
              <p>
                <strong>Salary:</strong> {job.primary_details?.Salary || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {job.primary_details?.Phone || "N/A"}
              </p>
              <button
                onClick={() => handleRemoveBookmark(job.id)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
