var React = require('react');

var CommentList = React.createClass({
  render: function(){
    console.log(this.props.comments);
    return (
      <div className="comments-list">
        <div className="comment">omg your stuff looks sooooo tasty</div>
      </div>
    );
  }
});

module.exports = CommentList;
