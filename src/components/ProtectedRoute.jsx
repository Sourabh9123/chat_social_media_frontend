import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.access_token); // Check if the user is logged in
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      console.log(isLoggedIn, "not login");
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [isLoggedIn, navigate]);

  return <>{isLoggedIn ? children : null}</>; // Render children if logged in
};

export default ProtectedRoute;
