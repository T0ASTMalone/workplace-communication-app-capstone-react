import React, { Component } from "react";
import PostForm from "../PostForm/PostForm";
import Post from "../Post/Post";
import WorkPlaceContext from "../../context/WorkPlaceContext";
import "./Feed.css";
import WpService from "../../Services/wp-api-service";

export default class Feed extends Component {
  state = {
    err: null,
    offset: 1,
    disableLoadMore: null
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
          if (posts.length < 10) {

            this.setState({ disablenLoadMore: true });
          }
        }
      )
      .catch(err => this.setState({ err }));
  };

  async componentDidMount() {
    //fetch posts for workplace
    const { wpId } = this.context;
    const { offset } = this.state;
    await this.fetchPosts(wpId, offset);
  }

  loadMorePosts = () => {

    let offset = this.state.offset;
    const { wpId } = this.context;
    offset++;
    this.fetchPosts(wpId, offset);
    this.setState({ offset });
  };

  render() {
    let posts = this.context.posts;
    let { disableLoadMore } = this.state;
    let show = this.props.className;
    return (
      <>
        <div className={`${show}`}>
          <div className="">
            <PostForm />
          </div>
          {posts.length > 0 ? (
            posts.map((post, i) => <Post key={i} post={post} />)
          ) : (
            <p>Looks Like there are not posts here</p>
          )}
          {disableLoadMore ? (
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
