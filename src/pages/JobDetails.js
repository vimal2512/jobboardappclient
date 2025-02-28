import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/jobs/${id}`) // Replace with your backend URL
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching job details:", error));
  }, [id]);

  if (loading) return <p>Loading job details...</p>;
  if (!job) return <p>Job not found</p>;

  return (
    <div className="container">
      <h1>{job.title}</h1>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
    </div>
  );
}

export default JobDetails;
