import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:9090";
const token = localStorage.getItem("token");

export default function UsersAdmin() {
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [showAdminModal, setShowAdminModal] = useState(false);

  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    dateOfBirth: "",
  });

  //  Fetch ALL users & admins
  const fetchAccounts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getAllUsers`, authHeader);
      setAccounts(res.data);
      setFilteredAccounts(res.data); // show all initially
    } catch (err) {
      toast.error("Failed to load accounts");
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // 🔍 Search filter (frontend only)
  const handleSearch = (value) => {
    setSearchText(value);

    const val = value.toLowerCase();

    const filtered = accounts.filter((acc) =>
      acc.name.toLowerCase().includes(val) ||
      acc.email.toLowerCase().includes(val) ||
      acc.role.toLowerCase().includes(val)
    );

    setFilteredAccounts(filtered);
  };

  // ❌ Delete account
  const deleteAccount = async (id) => {
    if (!window.confirm("Are you sure you want to delete this account?")) return;

    try {
      await axios.delete(`${BASE_URL}/admin/${id}`, authHeader);
      toast.success("Deleted successfully");
      fetchAccounts();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  // Admin form handler
  const handleAdminFormChange = (e) => {
    setAdminForm({ ...adminForm, [e.target.name]: e.target.value });
  };

  // Register admin
  const handleAdminSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/admin/register`, adminForm, authHeader);
      toast.success("Admin registered successfully");

      setShowAdminModal(false);
      fetchAccounts(); // reload list

      setAdminForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        dateOfBirth: "",
      });
    } catch (err) {
      toast.error("Failed to register admin");
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>User & Admin Management</h3>

        <Button variant="primary" onClick={() => setShowAdminModal(true)}>
          + Register Admin
        </Button>
      </div>

      {/* 🔍 Search Bar */}
      <div className="d-flex gap-2 mb-3" style={{ maxWidth: "400px" }}>
        <Form.Control
          placeholder="Search by name, email or role"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((acc, index) => (
              <tr key={acc.userId}>
                <td>{index + 1}</td>
                <td>{acc.name}</td>
                <td>{acc.email}</td>
                <td>{acc.phone}</td>
                <td>{acc.dateOfBirth}</td>
                <td>{acc.role}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteAccount(acc.userId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                No matching users found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Register Admin Modal */}
      <Modal show={showAdminModal} onHide={() => setShowAdminModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Register New Admin</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleAdminSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={adminForm.name}
                onChange={handleAdminFormChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={adminForm.email}
                onChange={handleAdminFormChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                maxLength={10}
                value={adminForm.phone}
                onChange={handleAdminFormChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={adminForm.dateOfBirth}
                onChange={handleAdminFormChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={adminForm.password}
                onChange={handleAdminFormChange}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Register Admin
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}