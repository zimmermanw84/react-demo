var CommentBox = React.createClass({
  render: function() {
    return (
      React.createElement('div', { className: "commentBox" },
        "Hello, World! Same Shit"
      )
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      React.createElement('form', { className: "commentForm"},
          "I am a form!"
      )
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
        <div className="comment">
          <h2 className="commentAuthor">
            {this.props.author}
          </h2>
          {this.props.children}
        </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    return (
        <div className="commentList">
          <Comment author="Pete Hunt">This is one comment</Comment>
          <Comment author="Jordan Walke">This is *another* comment</Comment>
        </div>
    );
  }
});

React.render(
  React.createElement(CommentBox, null),
  document.getElementById('content')
);