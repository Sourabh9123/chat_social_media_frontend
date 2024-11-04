import { useState } from "react";
import { Stack, TextField, Button, Box, Typography } from "@mui/material";
import { createUser } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    const res = await dispatch(
      createUser({ first_name, last_name, email, password })
    );
    // console.log({ first_name, last_name, email, password });
    if (res.type === "createUser/fulfilled") {
      navigate("/");
      //   console.log(res);
    }
    // You can also perform further actions, like making an API call here.
  };

  // Check if all fields are filled
  const isFormValid = () => {
    return first_name && last_name && email && password;
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <Box
      sx={{
        height: "90vh", // Full viewport height
        display: "flex",
        justifyContent: "center", // Centers horizontally
        alignItems: "center", // Centers vertically
        backgroundColor: "#f0f0f0", // Optional background color
      }}
    >
      <Stack
        spacing={2}
        width={"400px"}
        sx={{
          padding: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow effect
          backgroundColor: "white", // White background
          borderRadius: "8px", // Rounded corners
        }}
      >
        <TextField
          required
          label="First Name"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => setFirst_name(e.target.value)}
        />
        <TextField
          required
          label="Last Name"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => setLast_name(e.target.value)}
        />
        <TextField
          required
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignup}
          disabled={!isFormValid()} // Disable button if form is not valid
        >
          Sign Up
        </Button>

        <Stack direction={"row"} spacing={2}>
          <Typography fontSize={"10px"} color="primary">
            Already Have An Account {"-->"}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={redirectToLogin}
          >
            Login
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default SignUp;
