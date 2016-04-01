var React = require('react');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var Parse = require('parse');

var PostForm = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function(){
    return {
      'file': null,
      'description': ''
    }
  },
  handleFile: function(e){
    // var file = new Parse.File(name, e.target.files[0] );
    e.preventDefault();
    var name = Parse.User.current().id + Date.now() + ".jpg";
    console.log(name);
    console.log(e.target.files[0]);
    console.log(e.target.files[0].type);
    var file = new Parse.File(name, e.target.files[0]);
    file.save().then(function(file){
      console.log(file);
      this.setState({file: file});
    }.bind(this)
    , function(error){
      console.log('error saving file', error);
    });
  },
  handleSubmit: function(e){
    e.preventDefault();
    var Post = Parse.Object.extend("Post");
    var post = new Post();
    console.log(this.state);
    this.props.addPost(this.state);
  },
  render: function(){
    var file;
    if(this.state.file){
      console.log(this.state.file);
      file = (<div><img src={this.state.file.url()} /></div>);
    }else{
      file = (
        <div>
          <label htmlFor="photo">
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
            Add A New Image
          </label>
          <input id="photo" type="file"
            onChange={this.handleFile} />
        </div>
      );
    }
    return(
      <form onSubmit={this.handleSubmit}>
        {file}
        <textarea placeholder="add a description"
          valueLink={this.linkState('description') }></textarea>
        <button type="submit">Submit</button>
      </form>
    );
  }
});

module.exports = PostForm;
