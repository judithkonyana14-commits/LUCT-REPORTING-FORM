import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [creds, setCreds] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("luct_users") || "[]");
    const found = users.find(u => u.email.toLowerCase() === creds.email.toLowerCase() && u.password === creds.password);
    if (!found) return alert("Invalid credentials.");
    localStorage.setItem("luct_current_user", JSON.stringify(found));
    navigate("/dashboard");
  };

  return (
    <div className="container mt-5" style={{maxWidth: 480}}>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <div className="mb-2">
          <label className="form-label">Email</label>
          <input className="form-control" value={creds.email} onChange={e=>setCreds({...creds, email: e.target.value})} />
        </div>
        <div className="mb-2">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={creds.password} onChange={e=>setCreds({...creds, password: e.target.value})} />
        </div>
        <button className="btn btn-primary">Login</button>
        <Link to="/register" className="btn btn-link">Register</Link>
      </form>
    </div>
  );
}
