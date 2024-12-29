import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Table";
import NotFound from "../Pages/NotFound";
import DashboardLayout from "../Layouts/DashboardLayout";
import Report from "../Components/Report";
import Users from "../Components/Users";
import Register from "../Components/Register";
import Login from "../Components/Login";
import Logout from "../Components/Logout"
import ProtectedRoute from "./ProtectedRoute";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/reports" element={<Report />} />
            <Route
                path="/users"
                element={<ProtectedRoute><Users /></ProtectedRoute>}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

export default router;
