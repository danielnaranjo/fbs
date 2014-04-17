/**
 * AboutController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var mailer = require("mailer");

module.exports = {
    
  index: function (req, res) {
    return res.view();
  },
  privacy: function (req, res) {
    return res.view();
  },
  legal: function (req, res) {
    return res.view();
  },
  contact: function (req, res) {
    return res.view();
  },
  send: function(req, res, next) {

    var params = req.params.all(),
      username = "daniel@loultimoenlaweb.com",
      password = "NNnsEtXx1OCptBjBu2RBtg",
      name = params.name,
      email = params.email,
      message = params.message,
      now = new Date(),
      lang = params.lang,
      country = params.city + params.country,
      dip = params.dip,
      bodyMessage = "";

    bodyMessage += 'Contact request through findby.co \n';
    bodyMessage += '----------------------------------\n';
    bodyMessage += 'Name: '+ name + '\n';
    bodyMessage += 'Email: '+ email + '\n';
    bodyMessage += 'Comments: '+ message + '\n\n\n';
    bodyMessage += '----------------------------------\n';
    bodyMessage += 'Sent time: '+ now + '\n';
    bodyMessage += 'IP: '+ dip + '\n';
    bodyMessage += 'Language: '+ lang + '\n';
    bodyMessage += 'Location: '+ country + '\n';
    bodyMessage += '----------------------------------\n';

    mailer.send({
      host: "smtp.mandrillapp.com",
      port: 587,
      domain: "findby.co",
      to: "dnaranjo@gmail.com",
      from: "daniel@loultimoenlaweb.com",
      subject: "[FindBY] Contact request. Sent "+ now,
      body: bodyMessage,
      authentication: "password",
      username: username,
      password: password
    }, function(err, result){
      if ( err ) return next(err);
      else return res.redirect('/');
    });
  }
  
};
