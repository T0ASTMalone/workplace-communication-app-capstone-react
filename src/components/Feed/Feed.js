import React, { Component } from "react";
import PostForm from "../PostForm/PostForm";
import Post from "../Post/Post";

export default class Feed extends Component {
  render() {
    return (
      <div className="feed">
        <div className="post">
          <PostForm />
        </div>
        {/*Iterate over posts in state */}
        <Post />
        <Post />
        <Post />
      </div>
    );
  }
}
