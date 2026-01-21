import React, { useState, useEffect } from "react";
import Navigationbar from "../Common/Navbar";
import MovieCards from "./MovieCards";
import BookingHistory from "./BookingHistory";
import axios from "axios";

export default function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState([]);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token"); // JWT from login
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch movies directly from backend
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:9090/movies/all-movies", authHeader);
        setMovies(res.data);
        setFilteredMovies(res.data);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    };
    fetchMovies();
  }, []);

  // Filter movies based on search term
  useEffect(() => {
    if (!searchTerm) setFilteredMovies(movies);
    else {
      setFilteredMovies(
        movies.filter((movie) =>
          movie.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, movies]);

  // Fetch booking history directly from backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:9090/bookings/user/${userId}`, authHeader);
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };
    fetchBookings();
  }, [userId]);

  return (
    <div className="pageN">
      <Navigationbar />

      {/* Movie Cards */}
      <div className="container py-4">
        <MovieCards movies={filteredMovies} />
      </div>

      {/* Booking History */}
      <div className="container py-4">
        <BookingHistory bookings={bookings} />
      </div>
    </div>
  );
}