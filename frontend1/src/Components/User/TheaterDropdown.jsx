import React from "react";
import { Form } from "react-bootstrap";

export default function TheaterDropdown({ theaters, selectedTheater, onSelect }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Select Theater</Form.Label>
      <Form.Select
        value={selectedTheater?.theaterId || ""}
        onChange={(e) => {
          const theater = theaters.find(
            (t) => t.theaterId === parseInt(e.target.value)
          );
          onSelect(theater);
        }}
        style={{
          backgroundColor: "#2a2a2a",
          color: "#FFD700",
          border: "2px solid #FFD700",
        }}
      >
        <option value="">-- Select Theater --</option>
        {theaters.map((theater) => (
          <option key={theater.theaterId} value={theater.theaterId}>
            {theater.theaterName} - {theater.theaterScreenType} ({theater.theaterCapacity} seats)
          </option>
        ))}
      </Form.Select>

      {selectedTheater && (
        <div className="mt-2 text-warning">
          <h6>Theater Details:</h6>
          <ul>
            <li><strong>Name:</strong> {selectedTheater.theaterName}</li>
            <li><strong>Location:</strong> {selectedTheater.theaterLocation}</li>
            <li><strong>Screen Type:</strong> {selectedTheater.theaterScreenType}</li>
            <li><strong>Capacity:</strong> {selectedTheater.theaterCapacity}</li>
          </ul>
        </div>
      )}
    </Form.Group>
  );
}
