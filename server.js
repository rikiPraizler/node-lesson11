// import { config } from "dotenv";
// config();
// const express= require("express");
// const mongoose=require("mongoose");
// const spiningRoute=require("./spiningTop");
// const app=express();
// const mongoURI = process.env.DB_CONNECTION || "mongodb://localhost:27017/spining";
// mongoose.connect(mongoURI)
//     .then((suc) => { console.log("mongo db connected sucessfully!!!", suc.connection.host) })
//     .catch(err => {
//         console.log("cannot connect mongoDB")
//         console.log(err)
//         process.exit(1);
//     })
// app.use("/spiningTop",spiningRoute);
// app.use(express.json());

// let port = process.env.PORT || 4000;
// app.listen(port, () => {
//     console.log(`app is listening on port ${port}`)
// })

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const spiningRoute = require('./Routes.js/spiningTop');

const app = express();
const mongoURI = process.env.DB_CONNECTION || 'mongodb://localhost:27017/spining';

mongoose.connect(mongoURI)
  .then((suc) => {
    console.log('MongoDB connected successfully!!!', suc.connection.host);
  })
  .catch((err) => {
    console.log('Unable to connect to MongoDB');
    console.log(err);
    process.exit(1);
  });

app.use('/spiningTop', spiningRoute);
app.use(express.json());

let port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});









