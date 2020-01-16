import React from "react";
import IdeasForm from "../Ideas/IdeasForm";
import WorkPlaceContext from "../../context/WorkPlaceContext";
import Post from "../Post/Post";
import "./IdeasFeed.css";
import WpService from "../../Services/wp-api-service";
import idea from "../../img/svg/idea.svg";
import PropTypes from "prop-types";

export default class IdeasFeed extends React.Component {
  state = {
    err: null,
    offset: 1,
    disableLoadMore: false
  };

  static contextType = WorkPlaceContext;

  fetchPosts = (wpId, offset) => {
    return WpService.getWpPosts(wpId, "idea", offset)
      .then(async posts =>
        //set posts in context
        {
          let currPosts = this.context.ideas;
          let allPosts = [...currPosts, ...posts];
          await this.context.setIdeas(allPosts);
          // if less than 10 posts are returned disable
          // load more posts button by setting offset to 0
          if (posts.length < 10) {
            // set offset to 0
            return this.context.setIdeaOffset(0);
          }
          // else increment offset
          offset++;
          // keep track of offset in context
          // incase component unmounts
          this.context.setIdeaOffset(offset);
        }
      )
      .catch(err => this.setState({ err }));
  };

  fetchUserPosts = (id, offset) => {
    return WpService.getUserPosts(id, "idea", offset)
      .then(async posts =>
        //set posts in context
        {
          let currPosts = this.context.ideas;
          let allPosts = [...currPosts, ...posts];
          await this.context.setIdeas(allPosts);
          // if less than 10 posts are returned disable
          // load more posts button by setting offset to 0
          if (posts.length < 10) {
            // set offset to 0
            return this.context.setIdeaOffset(0);
          }
          // else increment offset
          offset++;
          // keep track of offset in context
          // incase component unmounts
          this.context.setIdeaOffset(offset);
        }
      )
      .catch(err => this.setState({ err }));
  };

  async componentDidMount() {
    //fetch posts for workplace
    const { wpId, userType, userId, ideaOffset, ideas } = this.context;
    if (ideas.length >= 1) {
      return;
    }
    if (userType === "creator") {
      await this.fetchPosts(wpId, ideaOffset);
    } else {
      await this.fetchUserPosts(userId, ideaOffset);
    }
    if (ideas.length < 10) {
      this.setState({ disableLoadMore: true });
    }
  }

  loadMorePosts = () => {
    const { wpId, userType, userId, ideaOffset } = this.context;
    if (userType === "creator") {
      this.fetchPosts(wpId, ideaOffset);
    } else {
      this.fetchUserPosts(userId, ideaOffset);
    }
  };

  renderIdeas = () => {
    const { ideas } = this.context;
    return ideas.length > 0 ? (
      ideas.map((idea, i) => <Post key={i} post={idea} />)
    ) : (
      <p className="nothing-to-see card">There are no ideas here</p>
    );
  };

  render() {
    let { userType, ideaOffset } = this.context;
    let show = this.props.className;

    return (
      <div id="ideas-feed" className={`${show}`}>
        {userType === "creator" ? (
          <>
            <div className="feed-desc card">
              <h2>Here are the ideas posted to your WorkPlace</h2>
              <img src={idea} alt="idea" id="idea-svg" />
            </div>

            {this.renderIdeas()}
          </>
        ) : (
          <>
            <IdeasForm />
            <div className="feed-desc card">
              <h2>Here are your Ideas</h2>
              <img src={idea} alt="idea" id="idea-svg" />
            </div>
            {this.renderIdeas()}
          </>
        )}
        {ideaOffset === 0 ? (
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

IdeasFeed.propTypes = {
  className: PropTypes.string
};
