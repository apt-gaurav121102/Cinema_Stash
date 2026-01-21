import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../App.css";
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt, FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:9090";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/auth/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Registration failed!");
      }

      toast.success("Registration successful!");
      setForm({
        name: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        password: "",
      });

      navigate("/login"); // Navigate to login page after successful registration
    } catch (err) {
      toast.error(err.message || "Registration failed!");
      console.error(err);
    }
  };

  return (
    <div className="page">
      <div className="glassCard p-4 rounded-4 shadow">
        <h1 className="text-warning text-center mb-4">Register</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="text-warning fw-bold">
              <FaUser className="me-2" /> Username
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-warning fw-bold">
              <FaEnvelope className="me-2" /> Email
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-warning fw-bold">
              <FaPhoneAlt className="me-2" /> Phone
            </Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              minLength={10}
              maxLength={10}
              value={form.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-warning fw-bold">
              <FaCalendarAlt className="me-2" /> Date of Birth
            </Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-warning fw-bold">
              <FaLock className="me-2" /> Password
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" variant="warning" className="w-100 fw-bold">
            Register
          </Button>
        </Form>

        <p className="text-center text-warning mt-3">
          Already a user?{" "}
          <a href="/login" className="text-warning fw-bold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;