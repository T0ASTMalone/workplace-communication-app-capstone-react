import React, { Component } from "react";
import "./WorkPlace.css";
import Post from "../../components/Post/Post";
import PostForm from "../../components/PostForm/PostForm";

class WorkPlace extends Component {
  state = {
    posts: null
  };

  async getPosts() {
    // await to get latests posts
    //set state to latest posts
  }

  render() {
    return (
      <div className="workplace">
        <div className="workplace-info">
          <h2 className="user-name">Miguel Ponce</h2>
          <h2 className="workplace-name">Tesla</h2>
        </div>

        <div className="feed">
          <div className="post">
            <PostForm />
          </div>
          {/*Iterate over posts in state */}
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    );
  }
}

export default WorkPlace;
