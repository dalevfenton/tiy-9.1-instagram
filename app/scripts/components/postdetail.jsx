var React = require('react');
var Parse = require('parse');
var moment = require('moment');

var Loading = require('./loading.jsx');
var CommentForm = require('./commentform.jsx');
var CommentList = require('./commentlist.jsx');

var Glyphicon = require('react-bootstrap').Glyphicon;

var PostDetail = React.createClass({
  getInitialState: function(){
    return {
      post: null
    }
  },
  componentWillMount: function(){
    var post = new Parse.Object.extend("Post");
    var query = new Parse.Query( Parse.Object.extend("Post") );
    // query.include('file');
    query.include('user');
    query.get(this.props.id).then(function(postObj){
      console.log('post returned', postObj);
      this.setState({post: postObj});
    }.bind(this), function(error){
      console.log('error getting post', error);
    });
  },
  addComment: function(comment){
    var comments;
    if(this.state.post.get('comments')){
      comments = this.state.post.get('comments');
    }else{
      comments = [];
    }
    var Comment = Parse.Object.extend("Comment");
    var commentObj = new Comment(comment);
    commentObj.set("user", Parse.User.current());
    commentObj.set("post", this.state.post);
    commentObj.save().then(function(savedComment){
      console.log(savedComment);
      comments.push(commentObj);
      this.state.post.set("comments", comments);
      this.setState({'post': this.state.post});
    }.bind(this), function(error){
      console.log('error saving comment', error);
    });
  },
  render: function(){
    console.log(['hello', this.state.post]);
    if(this.state.post){
      //set the user's avatar
      var avatar;
      if(this.state.post.get('user').get('avatar')){
        avatar = ( <img className="user-avatar" src={this.state.post.get('user').get('avatar').url() } /> );
      }else{
        avatar = ( <span className="user-avatar user-avatar-icon"><Glyphicon glyph="user" /></span>)
      }
      //use moment.js to set a date string for the age of the post
      var created = moment(this.state.post.get('createdAt')).fromNow();
      //setup the comments variable to pass into comments List
      var comments;
      if(this.state.post.get('comments')){
        comments = this.state.post.get('comments');
      }else{
        comments = [];
      }
      return (
        <div className="post-detail-view">
          <div className="post-detail-header">
            <div className="post-detail-header-left">
              {avatar}
              <span className="user-name">@{this.state.post.get('user').get('username')}</span>
            </div>
            <div className="post-detail-header-right">
              <button className="follow-button">FOLLOW</button>
            </div>
          </div>
          <div className="post-detail-header">
            <div className="post-detail-header-left">
              <span className="post-likes">{"11 likes"}</span>
            </div>
            <div className="post-detail-header-right">
              <span className="post-age">{created}</span>
            </div>
          </div>
          <div className="post-image">
            <img src={this.state.post.get('file').url()} />
          </div>
          <div className="post-description">
            <span>{this.state.post.get('description')}</span>
          </div>
          <div className="post-comments">
            <CommentForm submit={this.addComment}/>
            <CommentList comments={ comments } />
          </div>
        </div>
      );
    }else{
      return(
        <Loading />
      );
    }
  }
});

module.exports = PostDetail;
