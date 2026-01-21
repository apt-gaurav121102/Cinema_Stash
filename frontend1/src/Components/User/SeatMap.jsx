import React from "react";
import "./SeatMap.css";

export default function SeatMap({ seatMap, selectedSeats, toggleSeat }) {
  return (
    <div className="seatmap-container">
      {seatMap.map((row, rowIndex) => (
        <div className="seat-row" key={rowIndex}>
          {row.map(seat => (
            <div
              key={seat.seatNumber}
              className={`seat 
                ${seat.booked ? "booked" : ""} 
                ${selectedSeats.includes(seat) ? "selected" : ""}
                ${seat.seatType.toLowerCase()}
              `}
              onClick={() => !seat.booked && toggleSeat(seat)}
            >
              {seat.seatNumber}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}