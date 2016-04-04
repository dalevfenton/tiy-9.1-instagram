var React = require('react');
var Parse = require('parse');

var Loading = require('./loading.jsx');

var PostList = React.createClass({
  getInitialState: function(){
    return {
      posts: null
    }
  },
  componentWillMount: function(){
    var query = new Parse.Query( Parse.Object.extend("Post") );
    query.find().then(function(posts){
      console.log(posts);
      this.setState({'posts': posts});
    }.bind(this), function(error){
      console.log('error getting posts', error);
    });
  },
  render: function(){
    if(this.state.posts){
      var posts = this.state.posts.map(function(post){
        console.log(post);
        return (
          <div className="post-gallery-detail" key={post.id}>
            <a href={"#posts/"+post.id}>
              <div className="post-gallery-container">
                <div className="post-gallery-image">
                  <img src={post.get('file').url()} />
                </div>
                <div className="post-gallery-overlay"></div>
              </div>
            </a>
          </div>
        );
      });
      return (
        <div className="post-list-gallery">
          {posts}
        </div>
      );
    }else{
      return (
        <Loading />
      );
    }
  }
});

module.exports = PostList;
