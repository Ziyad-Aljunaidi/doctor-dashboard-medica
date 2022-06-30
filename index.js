'use strict'

// Import dependencie and set up http server
require('dotenv').config();
const request = require('request');
//const fetch = require("node-fetch");
const fetch = require("node-fetch");
const { application } = require('express');

const
    express = require('express'),
    bodyparser = require('body-parser'),
    fs = require('fs'),
    path = require("path"),
    querystring = require('querystring'),
    app = express().use(bodyparser.json()); // Creates http server

const static_path = path.join(__dirname, "public");
// const cors=require("cors");
// const corsOptions ={
//    origin:'*', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }
// app.use(cors(corsOptions));
app.use(express.static(static_path));
app.use(express.urlencoded({ extended: true}));
app.listen(process.env.PORT || 1400, () => console.log('webhook is listening at localhost:1400'));

app.use("/", express.static('./public/index.html'))


app.use("/signin", express.static('./public/signin.html'))
app.use("/signup", express.static('./public/newSignUp.html'))

app.get("/doc_dashboard", (req,res) => {
    let queries = req.query
    console.log(queries)
})

