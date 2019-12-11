import React, { Component } from "react";
import "./Post.css";

class Post extends Component {
  state = {
    numSeen: 40,
    seen: false
  };

  handleSeen = () => {
    let numSeen = this.state.numSeen + 1;
    this.setState({ numSeen, seen: true });
  };

  handleUnsee = () => {
    let numSeen = this.state.numSeen - 1;
    this.setState({ numSeen, seen: false });
  };

  toggleSeen = () => {
    //temp function for adding to seen count
    let numSeen = this.state.seen;
    if (numSeen) {
      this.handleUnsee();
    } else {
      this.handleSeen();
    }
  };

  componentDidMount = () => {
    // fetch post info numSeen, content, username, title,
    // populate state with post info
  };

  render() {
    const post = this.props.post;
    const numSeen = this.state.numSeen;
    return (
      <div className="post">
        <div className="post-creator">
          <img src={post.userImg} alt="test user" className="user-img" />
          <p className="user-name">{post.user}</p>
        </div>
        <h3 className="post-title">{post.title}</h3>
        <p className="post-content">{post.content}</p>
        <div className="post-button-container">
          <button className="acknowledge" onClick={() => this.toggleSeen()}>
            Seen {numSeen}
          </button>
        </div>
      </div>
    );
  }
}

export default Post;
