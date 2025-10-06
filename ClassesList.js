import React, { useEffect, useState } from "react";



export default function ClassesList() {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    id: "",
    className: "",
    faculty: "",
    courseCode: "",
    lecturer: "",
    totalStudents: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("luct_classes") || "[]");
    setClasses(saved);
  }, []);

  const saveClasses = (updated) => {
    localStorage.setItem("luct_classes", JSON.stringify(updated));
    setClasses(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.className || !form.courseCode) return;

    const updated = [
      ...classes,
      { ...form, id: Date.now(), totalStudents: Number(form.totalStudents) || 0 },
    ];
    saveClasses(updated);
    setForm({ id: "", className: "", faculty: "", courseCode: "", lecturer: "", totalStudents: "" });
  };

  return (
    <div className="container mt-3">
      <h3>Classes</h3>

      {/* Form */}
      <form className="row g-2 mb-4" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Class Name"
            value={form.className}
            onChange={(e) => setForm({ ...form, className: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Faculty"
            value={form.faculty}
            onChange={(e) => setForm({ ...form, faculty: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Course Code"
            value={form.courseCode}
            onChange={(e) => setForm({ ...form, courseCode: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Lecturer"
            value={form.lecturer}
            onChange={(e) => setForm({ ...form, lecturer: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Total Students"
            value={form.totalStudents}
            onChange={(e) => setForm({ ...form, totalStudents: e.target.value })}
          />
        </div>
        <div className="col-md-1">
          <button className="btn btn-primary w-100">Add</button>
        </div>
      </form>

      {/* Table */}
      {classes.length === 0 ? (
        <p className="text-muted">No classes available yet.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Faculty</th>
              <th>Course Code</th>
              <th>Lecturer</th>
              <th>Total Students</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((c) => (
              <tr key={c.id}>
                <td>{c.className}</td>
                <td>{c.faculty}</td>
                <td>{c.courseCode}</td>
                <td>{c.lecturer}</td>
                <td>{c.totalStudents}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
