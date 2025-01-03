const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const UserRoutes = require("./Routes/UserRoutes");
const app = express();
const DB_URL = process.env.DB_URL; 
const PORT = process.env.PORT;

const allowedOrigins = [
  'http://localhost:3000',
  'https://gvcc-assignment.vercel.app',
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
       callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use("/user",UserRoutes);
app.use("/checkgvcc", (req, res)=>{
  res.send('Hello BE works');
});


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