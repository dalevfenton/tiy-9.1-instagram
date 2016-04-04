var React = require('react');

var CommentForm = React.createClass({
  getInitialState: function(){
    return {
      comment: ''
    }
  },
  handleInput: function(e){
    this.setState({comment: e.target.value});
  },
  handleSubmit: function(e){
    e.preventDefault();
    console.log(this.props);
    this.props.submit(this.state.comment);
    this.setState({comment: ''});
  },
  render: function(){
    return (
      <div className="comment-form">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="text" value={this.state.comment}
            onChange={this.handleInput}
            placeholder="Add a comment..." />
          <button type="submit"></button>
        </form>
      </div>
    );
  }
});

module.exports = CommentForm;
