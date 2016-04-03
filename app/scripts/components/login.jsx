var React = require('react');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var Parse = require('parse');

var Login = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function(){
    return {
      name: '',
      email: '',
      password: '',
      toggleSignup: false
    }
  },
  toggleSignup: function(e){
    e.preventDefault();
    this.setState({'toggleSignup': !this.state.toggleSignup});
  },
  login: function(e){
    e.preventDefault();
    Parse.User.logIn(this.state.name, this.state.password).then(
      function(user){
        console.log('user signed in');
        this.props.login(user);
      }.bind(this),function(error, code, info){
        console.log('user login failed');
        console.log(error, code, info);
      }
    )
  },
  signUp: function(e){
    e.preventDefault();
    var user = new Parse.User();
    user.set("username", this.state.name);
    user.set("password", this.state.password);
    user.set("email", this.state.email);
    user.signUp()
      .then(function(user){
        this.props.login(user);
      }.bind(this), function(error, code, info){
        console.log('user signup failed');
        console.log(error, code, info);
      });
  },
  render: function(){
    if(!this.state.toggleSignup){
      return (
        <div className="login-form clone-form">
          <h1>InstaClone</h1>
          <form onSubmit={this.login}>
            <input type="text" placeholder="Username"
              valueLink={this.linkState('name') } />
            <input type="password" placeholder="Password"
              valueLink={this.linkState('password') } />
            <button className="btn btn-primary" type="submit">Submit</button>
          </form>
          <a className="screen-link" href="#" onClick={this.toggleSignup}>Don't Have An Account? Create One Now!</a>
        </div>
      );
    }else{
      return (
        <div className="login-form clone-form">
          <h1>InstaClone</h1>
          <form onSubmit={this.signUp}>
            <input type="text" placeholder="Username"
              valueLink={this.linkState('name') } />
            <input type="email" placeholder="Email Address"
              valueLink={this.linkState('email') } />
            <input type="password" placeholder="Password"
              valueLink={this.linkState('password') } />
            <button className="btn btn-primary" type="submit">Submit</button>
          </form>
          <a className="screen-link" href="#" onClick={this.toggleSignup}>Already Have An Account? Sign In Here!</a>
        </div>
      );
    }

  }
});

module.exports = Login;
