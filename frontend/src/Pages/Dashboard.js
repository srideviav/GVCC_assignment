import React from "react";
import { useDemoApiUserQuery } from "../Features/usersApiSlice";
import { DashboardLayout } from "../Layouts/DashboardLayout";

const Dashboard = () => {

    const { data: users, error, isError, isLoading, isSuccess } = useDemoApiUserQuery();
    console.log("Dashboard rendered");
    console.log("data : ", users);
    console.log("err :", isError, error)
    console.log("isLoading : ", isLoading);
    console.log("isSuccess : ", isSuccess)

    return (
        <div>
            <>
            {/* <DashboardLayout> */}
                <h1>DEMO API USERS</h1>
                <h1>Dashboard</h1>
                <p>Welcome to the Dashboard!</p>
                <ul>
                    {users?.map((user) => (
                        <li key={user.id}>{user.name}</li> // Ensure a unique `key` is used
                    ))}
                </ul>
                {/* </DashboardLayout> */}
            </>
        </div>
    )
}

export default Dashboard;