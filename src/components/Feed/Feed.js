import React, { Component } from "react";
import PostForm from "../PostForm/PostForm";
import Post from "../Post/Post";
import dummyPosts from "../../dummy-posts";
import WorkPlaceContext from "../../context/WorkPlaceContext";

export default class Feed extends Component {
  state = {
    posts: null
  };

  static contextType = WorkPlaceContext;

  async componentDidMount() {
    //fetch most recent posts from database where workplace
    await this.context.setPosts(dummyPosts);
  }

  render() {
    let posts = this.context.posts;
    return (
      <div className="feed">
        <div className="post">
          <PostForm />
        </div>
        {posts ? (
          posts.map((post, i) => <Post key={i} post={post} />)
        ) : (
          <>Looks like no one has posted anything yet</>
        )}
      </div>
    );
  }
}