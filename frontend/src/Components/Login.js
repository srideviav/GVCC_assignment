import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../Features/userApiSlice"; // RTK Query slice

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginUserMutation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await login(formData).unwrap(); // Call the login mutation
      if (response?.status === true) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("username", response.data.name);
        localStorage.setItem("usertype", response.data.userType);

        navigate("/"); // Navigate to dashboard or another page
      } else {
        setErrorMessage(response?.message || "Login failed.");
      }
    } catch (err) {
      setErrorMessage(err?.data?.message || "An error occurred.");
    }
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: "2rem",
        maxWidth: "400px",
        margin: "2rem auto",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        {errorMessage && (
          <Typography color="error" variant="body2" style={{ marginTop: "1rem" }}>
            {errorMessage}
          </Typography>
        )}
        <Box style={{ position: "relative", marginTop: "1rem" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          {isLoading && (
            <CircularProgress
              size={24}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
        <Link to ="/register">
           <p>New User ? Register Here</p>
        </Link>
      </form>
    </Paper>
  );
};

export default Login;
