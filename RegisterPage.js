import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "lecturer" });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return alert("Please fill required fields");
    const users = JSON.parse(localStorage.getItem("luct_users") || "[]");
    if (users.some(u => u.email.toLowerCase() === form.email.toLowerCase())) return alert("Email already used");
    const newUser = { id: Date.now(), ...form };
    users.push(newUser);
    localStorage.setItem("luct_users", JSON.stringify(users));
    localStorage.setItem("luct_current_user", JSON.stringify(newUser));
    alert("Registered and logged in.");
    navigate("/dashboard");
  };

  return (
    <div className="container mt-5" style={{maxWidth: 520}}>
      <h3>Register</h3>
      <form onSubmit={handleRegister}>
        <div className="mb-2">
          <label className="form-label">Full name</label>
          <input className="form-control" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} />
        </div>
        <div className="mb-2">
          <label className="form-label">Email</label>
          <input className="form-control" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} />
        </div>
        <div className="mb-2">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select className="form-select" value={form.role} onChange={(e)=>setForm({...form, role: e.target.value})}>
            <option value="lecturer">Lecturer</option>
            <option value="student">Student</option>
            <option value="prl">PRL</option>
            <option value="pl">PL</option>
          </select>
        </div>
        <button className="btn btn-success">Create account</button>
      </form>
    </div>
  );
}
