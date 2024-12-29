import React, { useState } from "react";
import {
    TextField,
    Button,
    Grid,
    Typography,
    Paper,
    Box,
    CircularProgress,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from "@mui/material";
import { useRegisterUserMutation } from "../Features/userApiSlice";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [registerUser, { isLoading }] = useRegisterUserMutation();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.name) {
            setError("Name Required")
        }
        if (!formData.email) {
            setError("Email Required")
        }
        if (!formData.password) {
            setError("Password Required")
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (!formData.userType) {
            setError("Please select user type");
            return;
        }

        try {
            const response = await registerUser(formData).unwrap();
            console.log("response from register : ", response, response.data)
            if (response?.data?.status === true) {
                setMessage(response.data.message);
                navigate("/login");
            } else {
                setError(response.data.message);
            }
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                userType: "",
            });
        } catch (err) {
            console.log(err)
            setError(err?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <Paper
            elevation={3}
            style={{
                padding: "2rem",
                maxWidth: "500px",
                margin: "2rem auto",
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Register
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel id="userType-label">User Type</InputLabel>
                            <Select
                                labelId="userType-label"
                                name="userType"
                                value={formData.userType}
                                onChange={handleChange}
                            >
                                <MenuItem value="user">User</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {message && (
                        <Grid item xs={12}>
                            <Typography color="success" variant="body2">
                                {message}
                            </Typography>
                        </Grid>
                    )}
                    {error && (
                        <Grid item xs={12}>
                            <Typography color="error" variant="body2">
                                {error}
                            </Typography>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Box style={{ position: "relative" }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={isLoading}
                            >
                                {isLoading ? "Registering..." : "Register"}
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
                    </Grid>
                </Grid>
                <Link to="/login">
                    <p>Existing User ? Login Here</p>
                </Link>
            </form>

        </Paper>
    );
};

export default Register;
