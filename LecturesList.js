import React, { useEffect, useState } from "react";

export default function LecturesList() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const r = JSON.parse(localStorage.getItem("luct_reports") || "[]");
    setReports(r);
  }, []);

  return (
    <div className="container mt-3">
      <h3>Lectures</h3>
      {reports.length === 0 ? (
        <p className="text-muted">No lectures reported yet.</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Topic</th>
              <th>Lecturer</th>
              <th>Class</th>
              <th>Date</th>
              <th>Students Present</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id}>
                <td>{r.courseCode}</td>
                <td>{r.topic || r.courseName}</td>
                <td>{r.lecturerName}</td>
                <td>{r.className}</td>
                <td>{r.dateOfLecture}</td>
                <td>
                  {r.actualPresent} / {r.totalRegistered}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
