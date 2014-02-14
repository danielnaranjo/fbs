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
		phoneNumber:'STRING',
		contactMail:'STRING',
		city:'STRING',
		country:'STRING',
		photos:'array',
		chat:'INTEGER',
		map:'INTEGER',
		longitude:'STRING',
		latitude:'STRING',
		url:'STRING',
		dip:'STRING'
	}

};
