/**
 * Global adapter config
 * 
 * The `adapters` configuration object lets you create different global "saved settings"
 * that you can mix and match in your models.  The `default` option indicates which 
 * "saved setting" should be used if a model doesn't have an adapter specified.
 *
 * Keep in mind that options you define directly in your model definitions
 * will override these settings.
 *
 * For more information on adapter configuration, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.adapters = {

	'default': 'mongo',
	
	mongo: {
		module: 'sails-mongo',
		// Config by parts. Sails will generate the connection uri
		//host: 'localhost',
		//user: '',
		//password: '',
		//database: 'building-realtime-webapp',
		//schema: true
		// Config by connection URI.
		url: DB_URL
	}

};
