var React = require('react');
var Parse = require('parse');
var moment = require('moment');

var Loading = require('./loading.jsx');
var CommentForm = require('./commentform.jsx');
var CommentList = require('./commentlist.jsx');
var UserDetail = require('./userdetail.jsx');

var Glyphicon = require('react-bootstrap').Glyphicon;

var PostDetail = React.createClass({
  getInitialState: function(){
    return {
      post: null,
      comments: null
    }
  },
  componentWillMount: function(){
    var savePost, saveComments;
    var self = this;
    var query = new Parse.Query( Parse.Object.extend("Post") );
    // query.include('file');
    query.include('user');
    query.get(self.props.id).then(function(postObj){
      // console.log('post returned', postObj);
      savePost = postObj;
      var query = new Parse.Query( Parse.Object.extend("Comment") );
      query.equalTo("post", postObj );
      query.find().then(function(comments){
        self.setState({
          "post": savePost,
          "comments": comments
        });
      }, function(error){
        console.log('error getting post and comments', error);
      });
    });
  },
  addComment: function(comment){
    if(!Parse.User.current()){
      return {error: 'no user is logged in'};
    }
    var comments;
    //set current comments or a blank array if none exist
    if(this.state.comments){
      comments = this.state.comments;
    }else{
      comments = [];
    }
    //initialize a new comment
    var Comment = Parse.Object.extend("Comment");
    var commentObj = new Comment();
    //set access control
    var acl = new Parse.ACL();
    acl.setPublicReadAccess(true);
    acl.setWriteAccess(Parse.User.current().id, true);
    commentObj.setACL(acl);
    //set comment properties
    commentObj.set("user", Parse.User.current());
    commentObj.set("post", this.state.post);
    commentObj.set("comment", comment);
    commentObj.save().then(function(savedComment){
      comments.push(commentObj);
      this.state.post.set('comments', comments);
      this.state.post.save();
      this.setState({'comments': comments});
    }.bind(this), function(error){
      console.log('error saving comment', error);
    });
  },
  render: function(){
    if(this.state.post){
      //use moment.js to set a date string for the age of the post
      var created = moment(this.state.post.get('createdAt')).fromNow();
      //setup the comments variable to pass into comments List
      var comments;
      if(this.state.comments){
        comments = this.state.comments;
      }else{
        comments = [];
      }
      return (
        <div className="post-detail-view">
          <UserDetail user={this.state.post.get('user')}/>
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
