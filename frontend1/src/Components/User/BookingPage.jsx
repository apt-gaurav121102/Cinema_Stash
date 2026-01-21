import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";

export default function BookingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // get movie, theater, show from navigation state
  const { movie, theater, show } = state || {};

  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // Fetch booked seats for the selected show
  useEffect(() => {
    if (!show) return;

    // reset seats when show changes
    setSelectedSeats([]);
    setBookedSeats([]);

    axios
      .get(`http://localhost:9090/bookings/getShowsBooking/${show.showId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const seats = res.data.flatMap((b) => b.seatNumbers.map(String));
        setBookedSeats(seats);
      })
      .catch((err) => console.error(err));
  }, [show, token]);

  const handleSeatSelect = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else if (selectedSeats.length < numberOfSeats) {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleBooking = () => {
    if (!movie || !theater || !show) return alert("Invalid booking data");

    const bookingDto = {
      userId,
      showId: show.showId,
      numberOfSeats,
      seatTypes: "SILVER",
      seatNumbers: selectedSeats,
    };

    axios
      .post("http://localhost:9090/bookings/createBooking", bookingDto, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Booking successful!");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error(err);
        alert("Booking failed: " + err.response?.data?.message || err.message);
      });
  };

  if (!movie || !theater || !show)
    return <p className="text-center text-gold mt-5">No booking data found.</p>;

  // Seat map calculations
  const totalSeats = theater.theaterCapacity;
  const rows = 10;
  const seatsPerRow = Math.ceil(totalSeats / rows);
  const goldRows = 2;
  const seatNumbers = Array.from({ length: totalSeats }, (_, i) => i + 1);

  const getSeatType = (seatNumber) => {
    const row = Math.ceil(seatNumber / seatsPerRow);
    return row > rows - goldRows ? "GOLD" : "SILVER";
  };

  const calculatePrice = () => {
    let price = 0;
    selectedSeats.forEach((seat) => {
      price += getSeatType(seat) === "GOLD" ? 150 : 120;
    });
    const gst = price * 0.18;
    return (price + gst).toFixed(2);
  };

  return (
    <div
      className="pageN"
      style={{ backgroundColor: "#000", minHeight: "100vh", color: "gold", paddingBottom: "50px" }}
    >
      <div className="container py-4">
        <Card
          style={{ backgroundColor: "#111", border: "1px solid gold", color: "gold" }}
          className="p-4 mb-4 shadow-lg"
        >
          <h3>{movie.name}</h3>
          <p>
            Theater: {theater.theaterName} ({theater.theaterScreenType}) <br />
            Show Time: {new Date(show.showTime).toLocaleString()}
          </p>
          <p>
            Selected Seats: {selectedSeats.join(", ") || "None"} <br />
            Total Price: ₹{calculatePrice()}
          </p>
        </Card>

        <Form.Group className="mb-3">
          <Form.Label>Number of Seats</Form.Label>
          <Form.Control
            type="number"
            min="1"
            max={totalSeats}
            value={numberOfSeats}
            onChange={(e) => setNumberOfSeats(parseInt(e.target.value))}
          />
        </Form.Group>

        <div className="seat-map mb-3 d-flex flex-wrap">
          {seatNumbers.map((num) => {
            const type = getSeatType(num);
            const isBooked = bookedSeats.includes(num.toString());
            const isSelected = selectedSeats.includes(num);
            return (
              <button
                key={num}
                disabled={isBooked}
                onClick={() => handleSeatSelect(num)}
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "8px",
                  border: `2px solid ${type === "GOLD" ? "gold" : "silver"}`,
                  backgroundColor: isBooked ? "red" : isSelected ? "gold" : "#222",
                  color: isBooked || isSelected ? "#000" : "gold",
                  cursor: isBooked ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                  margin: "3px",
                }}
                title={`${type} Seat ${num}`}
              >
                {num}
              </button>
            );
          })}
        </div>

        <Button
          variant="warning"
          disabled={selectedSeats.length !== numberOfSeats}
          onClick={handleBooking}
          style={{ width: "100%", fontWeight: "bold" }}
        >
          Book Seats
        </Button>
      </div>
    </div>
  );
}