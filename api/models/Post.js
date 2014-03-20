/**
 * Ads
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

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
			maxLength: 500,
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
	}

};
