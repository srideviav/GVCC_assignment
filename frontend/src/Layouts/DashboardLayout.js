import React from "react";
import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Outlet, Link } from "react-router-dom";

const drawerWidth = 240;

const DashboardLayout = () => {
    const token = localStorage.getItem("token");
    const navItems = [
        { text: "Home", icon: <DashboardIcon />, link: "/" },
        { text: "Users", icon: <ShoppingCartIcon />, link: "/users" },
        { text: "Reports", icon: <BarChartIcon />, link: "/reports" },
        { text: "Register", icon: <BarChartIcon />, link: "/register" },
        ...(token
          ? [{ text: "Logout", icon: <BarChartIcon />, link: "/logout" }]
          : [{ text: "Login", icon: <BarChartIcon />, link: "/login" }])
      ];
 

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            {/* Top AppBar */}
            <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                <Toolbar>
                    <Typography variant="h6" noWrap />                        
                 </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                    <List>
                        {navItems.map((item) => (
                            <ListItem button="true" key={item.text} component={Link} to={item.link}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            
            <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default DashboardLayout;
