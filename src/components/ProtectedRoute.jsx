import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDataByToken } from "../store/authSlice";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.access_token); // Check if the user is logged in
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const access_token = localStorage.getItem("token");

  const setUserDetails = async () => {
    const response = await dispatch(getUserDataByToken(access_token));
    if (response.type.split("/")[1] === "rejected") {
      // console.log("working ....");
      navigate("/login");
    }
  };

  useEffect(() => {
    // console.log(access_token, " in protected Route");
    if (access_token) {
      if (!isLoggedIn) {
        // console.log("has token but not logged in");
        setUserDetails();
      }
    }
    if (!isLoggedIn & !access_token) {
      // console.log(isLoggedIn, "not login");
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [isLoggedIn, navigate, access_token]);

  return <>{isLoggedIn || access_token & isLoggedIn ? children : null}</>; // Render children if logged in
};

export default ProtectedRoute;
