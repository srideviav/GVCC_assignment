import { useState } from "react";
import { useGetUserQuery } from "../Features/userApiSlice";  // RTK query hook for fetching user data
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";  // MUI components for styling
import Pagination from "./Dashboard/Pagination";

const Users = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { data: userData, error, isError, isLoading, isSuccess } = useGetUserQuery();
    console.log("userdata : ", userData)
    const userType = localStorage.getItem("usertype");  // Get the userType from localStorage

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); 
    };

    if (isLoading) {
        return <Typography>Loading...</Typography>;   
    }

    if (isError) {
        return <Typography color="error">Error: {error?.message || "Failed to load users"}</Typography>;  // Show error if there's an issue
    }

    const slicedUserData = userData?.data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div>
            {userType === "admin" ? (
                <>
                    <Typography variant="h4" gutterBottom>
                        Users List
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Type</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {slicedUserData?.map((user) => (
                                    <TableRow key={user._id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.userType}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination
                        page={page}
                        rowsPerPage={rowsPerPage}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        count={userData?.data?.length}   
                    />
                </>
            ) : (
                <Box
                    sx={{
                        padding: "7rem",
                        maxWidth: "auto",
                        margin: "1rem auto",
                        backgroundColor: "#f5f5f5",
                        borderRadius: "8px",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h3" gutterBottom>
                        User Details
                    </Typography>
                    <Typography variant="h6">Name : {userData?.data?.name}</Typography>
                    <Typography variant="h6">Email : {userData?.data?.email}</Typography>
                    <Typography variant="h6">UserType : {userData?.data?.userType}</Typography>
                </Box>
            )}
        </div>
    );
};

export default Users;
