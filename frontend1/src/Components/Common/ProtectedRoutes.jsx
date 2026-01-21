import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../../Utils/TokenService";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ allowedRoles, children }) {
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const token = getToken();
    const role = getRole();

    if (!token) {
      setIsAllowed(false);
    } else if (allowedRoles.includes(role)) {
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
    }

    setLoading(false);
  }, []);

  if (loading) return <div style={{ color: "white", padding: "20px" }}>Loading...</div>;

  return isAllowed ? children : <Navigate to="/login" replace />;
}