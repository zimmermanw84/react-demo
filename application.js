var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      success: function(tweet) {
        console.log('data', tweet)
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
    // This will send a call to the sever to get data at a timeout interval set on the dom node
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
        <div className="commentBox">
          <h1>Comments</h1>
          <CommentList data={this.state.data.content} />
          <CommentForm />
        </div>
    )
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      React.createElement('form', { className: "commentForm"}
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
