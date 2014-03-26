/**
 * TagsController
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

module.exports = {

index: function(req, res, next) {

    var id = req.param('id');
    if( !id ) return res.notFound();
    
    Tags.find({}).done(function tagsPost(err, tags){
      if ( err ) return next(err);
      if (req.wantsJSON) return res.json(tags);
      // else return res.view({ tags: tags});
    });

  }
};
