var React = require('react');
var moment = require('moment');

var UserDetail = require('./userdetail.jsx');

var CommentList = React.createClass({
  render: function(){
    console.log(this.props.comments);
    var comments = this.props.comments.map(function(comment){
      console.log(comment);
      //use moment.js to set a date string for the age of the post
      var created = moment(comment.get('createdAt')).fromNow();
      console.log(created);
      return (
        <div className="comment-detail" key={comment.id}>
          <UserDetail user={comment.get('user')} />
          <div className="comment-age">{created}</div>
          <div className="comment-comment">
            {comment.get('comment')}
          </div>
        </div>
      )
    });
    return (
      <div className="comments-list">
        {comments}
      </div>
    );
  }
});

module.exports = CommentList;
