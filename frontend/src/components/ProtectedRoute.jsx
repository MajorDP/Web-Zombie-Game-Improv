import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { handleCheckSession } from "../services/auth";

function ProtectedRoute() {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const data = await handleCheckSession();
      setSession(data);
      setIsLoading(false);
    }
    checkSession();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return session.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
