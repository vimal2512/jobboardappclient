import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <h1>Welcome to the Job Board</h1>
      <p>Find your dream job here.</p>
      <Link to="/jobs">
        <button>View Jobs</button>
      </Link>
    </div>
  );
}

export default Home;
