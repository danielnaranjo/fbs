// Start sails and pass it command line arguments 
//require('sails').lift();


// Take from:
// https://github.com/sgress454/angular-on-sails/blob/master/app.js
var sails;
try {
	sails = require('sails');
}
catch (e) {
	console.error('Error: Somethings is wrong..');
	return;
}
// Start server
sails.lift();