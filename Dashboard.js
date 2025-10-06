import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [courses, setCourses] = useState([]);
  const [current, setCurrent] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const r = JSON.parse(localStorage.getItem("luct_reports") || "[]");
    const sortedReports = r.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setReports(sortedReports);

    const c = JSON.parse(localStorage.getItem("luct_courses") || "[]");
    setCourses(c);

    const u = JSON.parse(localStorage.getItem("luct_current_user") || "null");
    setCurrent(u);
  }, []);

  const logout = () => {
    localStorage.removeItem("luct_current_user");
    window.location.href = "/login";
  };

  const exportReports = () => {
    const csvHeader =
      "Course Code,Course Name,Lecturer,Date,Class,Faculty,Present,Registered,Venue,Time,Topic,Outcomes,Recommendations,Feedback\n";
    const csvRows = reports.map(
      (r) =>
        `"${r.courseCode}","${r.courseName}","${r.lecturerName}","${r.dateOfLecture}","${r.className}","${r.facultyName}","${r.actualPresent}","${r.totalRegistered}","${r.venue}","${r.scheduledTime}","${r.topic}","${r.learningOutcomes}","${r.recommendations}","${r.feedback || ""}"`
    );
    const blob = new Blob([csvHeader + csvRows.join("\n")], {
      type: "text/csv",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "reports.csv";
    link.click();
  };

  const filteredReports = reports.filter(
    (r) =>
      r.courseCode?.toLowerCase().includes(search.toLowerCase()) ||
      r.courseName?.toLowerCase().includes(search.toLowerCase()) ||
      r.lecturerName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        <h3>Dashboard</h3>
        <div>
          {current && (
            <strong className="me-3">
              Hi, {current.name} ({current.role})
            </strong>
          )}
          <button className="btn btn-sm btn-outline-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row mt-3">
        <div className="col-md-3">
          <div className="card p-3 text-center shadow-sm">
            <h6>Courses</h6>
            <div className="display-6">{courses.length}</div>
            <Link to="/courses" className="btn btn-sm btn-link">
              Manage
            </Link>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center shadow-sm">
            <h6>Reports</h6>
            <div className="display-6">{reports.length}</div>
            <Link to="/lecture/new" className="btn btn-sm btn-link">
              New Report
            </Link>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center shadow-sm">
            <h6>Total Students (Registered)</h6>
            <div className="display-6">
              {courses.reduce(
                (s, c) => s + (Number(c.totalRegistered) || 0),
                0
              )}
            </div>
            <Link to="/courses" className="btn btn-sm btn-link">
              View Courses
            </Link>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center shadow-sm">
            <h6>Recent Reports</h6>
            <div className="display-6">{reports.slice(0, 3).length}</div>
            <Link to="/dashboard#reports" className="btn btn-sm btn-link">
              View All
            </Link>
          </div>
        </div>
      </div>

      {/* Courses Overview */}
      <div className="mt-4">
        <h5>Courses Overview</h5>
        {courses.length === 0 ? (
          <p className="text-muted">No courses available. Add some courses first.</p>
        ) : (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Code</th>
                <th>Course Name</th>
                <th>Faculty</th>
                <th>Registered Students</th>
              </tr>
            </thead>
            <tbody>
              {courses.slice(0, 5).map((c) => (
                <tr key={c.id}>
                  <td>{c.courseCode}</td>
                  <td>{c.courseName}</td>
                  <td>{c.faculty}</td>
                  <td>{c.totalRegistered}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Reports Section */}
      <div className="mt-4" id="reports">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Recent Reports</h5>
          {reports.length > 0 && (
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={exportReports}
            >
              Export CSV
            </button>
          )}
        </div>

        {/* Search bar */}
        <div className="input-group my-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search reports by course, lecturer, or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredReports.length === 0 ? (
          <div className="alert alert-info mt-2">
            <strong>No reports yet.</strong> Try adding a{" "}
            <Link to="/lecture/new">new report</Link> or check your filters.
          </div>
        ) : (
          <div className="list-group">
            {filteredReports.slice(0, 8).map((r) => (
              <div
                key={r.id}
                className={`list-group-item ${
                  !r.recommendations ? "list-group-item-warning" : ""
                }`}
              >
                <div className="d-flex justify-content-between">
                  <div>
                    <strong>
                      {r.courseCode} — {r.topic || r.courseName}
                    </strong>
                    <div className="small text-muted">
                      Lecturer: {r.lecturerName} | Date: {r.dateOfLecture} |
                      Class: {r.className} | Faculty: {r.facultyName}
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="small text-muted">
                      {r.createdAt
                        ? new Date(r.createdAt).toLocaleString()
                        : "—"}
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <small>
                    Students Present: {r.actualPresent} / {r.totalRegistered}{" "}
                    <br />
                    Venue: {r.venue} | Time: {r.scheduledTime}
                  </small>
                  <div className="mt-1">
                    <strong>Learning Outcomes:</strong>{" "}
                    {r.learningOutcomes || "—"}
                  </div>
                  <div className="mt-1">
                    <strong>Recommendations:</strong>{" "}
                    {r.recommendations || (
                      <span className="text-danger">Not provided</span>
                    )}
                  </div>
                  {r.feedback && (
                    <div className="mt-1 text-success">
                      <strong>PRL Feedback:</strong> {r.feedback}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
