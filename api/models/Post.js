/**
 * Ads
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {
		patron_id:'STRING',
		publisher:'STRING',
		title:'STRING',
		summary:'STRING',
		text:'STRING',
		populars:'STRING',
		contactMail:'STRING',
		city:'STRING',
		country:'STRING',
		chat:'INTEGER',
		map:'INTEGER',
		longitude:'STRING',
		latitude:'STRING',
		url:'STRING',
		dip:'STRING'
	},
	beforeCreate: function (values, next) {
		if (!values.title) {
			return next({err: ["Error: Must have a title!"]});
		}
		if (!values.text) {
			return next({err: ["Error: Must have a large description!"]});
		}
		values.slug = values.populars.replace(/\s+/g, '').toLowerCase();
		next();
	}

};
