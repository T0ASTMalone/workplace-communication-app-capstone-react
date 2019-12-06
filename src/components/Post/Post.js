import React, { Component } from "react";
import "./Post.css";

class Post extends Component {
  render() {
    return (
      <div className="post">
        <div className="post-creator">
          <img
            src="https://picsum.photos/50/50"
            alt="test user"
            className="user-img"
          />
          <p className="user-name">Miguel Ponce</p>
        </div>
        <h3 className="post-title">Test Post</h3>
        <p className="post-content">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
          eligendi magni natus rem recusandae fuga eos dolorem quam modi? Ex
          quidem a ratione ipsa labore voluptas aut rem odit. Nisi!
        </p>
        <div className="post-button-container">
          <button className="acknowledge">Seen</button>
        </div>
      </div>
    );
  }
}

export default Post;
