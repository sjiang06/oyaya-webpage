"use strict";

/**
Schema to store user data in database
**/

var mongoose = require('mongoose');

var formSchema = new mongoose.Schema({
	client_name: String,
	city: String,
	contact_method: String,
	contact_info: String,
	div_track: Map,
	btn_track: Map
});

var FormData = mongoose.model('User', formSchema);
module.exports = FormData;