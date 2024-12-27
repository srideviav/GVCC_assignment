const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const UserRoutes = require("./Routes/UserRoutes");
const app = express();
const DB_URL = process.env.DB_URL; 
const PORT = process.env.PORT;

app.use(cors({
  origin: 'http://localhost:3000',  
  methods: 'GET,POST,PUT,DELETE',  
  allowedHeaders: 'Content-Type,Authorization',  
}));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use("/user",UserRoutes);


mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('Connected to DB successfully');
  })
  .catch((err) => {
    console.error('Error connecting to DB:', err.message);
  });

app.listen(PORT,()=>{
    console.log("Server Started on PORT http://localhost:3003")
} )