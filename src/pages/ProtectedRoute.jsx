import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!token) navigate("/login");
    },
    [token, navigate]
  );
  return token ? children : null;
}

export default ProtectedRoute;
