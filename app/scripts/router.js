var Backbone = require('backbone');

var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'posts/(:id)': 'posts'
  },
  index: function(){
    this.current = 'index';
  },
  posts: function(id){
    if(id){
      this.current = 'postDetail';
      this.currentPostId = id;
    }else{
      this.current = 'postList';
    }
  }
});

module.exports = new Router();
