import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import NotFound from "../Pages/NotFound";
import DashboardLayout  from "../Layouts/DashboardLayout";
import Report from "../Pages/Report";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/reports" element={<Report />} />
            {/* <Route path="*" element={<NotFound />} /> */}
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

export default router;
