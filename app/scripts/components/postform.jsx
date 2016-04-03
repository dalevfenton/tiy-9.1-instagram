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
    //we should really do some kind of validation to make sure we have
    //a file that is really an image (by extension) or probably even check
    //MIME type / magic numbers or maybe even something more robust
    // if(isImage(e.target.files[0])){
    //   console.log('it is an image!');
    // }
    var name = Parse.User.current().id + Date.now() + ".jpg";
    var file = new Parse.File(name, e.target.files[0]);
    file.save().then(function(file){
      console.log('file returned');
      this.setState({file: file});
    }.bind(this)
    , function(error){
      //this should output some error to the screen
      console.log('error saving file', error);
    });
  },
  handleSubmit: function(e){
    e.preventDefault();

    //return early if there isn't a picture set
    if(!this.state.file){
      this.setState({'error': 'Choose a Picture In Order To Save A Post'});
      return false;
    }
    if(!Parse.User.current()){
      this.setState({'error': 'Login In Order To Save a Post'});
    }

    var Post = Parse.Object.extend("Post");
    var post = new Post();

    post.set("file", this.state.file);
    post.set("description", this.state.description);
    post.set("user", Parse.User.current());

    //set access control
    var acl = new Parse.ACL();
    acl.setPublicReadAccess(true);
    acl.setWriteAccess(Parse.User.current().id, true);
    post.setACL(acl);

    post.save().then(function(postObj){
      console.log('post uploaded successfully');
      console.log(postObj);
      this.props.addPost(postObj);
    }.bind(this), function(error){
      console.log('error uploading post', error);
    });
  },
  render: function(){
    var file;
    if(this.state.file){
      file = (<div className="post-form-image"><img src={this.state.file.url()} /></div>);
    }else{
      file = (
        <div>
          <label className="file-input-label" htmlFor="photo-input">
            <div>
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </div>
            <div>
              Add A New Image
            </div>
          </label>
          <input id="photo-input" type="file"
            accept="image/gif, image/jpg, image/jpeg, image/png, image/bmp"
            onChange={this.handleFile} />
        </div>
      );
    }
    return(
      <div className="new-post-form">
        <form onSubmit={this.handleSubmit}>
          {file}
          <textarea placeholder="add a description"
            valueLink={this.linkState('description') }></textarea>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    );
  }
});

module.exports = PostForm;
