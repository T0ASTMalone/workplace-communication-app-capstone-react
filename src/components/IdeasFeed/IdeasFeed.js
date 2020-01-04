import React from "react";
import IdeasForm from "../Ideas/IdeasForm";
import WorkPlaceContext from "../../context/WorkPlaceContext";
import Post from "../Post/Post";
import "./IdeasFeed.css";
import WpService from "../../Services/wp-api-service";

export default class IdeasFeed extends React.Component {
  state = {
    err: null,
    offset: 1,
    disableLoadMore: false
  };

  static contextType = WorkPlaceContext;

  fetchPosts = (wpId, offset) => {
    return WpService.getWpPosts(wpId, "idea", offset)
      .then(posts =>
        //set posts in context
        {
          if (posts.length < 10) {
            this.setState({ disableLoadMore: true });
          }
          let currPosts = this.context.ideas;
          let allPosts = [...currPosts, ...posts];
          this.context.setIdeas(allPosts);
        }
      )
      .catch(err => this.setState({ err }));
  };

  fetchUserPosts = (wpId, offset) => {
    return WpService.getWpPosts(wpId, "idea", offset)
      .then(posts =>
        //set posts in context
        {
          if (posts.length < 10) {
            this.setState({ disableLoadMore: true });
          }
          let currPosts = this.context.ideas;
          let allPosts = [...currPosts, ...posts];
          this.context.setIdeas(allPosts);
        }
      )
      .catch(err => this.setState({ err }));
  };

  async componentDidMount() {
    //fetch posts for workplace
    const { wpId, userType } = this.context;
    const { offset } = this.state;
    if (userType === "creator") {
      await this.fetchPosts(wpId, offset);
    } else {
      await this.fetchUserPosts(wpId, offset);
    }
  }

  loadMorePosts = () => {
    let offset = this.state.offset;
    const { wpId, userType } = this.context;
    offset++;
    if (userType === "creator") {
      this.fetchPosts(wpId, offset);
    } else {
      this.fetchUserPosts(wpId, offset);
    }
    this.setState({ offset });
  };

  renderIdeas = () => {
    const { ideas } = this.context;
    return ideas.length > 0 ? (
      ideas.map((idea, i) => <Post key={i} post={idea} />)
    ) : (
      <p>There are no ideas here</p>
    );
  };

  render() {
    let { userType } = this.context;
    let show = this.props.className;
    const { disableLoadMore } = this.state;
    return (
      <div id="ideas-feed" className={`${show}`}>
        {userType === "creator" ? (
          <>
            <h4 className="ideas-desc">
              Here are some Ideas posted by people in your WorkPlace
            </h4>
            {this.renderIdeas()}
          </>
        ) : (
          <>
            <IdeasForm />
            <p className="user-ideas">Here are the ideas you have posted</p>
            {this.renderIdeas()}
          </>
        )}
        {disableLoadMore ? (
          <></>
        ) : (
          <button className="load-more" onClick={this.loadMorePosts}>
            load more
          </button>
        )}
      </div>
    );
  }
}
