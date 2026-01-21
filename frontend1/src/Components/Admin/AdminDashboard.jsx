import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Import all CRUD components
import MovieAdmin from "./MoviesAdmin";
import TheaterAdmin from "./TheaterAdmin";
import ShowAdmin from "./ShowAdmin";
import UserAdmin from "./UsersAdmin";
import { ToastContainer } from "react-toastify";

export default function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState("movies"); // default

  // Sync state with URL
  useEffect(() => {
    const path = location.pathname.split("/")[2]; // /admin/movies → "movies"
    if (path) setActive(path);
  }, [location.pathname]);

  const handleNavClick = (section) => {
    setActive(section);
    navigate(`/admin/${section}`);
  };

  // LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const renderComponent = () => {
    switch (active) {
      case "movies":
        return <MovieAdmin />;
      case "theaters":
        return <TheaterAdmin />;
      case "shows":
        return <ShowAdmin />;
      case "users":
        return <UserAdmin />;
      default:
        return <MovieAdmin />;
    }
  };

  return (
    <div className="pageN">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        
        {/* SIDEBAR */}
        <div
          className="bg-dark text-white p-3 d-flex flex-column justify-content-between"
          style={{ width: "260px", minHeight: "100vh" }}
        >
          <div>
            <h3 className="text-warning mb-4 text-center">Admin Panel</h3>

            <ul className="nav flex-column">
              <li className="nav-item">
                <button
                  className={`btn w-100 text-start mb-2 ${
                    active === "movies" ? "btn-warning" : "btn-outline-warning"
                  }`}
                  onClick={() => handleNavClick("movies")}
                >
                  🎬 Manage Movies
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`btn w-100 text-start mb-2 ${
                    active === "theaters" ? "btn-warning" : "btn-outline-warning"
                  }`}
                  onClick={() => handleNavClick("theaters")}
                >
                  🏛 Manage Theaters
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`btn w-100 text-start mb-2 ${
                    active === "shows" ? "btn-warning" : "btn-outline-warning"
                  }`}
                  onClick={() => handleNavClick("shows")}
                >
                  🎭 Manage Shows
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`btn w-100 text-start mb-2 ${
                    active === "users" ? "btn-warning" : "btn-outline-warning"
                  }`}
                  onClick={() => handleNavClick("users")}
                >
                  👥 Users List
                </button>
              </li>
            </ul>
          </div>

          {/* LOGOUT BUTTON */}
          <button
            className="btn btn-danger w-100 mt-3"
            onClick={handleLogout}
          >
            🔓 Logout
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="pageN flex-grow-1 p-4 bg-black text-warning">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}