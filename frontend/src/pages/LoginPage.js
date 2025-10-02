import React, { useState } from "react";
import api from "../api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🚀 prevent page reload
    try {
      const { data } = await api.post("/users/login", { email, password });
      // Save user with token to localStorage
      localStorage.setItem("user", JSON.stringify(data));
      window.location = "/"; // redirect to dashboard
    } catch (err) {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
