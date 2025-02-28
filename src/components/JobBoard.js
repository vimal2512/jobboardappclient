import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { TextField, Button, List, ListItem, Pagination, Container } from "@mui/material";

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ Wrapping fetchJobs in useCallback prevents infinite re-renders
  const fetchJobs = useCallback(async () => {
    console.log("Fetching:", `http://localhost:5000/api/jobs?page=${page}&search=${search}`);
    try {
      const response = await axios.get(`http://localhost:5000/api/jobs`, {
        params: { search, page },
      });
      setJobs(response.data.jobs || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching jobs", error);
    }
  }, [page, search]); // ✅ Dependencies are now properly handled

  useEffect(() => {
    fetchJobs(); // ✅ fetchJobs is now stable and doesn't trigger infinite loops
  }, [fetchJobs]);

  return (
    <Container>
      <h1>Job Board</h1>
      <TextField
        label="Search Jobs"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => { setPage(1); fetchJobs(); }}
        style={{ marginTop: 10 }}
      >
        Search
      </Button>
      <List>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <ListItem key={job._id}>{job.title} - {job.company}</ListItem>
          ))
        ) : (
          <p>No jobs found</p>
        )}
      </List>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => { setPage(value); fetchJobs(); }}
      />
    </Container>
  );
};

export default JobBoard;
