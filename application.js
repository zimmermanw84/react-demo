var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      success: function(tweet) {
        //console.log('data', tweet)
        this.setState({data: tweet});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function () {
    this.loadCommentsFromServer();
    //console.log('componentDidMount', this);
    // This will send a call to the sever to get data at a timeout interval set on the dom node
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  handleCommentSubmit: function(comment) {
    // Render the comment without waiting for a response from the server
    // For optimizing
    //-------
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(tweet) {
        this.setState({data: tweet});
        this.loadCommentsFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
        <div className="commentBox">
          <h1>Comments</h1>
          <CommentList data={this.state.data} />
          <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        </div>
    )
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(event) {
    event.preventDefault();
    var user = React.findDOMNode(this.refs.user_handle).value.trim();
    var content = React.findDOMNode(this.refs.content).value.trim();
    if (!user || !content) return;
  //  Send DATA to sever
    this.props.onCommentSubmit({user_handle: user, content:content});
    React.findDOMNode(this.refs.user_handle).value = '';
    React.findDOMNode(this.refs.content).value = '';
    return;
  },
  render: function() {
    return (
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Your name" ref="user_handle" />
          <input type="text" placeholder="Say something..." ref="content" />
          <input type="submit" value="Post" />
        </form>
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
    var commentNodes = this.props.data.map(function (comment){
      return (
          <Comment author={comment.user_handle}>
            {comment.content}
          </Comment>
      );
    });
    return (
        <div className="commentList">
          {commentNodes}
        </div>
    );
  }
});

//var App = (
//    React.createElement(CommentBox, null),
//        React.createElement(Comment, null,
//            React.createElement(CommentList, null)
//        )
//);


React.render(
    <CommentBox url="http://localhost:3000/tweets" pollInterval={2000} /> ,
  document.getElementById('content')
);

//React.render(
//    React.createElement(CommentForm, null),
//    document.getElementById('content')
//);
