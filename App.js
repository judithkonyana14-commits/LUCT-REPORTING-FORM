import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Styles from "./Components/Styles";

// Components
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import Dashboard from "./Components/Dashboard";
import CourseList from "./Components/CourseList";
import ClassesList from "./Components/ClassesList";
import LecturesList from "./Components/LecturesList";
import LectureForm from "./Components/LectureForm";

export default function App() {
  return (
    <>
      {/* Global Styles */}
      <Styles />

      <BrowserRouter>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand" to="/">LUCT Reports</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/courses" className="nav-link">Courses</Link>
                </li>
                <li className="nav-item">
                  <Link to="/classes" className="nav-link">Classes</Link>
                </li>
                <li className="nav-item">
                  <Link to="/lectures" className="nav-link">Lectures</Link>
                </li>
                <li className="nav-item">
                  <Link to="/lecture/new" className="nav-link">New Report</Link>
                </li>
              </ul>

              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">Register</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/classes" element={<ClassesList />} />
          <Route path="/lectures" element={<LecturesList />} />
          <Route path="/lecture/new" element={<LectureForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Catch-all 404 */}
          <Route
            path="*"
            element={
              <div className="container mt-5 text-center">
                <h3>404 - Page Not Found</h3>
                <Link to="/" className="btn btn-primary mt-2">Go Home</Link>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
