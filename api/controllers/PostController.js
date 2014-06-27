/**
 * AdsController
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

  find: function(req, res, next) {

    var id = req.param('id');
    // If id is a shortcut we don't have to find.
    if ( isShortcut(id) ) return next();
    // If we get an id we will retun one unique user.
    if (id) {
      Post.findOne(id).done(function foundUser(err, post){
        if ( err ) return next(err);
        if ( !post ) return res.notFound();

      // Contador de visitas!!!
        var visited = post.visit + 1;
        // console.log(' *** '+post.visit+' '+visited+' *** ');
        Post.update(id, { visit: visited }, function(err, post) {
          if (err) return console.log(err);
        });
      // Contador de visitas!!!

        // Response JSON if needed.
        if (req.wantsJSON) return res.json(post);
        // Else response view with results 
        else return res.view({ post: post });
      });
    }
    // Otherwise, we will retun an user array.
    else {
      // If we have a where param we will pase it as JSON.
      var where = req.param('where');
      if( _.isString(where)) {
        where = JSON.parse(where);
      }

       // Setting options from params.
      var filters = {
        limit: req.param('limit') || undefined,
        skip: req.param('skip')  || undefined,
        sort: req.param('sort') || 'createdAt DESC',
        where: where || undefined
      };
      // Find users according with filters
      Post.find(filters).limit(250).done(function foundUsers(err, posts){
      //Post.find(filters).done(function foundUsers(err, posts){
        if ( err ) return next(err);
        // Response JSON if needed.
        if (req.wantsJSON) {
          // If there are users return users
          if( posts.length ) return res.json(posts);
          // Otherwise, return status 204: no content
          else return json(204);
        // Otherwise, response view with results 
        } else {
          return res.view({ posts: posts });
        }
      });
    }
    function isShortcut(id){
      return (id === 'find' || id === 'create' || id === 'update' || id === 'destroy' || id=== 'related' || id=== 'tags' || id=== 'nearby' || id=== 'search' || id === 'reject');
    }
  },
  create: function(req, res, next) {
    Post.create(req.params.all()).done(function(err, post) {
      // Error handling
      if (err) {
        return console.log(err);
      // The Post was created successfully!
      }else {
        res.redirect('/post/');
      }
    });
  },
  update: function(req, res, next) {
    var id = req.param('id');
    // Id is needed, otherwise not found (status 404).
    if( !id ) return res.notFound();
    // Update the post gave.
    Post.update(id, req.params.all()).done(function updatedPosts(err, posts){
      if ( err ) return next(err);
      // If post is not found, return error 404.
      if ( !posts ) return res.notFound();
      // Update return an array,
      // but as we update by id, we can take the unique element.
      var post = posts[0];
      // Response JSON if needed.
      // Status 201 is Created.
      if (req.wantsJSON) return res.json(201, post);
      // Redirect to the post page that we've just created.
      else return res.redirect('/post/' + post.id);
    });
  },
  destroy: function(req, res, next) {
    var id = req.param('id');
    // Id is needed, otherwise not found (status 404).
    if( !id ) return res.notFound();
    // Find the user by id.
    Post.findOne(id).done(function foundPost(err, post){
      if ( err ) return next(err);
      // If user is not found, return error 404.
      if ( !post ) return res.notFound();
      // Delete the post.
      Post.destroy(post.id).done(function postDestroyed(err){
        if ( err ) return next();
        // Response JSON if needed.
        if (req.wantsJSON) return res.json(200);
        // Redirect to the users page.
        else return res.redirect('/');
      });
    });
  },
  related: function(req, res, next) {
    var id = req.param('id');
    var l = req.param('l');
    Post.find({ "publisher": id }).limit(l).done(function relatedPost(err, post){
      if ( err ) return next(err);
      if (req.wantsJSON) return res.json(post);
      else return res.view({ post: post});
    });

  },
  tags: function(req, res, next) {
    var id = req.param('id');
    if( !id ) return res.notFound();
    Post.find({ populars: { contains: id } }).done(function tagsPost(err, post){
    //Post.find({"$or" : [ {"title": { contains: id } }, {"populars":  { contains: id } } ]}).done(function tagsPost(err, post){
      if ( err ) return next(err);
      if (req.wantsJSON) return res.json(post);
      else return res.view({ post: post});
    });
  },
  nearby: function(req, res, next) {
    //var id = req.param('id');
    //if( !id ) return res.notFound();
    Post.find({"location":{"$near":[10.96,-63.851],"$maxDistance":1000}}).done(function nearbyPost(err, post){
      if ( err ) return next(err);
      if (req.wantsJSON) return res.json(post);
      else return res.view({ post: post});
    });
  },
  search: function(req, res, next) {
    var id = req.param('term');
    var l = req.param('l');
    // console.log('Enviado: '+id);
    if( !id ) return res.notFound();
    Post.find({ title: { contains: id } }).limit(l).done(function searchPost(err, post){
      if ( err ) return next(err);
      if (req.wantsJSON) return res.json(post);
      else return res.view({ post: post});
    });
  },
  upload: function(req, res) {
    //
  },
  reject: function(req, res, next) {
    var id = req.param('id');
    if( !id ) return res.notFound();
    Post.findOne(id).done(function foundPost(err, post){
      if ( err ) return next(err);
      if ( !post ) return res.notFound();
      Post.destroy(post.id).done(function postDestroyed(err){
        if ( err ) return next();
        // if (req.wantsJSON) return res.json(200);
        // else return res.redirect('/');
        console.log('Banned post!');
      });
    });
  },
  /*
   * Actions to render a view.
  */
  new: function(req, res) {
    // Response the view with the action's name.+req.ip    
    return res.view();
  },
  edit: function(req, res) {
    Post.findOne(req.param('id')).done(function foundPost(err, post){
      if ( err ) return next(err);
      else return res.view({ post: post });
    });
  }
  
};
