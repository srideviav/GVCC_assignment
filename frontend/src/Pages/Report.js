import React from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useDemoApiUserQuery } from "../Features/usersApiSlice";

const Report = () => {
    const { data: userData, error, isError, isLoading, isSuccess } = useDemoApiUserQuery();

     const chartData = isSuccess
        ? userData.map((user) => ({
              name: user.name, 
              company: user.company.name,  
           }))
        : [];

    return (
        <div>
            <h1>User Activity Data</h1>

            {isLoading && <p>Loading...</p>}
            {isError && <p>Error: {error?.message}</p>}

            {isSuccess && (
                <>
                     
                    <h2>Bar Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value, name, props) => [
                                `Name: ${props.payload.name}`,
                                `Company: ${props.payload.company}`
                                ]} />
                            <Legend />
                            <Bar dataKey="company" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </>
            )}
        </div>
    );
};

export default Report;
