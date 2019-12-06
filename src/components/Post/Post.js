import React, { Component } from "react";
import "./Post.css";

class Post extends Component {
  render() {
    const post = this.props.post;
    return (
      <div className="post">
        <div className="post-creator">
          <img src={post.userImg} alt="test user" className="user-img" />
          <p className="user-name">{post.user}</p>
        </div>
        <h3 className="post-title">{post.title}</h3>
        <p className="post-content">{post.content}</p>
        <div className="post-button-container">
          <button className="acknowledge">Seen</button>
        </div>
      </div>
    );
  }
}

export default Post;
