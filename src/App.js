// App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import Bookmarks from "./components/Bookmarks/Bookmarks";
import Jobs from "./components/Jobs/";
import JobDetails from "./components/JobDetails/JobDetails";
import "./App.css";

const App = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("SW registered: ", registration);
          })
          .catch((registrationError) => {
            console.log("SW registration failed: ", registrationError);
          });
      });
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <div className="content">
          <Routes>
            <Route path="/" element={<Jobs />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/job/:id" element={<JobDetails />} />
          </Routes>
        </div>
        <nav className="bottom-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
            end
          >
            Jobs
          </NavLink>
          <NavLink
            to="/bookmarks"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Bookmarks
          </NavLink>
        </nav>
      </div>
    </Router>
  );
};

export default App;
