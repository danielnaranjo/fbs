/**
 * Session
 * 
 * Sails session integration leans heavily on the great work already done by Express, but also unifies 
 * Socket.io with the Connect session store. It uses Connect's cookie parser to normalize configuration
 * differences between Express and Socket.io and hooks into Sails' middleware interpreter to allow you
 * to access and auto-save to `req.session` with Socket.io the same way you would with Express.
 *
 * For more information on configuring the session, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.session = {

  // Session secret is automatically generated when your new app is created
  // Replace at your own risk in production-- you will invalidate the cookies of your users,
  // forcing them to log in again. 
  secret: '52f7e431cdc5c0af28c1a5044eb358c3',


  // In production, uncomment the following lines to set up a shared redis session store
  // that can be shared across multiple Sails.js servers
  // adapter: 'redis',
  //
  // The following values are optional, if no options are set a redis instance running
  // on localhost is expected.
  // Read more about options at: https://github.com/visionmedia/connect-redis
  //
  // host: 'localhost',
  // port: 6379,
  // ttl: <redis session TTL in seconds>,
  // db: 0,
  // pass: <redis auth password>
  // prefix: 'sess:'
  // url: 'redis://redistogo:c44fe9163887e912932b439be5c8565c@albacore.redistogo.com:10281/',


  // Uncomment the following lines to use your Mongo adapter as a session store
  adapter: 'mongo',
  //
  // host: 'localhost',
  // port: 27017,
  // db: 'sails',
  // collection: 'sessions',
  //
  // Optional Values:
  //
  // # Note: url will override other connection settings
  // url: 'mongodb://user:pass@host:port/database/collection',
  url: 'mongodb://findbyco:DN14093487v@ds053168.mongolab.com:53168/post'
  //url: process.env.DB_URL  || 'DB_URL',
  //
  // username: '',
  // password: '',
  // auto_reconnect: false,
  // ssl: false,
  // stringify: true

};
