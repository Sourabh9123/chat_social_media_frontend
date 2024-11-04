import React, { useState } from "react";
import style from "./Login.module.css";
import { useDispatch } from "react-redux";
import { setUser, LoginUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Button } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    const res = await dispatch(LoginUser({ email, password }));
    if (res) {
      navigate("/");
    }
  };

  const SignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className={style.main}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit"> Sign In</button>
        <Stack
          direction={"row"}
          // justifyContent={"center"}
          // alignItems={"center"}
          spacing={1}
        >
          <Typography fontSize={"10px"} color="primary">
            Don't Have An Account Create One {"-->"}
          </Typography>
          <Button variant="contained" size="small" onClick={SignupRedirect}>
            Sign Up
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default Login;
