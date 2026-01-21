import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { getRole, getToken } from "./Utils/TokenService";
import Dashboard from "./Components/User/Dashboard";
import ProtectedRoute from "./Components/Common/ProtectedRoutes";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import { ToastContainer } from "react-toastify";
import BookingPage from "./Components/User/BookingPage";

function App() {
  const role = getRole();
  const token = getToken();

  return (
    <Router>
        <ToastContainer position="top-right" />
      <Routes>

        {/* Always show login first */}
        <Route 
          path="/" 
          element={<Navigate to="/login" />} 
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/about-us" element={<AboutUs />} /> */}

        {/* USER routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/bookings/*" element={
          <ProtectedRoute allowedRoles={["USER"]}>
            <BookingPage />
          </ProtectedRoute>
          }>

        </Route>

        {/* ADMIN routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* If user types random URL → send to login (not dashboard) */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}

export default App;