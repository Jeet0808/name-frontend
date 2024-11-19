import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./Components/Login";
import Verification from "./Components/ver";
import SearchNearbyUsers from "./Components/SearchNearbyUsers";
import UserLocation from "./Components/UserLocation";

import SignUp from "./Components/SignUp";

function App() {

  return (
    <Router>
      <div>
        {/* Add navigation links */}
        <nav style={navStyle}>
          <Link style={linkStyle} to="/">Home</Link>
          <Link style={linkStyle} to="/signup">Sign Up</Link>
          <Link style={linkStyle} to="/login">Login</Link>
          <Link style={linkStyle} to="/search">Search Nearby Users</Link>
          <Link style={linkStyle} to="/userlocation">User Location</Link>
        </nav>

        {/* Define routes for each page */}
        <Routes>
          <Route
            path="/"
            element={<h1>Welcome to Medicapes Live. Testing version!</h1>}
          />
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/search" element={<SearchNearbyUsers />} />
          <Route path="/userlocation" element={<UserLocation />} />
          <Route
            path="*"
            element={<h1>404 - Page Not Found</h1>}
          />
        </Routes>
      </div>
    </Router>
  );
}

const navStyle = {
  padding: "10px",
  backgroundColor: "#f0f0f0",
  borderBottom: "1px solid #ccc",
};

const linkStyle = {
  margin: "0 10px",
  textDecoration: "none",
  color: "#007BFF",
};

export default App;
