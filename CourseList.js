import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    courseName: "",
    courseCode: "",
    faculty: "",
    totalRegistered: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("luct_courses") || "[]");
    setCourses(stored);
  }, []);

  const saveCourses = (next) => {
    localStorage.setItem("luct_courses", JSON.stringify(next));
    setCourses(next);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.courseName || !form.courseCode) return alert("Course name & code required");
    const exists = courses.some((c) => c.courseCode === form.courseCode);
    if (exists) return alert("Course code already exists");
    const next = [...courses, { ...form }];
    saveCourses(next);
    setForm({ courseName: "", courseCode: "", faculty: "", totalRegistered: "" });
  };

  const handleDelete = (code) => {
    if (!window.confirm("Delete course?")) return;
    const next = courses.filter((c) => c.courseCode !== code);
    saveCourses(next);
  };

  return (
    <div className="container mt-3">
      <h3>Courses</h3>
      <div className="row">
        <div className="col-md-5">
          <form onSubmit={handleAdd}>
            <div className="mb-2">
              <label className="form-label">Course Name</label>
              <input value={form.courseName} onChange={(e) => setForm({...form, courseName: e.target.value})} className="form-control" />
            </div>
            <div className="mb-2">
              <label className="form-label">Course Code</label>
              <input value={form.courseCode} onChange={(e) => setForm({...form, courseCode: e.target.value.toUpperCase()})} className="form-control" />
            </div>
            <div className="mb-2">
              <label className="form-label">Faculty</label>
              <input value={form.faculty} onChange={(e) => setForm({...form, faculty: e.target.value})} className="form-control" />
            </div>
            <div className="mb-2">
              <label className="form-label">Total Registered Students</label>
              <input type="number" value={form.totalRegistered} onChange={(e) => setForm({...form, totalRegistered: e.target.value})} className="form-control" />
            </div>
            <button className="btn btn-primary">Add Course</button>
          </form>
        </div>

        <div className="col-md-7">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Faculty</th>
                <th>Registered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 && (
                <tr><td colSpan="5">No courses yet</td></tr>
              )}
              {courses.map((c) => (
                <tr key={c.courseCode}>
                  <td>{c.courseCode}</td>
                  <td>{c.courseName}</td>
                  <td>{c.faculty}</td>
                  <td>{c.totalRegistered || "—"}</td>
                  <td>
                    <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(c.courseCode)}>Delete</button>
                    <Link to={`/lecture/new?course=${encodeURIComponent(c.courseCode)}`} className="btn btn-sm btn-secondary">Report</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
