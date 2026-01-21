import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { getRole, getUserName, removeToken } from "../../Utils/TokenService";
import { Button, Container, Nav } from "react-bootstrap";

export default function Navigationbar() {
  const role = getRole(); // "USER" or "ADMIN"
  const username = getUserName(); // fetch stored username
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-dark text-warning p-3">
      <Container fluid>
        <Navbar.Brand className="text-warning fw-bold" as={Link} to="/">
          🎬 Cinema Stash
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>

            {/* USER NAVBAR */}
            {role === "USER" && (
              <>
                <Nav.Link as={Link} to="/dashboard" className="text-warning">
                  Home
                </Nav.Link>
              </>
            )}

            {/* ADMIN NAVBAR */}
            {role === "ADMIN" && (
              <>
                <Nav.Link as={Link} to="/admin/dashboard" className="text-warning">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/movies" className="text-warning">
                  Manage Movies
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/theaters" className="text-warning">
                  Manage Theaters
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/shows" className="text-warning">
                  Manage Shows
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/users" className="text-warning">
                  Users
                </Nav.Link>
              </>
            )}

          </Nav>

          {/* Display Username */}
          <span className="text-warning me-3 fw-bold">
            {username ? `Hello, ${username}!` : ""}
          </span>

          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
