import React, { Component } from "react";
import PostForm from "../PostForm/PostForm";
import Post from "../Post/Post";
import WorkPlaceContext from "../../context/WorkPlaceContext";
import "./Feed.css";
import WpService from "../../Services/wp-api-service";

export default class Feed extends Component {
  state = {
    err: null,
    posts: null
  };

  static contextType = WorkPlaceContext;

  async componentDidMount() {
    //fetch posts for workplace
    const { wpId } = this.context;
    await WpService.getWpPosts(wpId, "posts")
      .then(posts =>
        //set posts in state
        this.setState({ posts })
      )
      .catch(err => this.setState({ err }));
  }

  render() {
    let posts = this.state.posts;
    return (
      <div className="feed">
        <div className="post">
          <PostForm />
        </div>
        {posts ? posts.map((post, i) => <Post key={i} post={post} />) : <></>}
      </div>
    );
  }
}
