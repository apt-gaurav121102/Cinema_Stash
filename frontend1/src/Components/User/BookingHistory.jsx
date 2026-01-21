import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toast, ToastContainer } from "react-bootstrap";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", bg: "success" });
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const fetchBookings = () => {
    if (!userId || !token) return;

    axios
      .get(`http://localhost:9090/bookings/myBookings`, {
        params: { userId },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  useEffect(() => {
    fetchBookings();
  }, [userId, token]);

  const handleCancel = (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    axios
      .delete(`http://localhost:9090/bookings/${bookingId}/cancel`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setToast({ show: true, message: "Booking cancelled successfully!", bg: "success" });
        fetchBookings();
      })
      .catch((err) => {
        setToast({
          show: true,
          message: err.response?.data || "Cannot cancel booking",
          bg: "danger",
        });
      });
  };

  if (!bookings.length)
    return <p className="text-gold text-center mt-5">No booking history found.</p>;

  return (
    <div
      className="container py-4"
      style={{ minHeight: "100vh", backgroundColor: "#000", color: "gold" }}
    >
      <h2 className="text-center mb-4" style={{ fontWeight: "bold", letterSpacing: "1px" }}>
        Your Bookings
      </h2>

      <div className="row">
        {bookings.map((b) => {
          const showTime = new Date(b.showTime || b.show?.showTime);
          const isCancellable = showTime - new Date() > 2 * 60 * 60 * 1000;

          const movieName = b.movieName || b.show?.movie?.name || "N/A";
          const theaterName = b.theaterName || b.show?.theater?.theaterName || "N/A";
          const seats = b.seatNumbers?.join(", ") || "N/A";
          const totalPaid = b.totalPrice ?? (b.seatNumbers?.length
            ? (b.seatNumbers.length * 120 * 1.18).toFixed(2)
            : "N/A");

          const isCancelled = b.bookingStatus === "CANCELLED";

          return (
            <div
              key={b.bookingId}
              className="card p-3 mb-3"
              style={{
                backgroundColor: "#111",
                color: "gold",
                border: "1px solid gold",
                opacity: isCancelled ? 0.6 : 1,
              }}
            >
              <h5>{movieName}</h5>
              <p>
                Theater: {theaterName} <br />
                Show Time: {showTime.toLocaleString()} <br />
                Seats: {seats} <br />
                Total Paid: ₹{totalPaid} <br />
                Status: {isCancelled ? "Cancelled" : "Active"}
              </p>

              {!isCancelled && isCancellable && (
                <button
                  onClick={() => handleCancel(b.bookingId)}
                  style={{
                    backgroundColor: "red",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          bg={toast.bg}
          delay={3000}
          autohide
        >
          <Toast.Body style={{ color: toast.bg === "danger" ? "white" : "white" }}>
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}