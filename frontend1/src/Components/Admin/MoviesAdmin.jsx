import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const GENRES = ["ACTION", "COMEDY", "DRAMA", "ROMANTIC", "ANIMATION", "HORROR", "BIOPIC"];
const LANGUAGES = ["HINDI", "ENGLISH", "MARATHI"];
const TYPES = ["UA", "U", "S", "A"];

export default function MoviesAdmin() {
  const [movies, setMovies] = useState([]);

  // Add form
  const [addForm, setAddForm] = useState({
    name: "",
    poster: "",
    genre: "",
    language: "",
    type: "",
    duration: "",
    releaseDate: "",
    rating: "",
  });
  const [showAddModal, setShowAddModal] = useState(false);

  // Edit form
  const [editForm, setEditForm] = useState({
    movieId: null,
    name: "",
    poster: "",
    genre: "",
    language: "",
    type: "",
    duration: "",
    releaseDate: "",
    rating: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);

  const BASE_URL = "http://localhost:9090"; // backend URL
  const token = localStorage.getItem("token");
  const getAuthHeader = () => ({ Authorization: `Bearer ${token}` });

  // Fetch all movies
  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/movies/all-movies`, { headers: getAuthHeader() });
      setMovies(res.data);
    } catch (err) {
      toast.error("Failed to load movies");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Handlers
  const handleAddChange = (e) => setAddForm({ ...addForm, [e.target.name]: e.target.value });
  const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/movies/addMovie`, addForm, { headers: getAuthHeader() });
      toast.success("Movie added!");
      setAddForm({
        name: "",
        poster: "",
        genre: "",
        language: "",
        type: "",
        duration: "",
        releaseDate: "",
        rating: "",
      });
      setShowAddModal(false);
      fetchMovies();
    } catch (err) {
      toast.error("Failed to add movie");
      console.error(err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/movies/updateMovie/${editForm.movieId}`, editForm, { headers: getAuthHeader() });
      toast.success("Movie updated!");
      setShowEditModal(false);
      fetchMovies();
    } catch (err) {
      toast.error("Failed to update movie");
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-center mb-4">🎬 Movie Management</h2>

      {/* Add Movie Button */}
      <div className="mb-3 text-end">
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          ➕ Add Movie
        </Button>
      </div>

      {/* Movies Table */}
      <Table striped bordered hover variant="dark" responsive>
        <thead>
          <tr>
            <th>Poster</th>
            <th>Name</th>
            <th>Genre</th>
            <th>Language</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Rating</th>
            <th>Release</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m) => (
            <tr key={m.movieId}>
              <td>
                {m.poster && <img src={m.poster} alt={m.name} style={{ width: "100px", height: "100px", objectFit: "cover" }} />}
              </td>
              <td>{m.name}</td>
              <td>{m.genre}</td>
              <td>{m.language}</td>
              <td>{m.type}</td>
              <td>{m.duration} min</td>
              <td>{m.rating}</td>
              <td>{new Date(m.releaseDate).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    setEditForm({
                      movieId: m.movieId,
                      name: m.name,
                      poster: m.poster,
                      genre: m.genre,
                      language: m.language,
                      type: m.type,
                      duration: m.duration,
                      releaseDate: m.releaseDate.split("T")[0],
                      rating: m.rating,
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

      {/* Add Movie Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Movie Name</Form.Label>
              <Form.Control type="text" name="name" value={addForm.name} onChange={handleAddChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Poster URL</Form.Label>
              <Form.Control type="text" name="poster" value={addForm.poster} onChange={handleAddChange} required />
              {addForm.poster && <img src={addForm.poster} alt="poster" style={{ width: "80px", height: "80px", marginTop: "10px", objectFit: "cover" }} />}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Genre</Form.Label>
              <Form.Select name="genre" value={addForm.genre} onChange={handleAddChange} required>
                <option value="">Select Genre</option>
                {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Language</Form.Label>
              <Form.Select name="language" value={addForm.language} onChange={handleAddChange} required>
                <option value="">Select Language</option>
                {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select name="type" value={addForm.type} onChange={handleAddChange} required>
                <option value="">Select Type</option>
                {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration (mins)</Form.Label>
              <Form.Control type="number" name="duration" value={addForm.duration} onChange={handleAddChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Release Date</Form.Label>
              <Form.Control type="date" name="releaseDate" value={addForm.releaseDate} onChange={handleAddChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control type="number" name="rating" value={addForm.rating} onChange={handleAddChange} required />
            </Form.Group>

            <Button variant="primary" type="submit">Add Movie</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Movie Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Movie Name</Form.Label>
              <Form.Control type="text" name="name" value={editForm.name} onChange={handleEditChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Poster URL</Form.Label>
              <Form.Control type="text" name="poster" value={editForm.poster} onChange={handleEditChange} required />
              {editForm.poster && <img src={editForm.poster} alt="poster" style={{ width: "80px", height: "80px", marginTop: "10px", objectFit: "cover" }} />}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Genre</Form.Label>
              <Form.Select name="genre" value={editForm.genre} onChange={handleEditChange} required>
                <option value="">Select Genre</option>
                {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Language</Form.Label>
              <Form.Select name="language" value={editForm.language} onChange={handleEditChange} required>
                <option value="">Select Language</option>
                {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select name="type" value={editForm.type} onChange={handleEditChange} required>
                <option value="">Select Type</option>
                {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration (mins)</Form.Label>
              <Form.Control type="number" name="duration" value={editForm.duration} onChange={handleEditChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Release Date</Form.Label>
              <Form.Control type="date" name="releaseDate" value={editForm.releaseDate} onChange={handleEditChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control type="number" name="rating" value={editForm.rating} onChange={handleEditChange} required />
            </Form.Group>

            <Button variant="primary" type="submit">Update Movie</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}