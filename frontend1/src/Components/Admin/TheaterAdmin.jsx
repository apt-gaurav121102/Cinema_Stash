import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:9090"; // Your backend URL
const token = localStorage.getItem("token");

export default function TheaterAdmin() {
  const [theaters, setTheaters] = useState([]);

  // Add form
  const [addForm, setAddForm] = useState({
    theaterName: "",
    theaterLocation: "",
    theaterCapacity: "",
    theaterScreenType: "",
  });
  const [showAddModal, setShowAddModal] = useState(false);

  // Edit form
  const [editForm, setEditForm] = useState({
    theaterId: null,
    theaterName: "",
    theaterLocation: "",
    theaterCapacity: "",
    theaterScreenType: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch theaters
  const loadTheaters = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/theaters/getAll`, authHeader);
      setTheaters(res.data);
    } catch (err) {
      toast.error("Failed to load theaters");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTheaters();
  }, []);

  const handleAddChange = (e) =>
    setAddForm({ ...addForm, [e.target.name]: e.target.value });

  const handleEditChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/theaters/addTheater`, addForm, authHeader);
      toast.success("Theater added!");
      setShowAddModal(false);
      setAddForm({ theaterName: "", theaterLocation: "", theaterCapacity: "", theaterScreenType: "" });
      loadTheaters();
    } catch (err) {
      toast.error("Failed to add theater");
      console.error(err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/theaters/updateTheater/${editForm.theaterId}`, editForm, authHeader);
      toast.success("Theater updated!");
      setShowEditModal(false);
      loadTheaters();
    } catch (err) {
      toast.error("Failed to update theater");
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h4 className="mb-3 text-center">🏛️ Theater Management</h4>

      {/* Add Theater Button */}
      <div className="mb-3 text-end">
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          ➕ Add Theater
        </Button>
      </div>

      {/* Theater Table */}
      {loading ? (
        <div className="text-center my-2">Loading theaters...</div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Screen Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {theaters.map((t) => (
              <tr key={t.theaterId}>
                <td>{t.theaterName}</td>
                <td>{t.theaterLocation}</td>
                <td>{t.theaterCapacity}</td>
                <td>{t.theaterScreenType}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => {
                      setEditForm({
                        theaterId: t.theaterId,
                        theaterName: t.theaterName,
                        theaterLocation: t.theaterLocation,
                        theaterCapacity: t.theaterCapacity,
                        theaterScreenType: t.theaterScreenType,
                      });
                      setShowEditModal(true);
                    }}
                  >
                    ✏️ Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Add Theater Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Theater</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="theaterName" value={addForm.theaterName} onChange={handleAddChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" name="theaterLocation" value={addForm.theaterLocation} onChange={handleAddChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Capacity</Form.Label>
              <Form.Control type="number" name="theaterCapacity" value={addForm.theaterCapacity} onChange={handleAddChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Screen Type</Form.Label>
              <Form.Control type="text" name="theaterScreenType" value={addForm.theaterScreenType} onChange={handleAddChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Add Theater</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Theater Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Theater</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="theaterName" value={editForm.theaterName} onChange={handleEditChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" name="theaterLocation" value={editForm.theaterLocation} onChange={handleEditChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Capacity</Form.Label>
              <Form.Control type="number" name="theaterCapacity" value={editForm.theaterCapacity} onChange={handleEditChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Screen Type</Form.Label>
              <Form.Control type="text" name="theaterScreenType" value={editForm.theaterScreenType} onChange={handleEditChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Update Theater</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
