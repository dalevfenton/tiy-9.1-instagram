var React = require('react');
var moment = require('moment');

var Glyphicon = require('react-bootstrap').Glyphicon;

var UserDetail = React.createClass({
  render: function(){
    var avatar;
    if(this.props.user.get('avatar')){
      avatar = ( <img className="user-avatar" src={this.props.user.get('avatar')} /> );
    }else{
      avatar = ( <span className="user-avatar user-avatar-icon"><Glyphicon glyph="user" /></span>)
    }
    return (
      <div className="post-detail-header">
        <div className="post-detail-header-left">
          {avatar}
          <span className="user-name"><a href={"#users/"+this.props.user.id}>@{this.props.user.get('username')}</a></span>
        </div>
        <div className="post-detail-header-right">

        </div>
      </div>
    );
  }
});
//follow button belongs in post-detail-header-right but is not implemented
// <button className="follow-button">FOLLOW</button>
module.exports = UserDetail;
