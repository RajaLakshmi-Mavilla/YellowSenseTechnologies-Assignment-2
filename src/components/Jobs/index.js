import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable"; // Import swipeable
import "./Jobs.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [dismissedJobs, setDismissedJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://testapi.getlokalapp.com/common/jobs?page=${page}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.results.length > 0) {
          setJobs((prevJobs) => [...prevJobs, ...data.results]);
          setPage((prevPage) => prevPage + 1);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [page]);

  const handleBookmark = (job) => {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarkedJobs")) || [];
    const isAlreadyBookmarked = bookmarks.some((bJob) => bJob.id === job.id);
    if (!isAlreadyBookmarked) {
      bookmarks.push(job);
      localStorage.setItem("bookmarkedJobs", JSON.stringify(bookmarks));
      alert("Job bookmarked!");
    } else {
      alert("Job is already bookmarked.");
    }
  };

  const handleDismiss = (jobId) => {
    setDismissedJobs([...dismissedJobs, jobId]);
  };

  const handleSwipe = (job, direction) => {
    if (direction === "right") {
      handleBookmark(job);
    } else if (direction === "left") {
      handleDismiss(job.id);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: (event) => handleSwipe(event, "left"), // pass job context here if needed
    onSwipedRight: (event) => handleSwipe(event, "right"), // pass job context here if needed
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="jobs-container">
      <h2>Job Listings</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!isLoading && jobs.length === 0 && <p>No jobs available</p>}
      <div className="jobs-list">
        {jobs.map(
          (job) =>
            !dismissedJobs.includes(job.id) && (
              <div
                key={job.id}
                className="job-card"
                {...handlers} // Add swipe handlers here
              >
                <h3
                  onClick={() => navigate(`/job/${job.id}`, { state: { job } })}
                  className="job-title"
                >
                  {job.title}
                </h3>
                <p>
                  <strong>Location:</strong>{" "}
                  {job.primary_details?.Place || "N/A"}
                </p>
                <p>
                  <strong>Salary:</strong>{" "}
                  {job.primary_details?.Salary || "N/A"}
                </p>
                <p>
                  <strong>Phone:</strong> {job.primary_details?.Phone || "N/A"}
                </p>
              </div>
            )
        )}
      </div>
      <div className="pagination">
        <button
          onClick={() => setPage((prevPage) => prevPage - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={!hasMore}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Jobs; // Correct export
