var Backbone = require('backbone');

var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'posts/new': 'newPost',
    'posts/(:id)': 'posts',
    'users/(:id)': 'users',
  },
  index: function(){
    this.current = 'index';
  },
  posts: function(id){
    if(id){
      //page is built out, need to setup reset on currentPostId on page leave
      this.current = 'postDetail';
      this.currentPostId = id;
    }else{
      this.current = 'postList';
    }
  },
  newPost: function(){
    this.current = 'newPost';
  },
  users: function(id){
    if(id){
      //not implemented
      this.current = 'userDetail';
      this.currentUserId = id;
    }else{
      //not implemented
      this.current = 'userList';
    }
  }
});

module.exports = new Router();
