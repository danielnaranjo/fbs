// Start sails and pass it command line arguments 
//require('sails').lift();

// New relic 
var newrelic = require('newrelic');

// Take from:
// https://github.com/sgress454/angular-on-sails/blob/master/app.js
var sails;
try {
	sails = require('sails');
}
catch (e) {
	console.error('Error: Lift is broken! ');
	sails.log.verbose('Error:  Lift is broken! ');
	return;
}
// Start server
sails.lift();