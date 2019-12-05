import React, { Component } from "react";
import "./WorkPlace.css";
import Post from "../../components/Post/Post";

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
          <h2 className="user-name">Your Name</h2>
          <h2 className="workplace-name">Company Name</h2>
        </div>
        <div className="feed">
          {/*Iterate over posts in state */}
          <Post />
        </div>
      </div>
    );
  }
}

export default WorkPlace;
