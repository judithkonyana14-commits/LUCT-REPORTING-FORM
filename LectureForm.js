import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LectureForm() {
  const [params] = useSearchParams();
  const preCourse = params.get("course") || "";
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    facultyName: "",
    className: "",
    weekOfReporting: "",
    dateOfLecture: "",
    courseName: "",
    courseCode: preCourse,
    lecturerName: "",
    actualPresent: "",
    totalRegistered: "",
    venue: "",
    scheduledTime: "",
    topic: "",
    learningOutcomes: "",
    recommendations: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("luct_courses") || "[]");
    setCourses(stored);
    if (preCourse) {
      const found = stored.find((c) => c.courseCode === preCourse);
      if (found) {
        setForm((f) => ({ ...f, totalRegistered: found.totalRegistered || "", courseName: found.courseName }));
      }
    }
    const currentUser = JSON.parse(localStorage.getItem("luct_current_user") || "null");
    if (currentUser) setForm((f) => ({ ...f, lecturerName: currentUser.name || "" }));
  }, [preCourse]);

  const onCourseChange = (code) => {
    const found = courses.find((c) => c.courseCode === code);
    if (found) {
      setForm((f) => ({ ...f, courseCode: code, courseName: found.courseName, totalRegistered: found.totalRegistered || "" }));
    } else {
      setForm((f) => ({ ...f, courseCode: code, courseName: "", totalRegistered: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.courseCode || !form.lecturerName || !form.dateOfLecture) return alert("Course code, lecturer name and date are required.");
    const reports = JSON.parse(localStorage.getItem("luct_reports") || "[]");
    const newReport = { id: Date.now(), ...form, createdAt: new Date().toISOString() };
    reports.unshift(newReport);
    localStorage.setItem("luct_reports", JSON.stringify(reports));
    alert("Report saved.");
    navigate("/dashboard");
  };

  return (
    <div className="container mt-3">
      <h3>Lecturer Reporting Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="row g-2">
          <div className="col-md-6">
            <label className="form-label">Faculty Name</label>
            <input className="form-control" value={form.facultyName} onChange={(e)=>setForm({...form, facultyName: e.target.value})} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Class Name</label>
            <input className="form-control" value={form.className} onChange={(e)=>setForm({...form, className: e.target.value})} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Week of Reporting</label>
            <input className="form-control" value={form.weekOfReporting} onChange={(e)=>setForm({...form, weekOfReporting: e.target.value})} placeholder="e.g. Week 4" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Date of Lecture</label>
            <input type="date" className="form-control" value={form.dateOfLecture} onChange={(e)=>setForm({...form, dateOfLecture: e.target.value})} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Scheduled Lecture Time</label>
            <input className="form-control" value={form.scheduledTime} onChange={(e)=>setForm({...form, scheduledTime: e.target.value})} placeholder="08:00 - 10:00" />
          </div>

          <div className="col-md-6">
            <label className="form-label">Course Code</label>
            <select className="form-select" value={form.courseCode} onChange={(e)=>onCourseChange(e.target.value)}>
              <option value="">-- select course --</option>
              {courses.map((c) => <option key={c.courseCode} value={c.courseCode}>{c.courseCode} — {c.courseName}</option>)}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Course Name</label>
            <input className="form-control" value={form.courseName} onChange={(e)=>setForm({...form, courseName: e.target.value})} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Lecturer's Name</label>
            <input className="form-control" value={form.lecturerName} onChange={(e)=>setForm({...form, lecturerName: e.target.value})} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Actual Number Present</label>
            <input type="number" className="form-control" value={form.actualPresent} onChange={(e)=>setForm({...form, actualPresent: e.target.value})} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Total Registered Students</label>
            <input type="number" className="form-control" value={form.totalRegistered} onChange={(e)=>setForm({...form, totalRegistered: e.target.value})} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Venue</label>
            <input className="form-control" value={form.venue} onChange={(e)=>setForm({...form, venue: e.target.value})} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Topic Taught</label>
            <input className="form-control" value={form.topic} onChange={(e)=>setForm({...form, topic: e.target.value})} />
          </div>

          <div className="col-12">
            <label className="form-label">Learning Outcomes</label>
            <textarea className="form-control" rows="2" value={form.learningOutcomes} onChange={(e)=>setForm({...form, learningOutcomes: e.target.value})}></textarea>
          </div>

          <div className="col-12">
            <label className="form-label">Recommendations</label>
            <textarea className="form-control" rows="2" value={form.recommendations} onChange={(e)=>setForm({...form, recommendations: e.target.value})}></textarea>
          </div>

        </div>
        <button className="btn btn-success mt-3">Submit Report</button>
      </form>
    </div>
  );
}
