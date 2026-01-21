import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "../App.css";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:9090";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();

      // Store in localStorage
      localStorage.setItem("token", data.jwtToken);
      localStorage.setItem("userName", data.username);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.userId);

      toast.success(`Welcome back, ${data.username}! 🎬`, { autoClose: 1500 });

      setTimeout(() => {
        navigate(data.role === "ADMIN" ? "/admin/dashboard" : "/dashboard");
      }, 800);
    } catch (err) {
      toast.error("Invalid email or password!", { autoClose: 2000 });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page d-flex justify-content-center align-items-center">
      <div className="glassCard p-4 rounded-4 shadow" style={{ maxWidth: "400px" }}>
        <h1 className="text-warning text-center mb-4">Login</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="text-warning fw-bold">
              <FaEnvelope className="me-2" /> Email
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ backgroundColor: "#2a2a2a", color: "#FFD700", border: "2px solid #FFD700" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-warning fw-bold">
              <FaLock className="me-2" /> Password
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ backgroundColor: "#2a2a2a", color: "#FFD700", border: "2px solid #FFD700" }}
            />
          </Form.Group>

          <Button type="submit" variant="warning" className="w-100 fw-bold" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>

        <p className="text-center text-warning mt-3">
          New to Cinema Stash?{" "}
          <a href="/register" className="text-warning underline-none fw-bold">
            Register Here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;