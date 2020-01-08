import React, { Component } from "react";
import PostForm from "../PostForm/PostForm";
import Post from "../Post/Post";
import WorkPlaceContext from "../../context/WorkPlaceContext";
import "./Feed.css";
import WpService from "../../Services/wp-api-service";

export default class Feed extends Component {
  state = {
    err: null,
    offset: 1
  };

  static contextType = WorkPlaceContext;

  fetchPosts = (wpId, offset) => {
    return WpService.getWpPosts(wpId, "posts", offset)
      .then(async posts =>
        //set posts in context
        {
          let currPosts = this.context.posts;
          let allPosts = [...currPosts, ...posts];
          await this.context.setPosts(allPosts);
          // if less than 10 posts are returned disable
          // load more posts button by setting offset to 0
          if (posts.length < 10) {
            // set offset to 0
            return this.context.setPostOffset(0);
          }
          // else increment offset
          offset++;
          // keep track of offset in context
          // incase component unmounts
          this.context.setPostOffset(offset);
        }
      )
      .catch(err => this.setState({ err }));
  };

  async componentDidMount() {
    const { wpId, posts, postOffset } = this.context;
    // check if there are posts in context
    if (posts.length >= 1) {
      // if there is return
      return;
    }
    // otherwise fetch posts
    await this.fetchPosts(wpId, postOffset);
  }

  loadMorePosts = () => {
    // get offset
    const { wpId, postOffset } = this.context;
    // fetch more posts
    this.fetchPosts(wpId, postOffset);
  };

  render() {
    let { posts, postOffset } = this.context;
    let show = this.props.className;
    return (
      <>
        <div className={`${show}`}>
          <PostForm />
          {posts.length > 0 ? (
            posts.map((post, i) => <Post key={i} post={post} />)
          ) : (
            <p>Looks Like there are not posts here</p>
          )}
          {/* 
        if offset is set to 0 all posts have been fetched
        so don't render load more button
        */}
          {postOffset === 0 ? (
            <></>
          ) : (
            <button className="load-more" onClick={this.loadMorePosts}>
              load more
            </button>
          )}
        </div>
      </>
    );
  }
}
