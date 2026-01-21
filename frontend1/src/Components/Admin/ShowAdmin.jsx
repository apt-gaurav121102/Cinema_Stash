import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:9090";
const token = localStorage.getItem("token");

export default function ShowsAdmin() {
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(false);

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  // --- Add Show ---
  const [addForm, setAddForm] = useState({ showTime: "", movieId: "", theaterId: "" });
  const [showAddModal, setShowAddModal] = useState(false);

  // --- Edit Show ---
  const [editForm, setEditForm] = useState({ showId: null, showTime: "", movieId: "", theaterId: "" });
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch all shows with movie and theater details
  const loadShows = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/shows/all-with-details`, authHeader);
      setShows(res.data);
    } catch (err) {
      toast.error("Failed to load shows");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch movies and theaters for dropdowns
  const loadMoviesAndTheaters = async () => {
    try {
      const [moviesRes, theatersRes] = await Promise.all([
        axios.get(`${BASE_URL}/movies/all-movies`, authHeader),
        axios.get(`${BASE_URL}/theaters/getAll`, authHeader),
      ]);
      setMovies(moviesRes.data);
      setTheaters(theatersRes.data);
    } catch (err) {
      toast.error("Failed to load movies or theaters");
      console.error(err);
    }
  };

  useEffect(() => {
    loadShows();
    loadMoviesAndTheaters();
  }, []);

  // Handlers
  const handleAddChange = (e) => setAddForm({ ...addForm, [e.target.name]: e.target.value });
  const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/shows/addShow`, addForm, authHeader);
      toast.success("Show added!");
      setShowAddModal(false);
      setAddForm({ showTime: "", movieId: "", theaterId: "" });
      loadShows();
    } catch (err) {
      toast.error("Failed to add show");
      console.error(err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/shows/updateShow/${editForm.showId}`, editForm, authHeader);
      toast.success("Show updated!");
      setShowEditModal(false);
      loadShows();
    } catch (err) {
      toast.error("Failed to update show");
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h4 className="mb-3 text-center">🎬 Show Management</h4>

      {/* Add Show Button */}
      <div className="mb-3 text-end">
        <Button variant="success" onClick={() => setShowAddModal(true)}>➕ Add Show</Button>
      </div>

      {/* Show Table */}
      {loading ? (
        <div className="text-center my-2">Loading shows...</div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Movie</th>
              <th>Theater</th>
              <th>Show Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shows.map((s) => (
              <tr key={s.showId}>
                <td>{s.movie?.name}</td>         {/* Correct movie name */}
                <td>{s.theater?.theaterName}</td>
                <td>{new Date(s.showTime).toLocaleString()}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => {
                      setEditForm({
                        showId: s.showId,
                        showTime: s.showTime.slice(0, 16),
                        movieId: s.movie.movieId,
                        theaterId: s.theater.theaterId,
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

      {/* Add Show Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Show</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Movie</Form.Label>
              <Form.Select name="movieId" value={addForm.movieId} onChange={handleAddChange} required>
                <option value="">Select Movie</option>
                {movies.map((m) => <option key={m.movieId} value={m.movieId}>{m.name}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Theater</Form.Label>
              <Form.Select name="theaterId" value={addForm.theaterId} onChange={handleAddChange} required>
                <option value="">Select Theater</option>
                {theaters.map((t) => <option key={t.theaterId} value={t.theaterId}>{t.theaterName}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Show Time</Form.Label>
              <Form.Control type="datetime-local" name="showTime" value={addForm.showTime} onChange={handleAddChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Add Show</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Show Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Show</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Movie</Form.Label>
              <Form.Select name="movieId" value={editForm.movieId} onChange={handleEditChange} required>
                <option value="">Select Movie</option>
                {movies.map((m) => <option key={m.movieId} value={m.movieId}>{m.name}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Theater</Form.Label>
              <Form.Select name="theaterId" value={editForm.theaterId} onChange={handleEditChange} required>
                <option value="">Select Theater</option>
                {theaters.map((t) => <option key={t.theaterId} value={t.theaterId}>{t.theaterName}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Show Time</Form.Label>
              <Form.Control type="datetime-local" name="showTime" value={editForm.showTime} onChange={handleEditChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Update Show</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}