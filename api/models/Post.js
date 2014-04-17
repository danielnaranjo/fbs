/**
 * Ads
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
var BitlyAPI = require("node-bitlyapi");

module.exports = {

	attributes: {
		patron_id: {
			type: 'string',
			required: true
		},
		publisher: {
			type: 'string',
			required: true
		},
		contactMail: {
			type: 'string',
			required: true,
			email: true,
		},
		title: {
			type: 'string',
			required: true,
			maxLength: 140,
			minLength: 5
		},
		summary: {
			type: 'string',
		},
		text: {
			type: 'string',
			required: true,
			minLength: 5
		},
		populars: {
			type: 'string'
		},
		city: {
			type: 'string',
			required: true
		},
		country: {
			type: 'string',
			required: true
		},
		chat: {
			type: 'integer'
		},
		map: {
			type: 'integer'
		},
		location: {
			type: 'string'
		},
		url: {
			type: 'string'
		},
		dip: {
			type: 'ip'
		},
		photos: {
			type: 'array',
			defaultsTo: []
		},
		visit: {
			type: 'integer',
			defaultsTo: 0,
			number: true
		}
	},
	beforeCreate: function (values, next) {
		if (!values.title) {
			return next({err: ["Error: Must have a title!"]});
		}
		if (!values.text) {
			return next({err: ["Error: Must have a large description!"]});
		}
		// ALL to lower case!
		values.populars = values.populars.replace(/\s+/g, '').toLowerCase();
		// Keep Going!
		next();
	},
	afterCreate: function (values, next) {
		/* Send to tags model */
		var total = values.populars.split(',').length;
		var array = values.populars.split(',');
		for(i=0; i<total; i++) {
			console.log(array[i].trim());
			Tags.create({ tag: array[i].trim() }).done(function(err, user) {
				if(err) return console.log(err);
			});
		}
		/* Bit.ly shorter */
		Post.findOne(values.id).done(function(err, post) {
			var Bitly = new BitlyAPI({
				client_id: "61025540de4b5eac50ec9df7065951f9dfd95e50",
				client_secret:"9a2ef245dcc28b60ab1b764ac82d62dfdd9e63f8"
				//client_id: process.env.BITLY_ID,
				//client_secret: process.env.BITLY_SECRET
			});
			Bitly.setAccessToken("d167c2a4e35c0237a743f41548b78d41d58f0a50");
			Bitly.shorten({ longUrl: 'http://findby.co/post/'+post.id }, function(err, results) {
				// Not a nice solution ;)
				var data = results.replace(':', '').split(",");
				var dirtyUrl = data[3].split(":");
				var cleanUrl = dirtyUrl[2].replace('"', '');
				// Show me the permanent link:
				Post.update({ id: post.id }, { url: "http:"+cleanUrl }).done(function(err, post) {
					if (err) return next(err);
					else return next();
				});
			});
		});
	}
//
};
