
//3rd party libs
var React = require('react');
var Parse = require('parse');
var Backbone = require('backbone');

//setup parse SDK to connect to server
Parse.initialize("dvf_instagram");
Parse.serverURL = 'http://instagram-c.herokuapp.com';

//import child React components
var Login = require('./login.jsx');
var PostForm = require('./postform.jsx');
var PostDetail = require('./postdetail.jsx');

//define the top level component
var Interface = React.createClass({
  getInitialState: function(){
    return {
      user: Parse.User.current()
    };
  },
  componentWillMount: function(){
    this.callback = (function(){
      this.forceUpdate();
    }.bind(this));
    this.props.router.on('route', this.callback);
  },
  componentWillUnmount: function(){
    this.props.router.off('route', this.callback);
  },
  login: function(parseUserObj){
    this.setState({'user': parseUserObj});
  },
  logout: function(e){
    e.preventDefault();
    Parse.User.logOut().then(
      function(user){
        this.setState({user: Parse.User.current()});
      }.bind(this),
      function(error){
        console.log('user was not logged out');
      });
  },
  addPost: function(parsePostObj){
    Backbone.history.navigate('posts/' + parsePostObj.id, {trigger: true});
  },
  render: function(){
    // console.log('main render called');
    var body;
    //if our user isn't set we need to display the login form
    if(!this.state.user){
      return (<Login login={this.login} />);
    }
    if(this.props.router.current == 'index'){
      body = (
        <div>
          <PostForm addPost={this.addPost} />
        </div>
      );
    }else if(this.props.router.current == 'postList'){
      body = (
        <div>
          <h1>List View For All Posts</h1>
        </div>
      );
    }else if(this.props.router.current == 'postDetail'){
      body = (
        <PostDetail id={this.props.router.currentPostId} />
      );
    }else{
      body = (<div><h1>Page Not Found</h1></div>);
    }

    return (
      <div>
        <div className="header-full-width">
          <div className="header-container">
            <div className="header-item header-left">
              <span className="brand">InstaClone</span>
            </div>
            <div className="header-item header-center">
              <input type="text" placeholder="Search"/>
            </div>
            <div className="header-item header-right">
              <a href="#" className="header-button"
                onClick={this.logout}><span className="glyphicon glyphicon-user" aria-hidden="true"></span></a>
            </div>
          </div>
        </div>
        <div className="body-container">
          {body}
        </div>
      </div>
    )
  }
});

module.exports = Interface;
