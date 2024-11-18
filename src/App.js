import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Import react-router-dom components
import SignUp from "./Components/SignUp"; // Import SignUp component
import Login from "./Components/Login"; // Import Login component
import Verification from "./Components/ver"; // Import Verification component
import SearchNearbyUsers from "./Components/SearchNearbyUsers"; // Import SearchNearbyUsers component
import UserLocation from "./Components/UserLocation"; 

function App() {
  const [mobileno, setMobileno] = useState(""); // State to store mobile number

  return (
    <Router>
      <div>
        {/* Add navigation links */}
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/signup">Sign Up</Link> |{" "}
          <Link to="/login">Login</Link> |{" "}
          <Link to="/search">Search Nearby Users</Link> |{" "}
          <Link to="/userlocation">User Location</Link>
        </nav>

        {/* Define routes for each page */}
        <Routes>
          <Route path="/" element={<h1>Welcome to the App!</h1>} />
          <Route
            path="/signup"
            element={<SignUp setMobileno={setMobileno} />} // Pass setMobileno function to SignUp
          />
          <Route path="/login" element={<Login />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/search" element={<SearchNearbyUsers />} />
          <Route
            path="/userlocation"
            element={<UserLocation mobileno={mobileno} />} // Pass mobileno prop to UserLocation
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
