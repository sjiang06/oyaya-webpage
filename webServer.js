"use strict";

var mongoose = require('mongoose');
var async = require('async');


// Load the Mongoose schema for User, Photo, and SchemaInfo
var FormData = require('./schema/userData.js');

var express = require('express');
var app = express();

//Modules
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require("fs");

app.use(session({secret: 'secretKey', resave: false, saveUninitialized: false}));
app.use(bodyParser.json());


//mongoose.connect('mongodb://localhost/oyayaUserDatabase');
app.listen(3002);

// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all
// the work for us.
app.use(express.static(__dirname));
//app.use(express.static('./'))


app.get('/', function (request, response) {
    //response.send('Simple web server of files from ' + __dirname);
    response.render('webpage.html');
});

app.get('/submitForm', function(request, response) {
	FormData.create({client_name:request.body.client_name, city:request.body.city, contact_info:request.body.contact_info,
		div_track:request.body.div_track, btn_track: request.body.btn_track});
    response.send("User added");
});


