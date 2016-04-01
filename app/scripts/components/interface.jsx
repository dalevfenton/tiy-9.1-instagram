
//3rd party libs
var React = require('react');
var Parse = require('parse');

//setup parse SDK to connect to server
Parse.initialize("dvf_instagram");
Parse.serverURL = 'http://instagram-c.herokuapp.com';

//import child React components
var Login = require('./login.jsx');
var PostForm = require('./postform.jsx');

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
    console.log('inside interface login');
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
    console.log('inside master addPost with', parsePostObj);
  },
  render: function(){
    console.log('main render called');
    var body;
    //if our user isn't set we need to display the login form
    if(!this.state.user){
      return (<Login login={this.login} />);
    }
    if(this.props.router.current == 'index'){
      body = (
        <div>
          <h1>Index Page</h1>
          <PostForm addPost={this.addPost}/>
        </div>
      );
    }else{
      body = (<div><h1>Page Not Found</h1></div>);
    }

    return (
      <div>
        <div className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <span className="brand">InstaClone</span>
                <button className="pull-right btn btn-secondary"
                  onClick={this.logout}>Log Out</button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              {body}
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Interface;
