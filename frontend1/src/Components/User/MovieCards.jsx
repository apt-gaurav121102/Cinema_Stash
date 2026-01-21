import React, { useState, useEffect } from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TheaterDropdown from "./TheaterDropdown";
import ShowDropdown from "./ShowDropdown"; // separate component for shows

export default function MovieCards({ movies }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Modal & selection states
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [theaters, setTheaters] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  const navigate = useNavigate();

  // Filter movies by name or genre
  const filteredMovies = movies?.filter(
    (movie) =>
      movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch theaters based on location
  useEffect(() => {
    if (!selectedLocation) {
      setTheaters([]);
      setSelectedTheater(null);
      return;
    }

    axios
      .get("http://localhost:9090/theaters/getTheaterByLocation", {
        params: { location: selectedLocation },
      })
      .then((res) => setTheaters(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        console.error("Error fetching theaters:", err);
        setTheaters([]);
      });
  }, [selectedLocation]);

  // Fetch shows based on selected theater
  useEffect(() => {
    if (!selectedTheater) {
      setShows([]);
      setSelectedShow(null);
      return;
    }

    axios
      .get(`http://localhost:9090/shows/theater/${selectedTheater.theaterId}`)
      .then((res) => setShows(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        console.error("Error fetching shows:", err);
        setShows([]);
      });
  }, [selectedTheater]);

  // When user clicks "Book Now"
  const handleBookNow = (movie) => {
    setSelectedMovie(movie);
    setSelectedLocation("");
    setSelectedTheater(null);
    setShows([]);
    setSelectedShow(null);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedLocation("");
    setSelectedTheater(null);
    setShows([]);
    setSelectedShow(null);
  };

  return (
    <>
      {/* Search Bar */}
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            backgroundColor: "#2a2a2a",
            color: "#FFD700",
            border: "2px solid #FFD700",
          }}
        />
      </Form>

      {/* Movie Cards */}
      <div className="row">
        {filteredMovies?.length > 0 ? (
          filteredMovies.map((movie, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <Card
                className="h-100 bg-dark text-warning"
                style={{ border: "2px solid #FFD700" }}
              >
                <Card.Img
                  variant="top"
                  src={movie.poster || "https://via.placeholder.com/150x225"}
                  style={{ height: "400px", objectFit: "contain" }}
                />
                <Card.Body>
                  <Card.Title>{movie.name}</Card.Title>
                  <Card.Text>
                    <strong>Genre:</strong> {movie.genre} <br />
                    <strong>Language:</strong> {movie.language} <br />
                    <strong>Duration:</strong> {movie.duration} mins
                  </Card.Text>
                  <Button
                    variant="warning"
                    className="w-100"
                    onClick={() => handleBookNow(movie)}
                  >
                    Book Now
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-warning">No movies found.</p>
        )}
      </div>

      {/* Booking Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book: {selectedMovie?.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-dark text-warning">
          {/* Enter Location */}
          <Form.Group className="mb-3">
            <Form.Label>Enter Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city or location..."
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              style={{
                backgroundColor: "#2a2a2a",
                color: "#FFD700",
                border: "2px solid #FFD700",
              }}
            />
          </Form.Group>

          {/* Theater Dropdown */}
          {selectedLocation && (
            <TheaterDropdown
              theaters={theaters}
              selectedTheater={selectedTheater}
              onSelect={setSelectedTheater}
            />
          )}

          {selectedTheater && (
            <ShowDropdown
              shows={shows}
              selectedShow={selectedShow}
              onSelect={setSelectedShow}
            />
          )}

          {selectedLocation && theaters.length === 0 && (
            <p className="text-danger">No theaters found at this location.</p>
          )}
          {selectedTheater && shows.length === 0 && (
            <p className="text-danger">No shows available for this theater.</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="warning"
            disabled={!selectedShow}
            onClick={() =>
              navigate("/bookings", {
                state: {
                  movie: selectedMovie,
                  location: selectedLocation,
                  theater: selectedTheater,
                  show: selectedShow,
                },
              })
            }
          >
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}