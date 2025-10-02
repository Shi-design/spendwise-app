import React, { useState } from "react";
import api from "../api";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🚀 prevent page reload
    try {
      const { data } = await api.post("/users/register", { name, email, password });
      localStorage.setItem("user", JSON.stringify(data));
      window.location = "/"; // redirect to dashboard
    } catch (err) {
      alert("Error registering user, please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Register</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterPage;
