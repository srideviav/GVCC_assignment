const express = require('express');
const mongoose = require('mongoose');


const app = express();

const DB_URL='mongodb+srv://srideviav456:Srish2023@cluster0.wnuci.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
 

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('Connected to DB successfully');
  })
  .catch((err) => {
    console.error('Error connecting to DB:', err.message);
  });


app.get("/",(req,res)=>{
    res.send("SUCCESS")
})

app.listen(3003,()=>{
    console.log("Server Started on PORT http://localhost:3003")
} )