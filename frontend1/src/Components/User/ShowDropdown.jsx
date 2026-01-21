import React from "react";
import { Form } from "react-bootstrap";

export default function ShowDropdown({ shows, selectedShow, onSelect }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Select Show</Form.Label>
      <Form.Select
        value={selectedShow?.showId || ""}
        onChange={(e) => {
          const show = shows.find(
            (s) => s.showId === parseInt(e.target.value)
          );
          onSelect(show);
        }}
        style={{
          backgroundColor: "#2a2a2a",
          color: "#FFD700",
          border: "2px solid #FFD700",
        }}
      >
        <option value="">-- Select Show --</option>
        {shows.map((show) => (
          <option key={show.showId} value={show.showId}>
            {new Date(show.showTime).toLocaleString()} - {show.theater.theaterName}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}