import React, { Component } from "react";
import PropTypes from "prop-types";
import usrImg from "../../img/usr/default-user-image.png";
import "./Post.css";
import WpService from "../../Services/wp-api-service";
import WorkPlaceContext from "../../context/WorkPlaceContext";

class Post extends Component {
  state = {
    seen: this.props.post.total
  };

  static contextType = WorkPlaceContext;

  toggleSeen = () => {
    const user_id = this.context.userId;
    const { post_id } = this.props.post;
    const ack = {
      user_id,
      post_id
    };
    // post acknowledgement
    WpService.postAcknowledgement(ack)
      .then(res => {
        // if user id is included in res then currUser has
        // not previously acknowledged the post
        if (res.user_id) {
          // update num of seen in state to reflect currUser's
          // new acknowledgement
          let seen = this.state.seen;
          seen++;
          this.setState({ seen });
        } else {
          // if only the acknowledgement id is returned
          // the user has already acknowledged the post
          // so delete the acknowledgement
          WpService.deleteAcknowledgement(res.id).then(res => {
            // update the state to reflect currUser's deleted
            // acknowledgement
            let seen = this.state.seen;
            seen--;
            this.setState({ seen });
          });
        }
      })
      .catch(err => console.error(err));
  };

  render() {
    const post = this.props.post;
    const seen = this.state.seen;
    return (
      <div className="post">
        <div className="post-creator">
          <img src={usrImg} alt="test user" className="user-img" />
          <p className="nickname">{post.nickname}</p>
        </div>
        <h3 className="post-title">{post.title}</h3>
        <p className="post-content">{post.content}</p>
        <div className="post-button-container">
          <button className="acknowledge" onClick={() => this.toggleSeen()}>
            {/* replace "seen" text with icon of an eye or some other icon 
              that is an acknowledgement of having seen the post */}
            Seen {seen}
          </button>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    post_id: PropTypes.number,
    nickname: PropTypes.string,
    user_id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    data_added: PropTypes.instanceOf(Date),
    user_img: PropTypes.string,
    priority: PropTypes.number,
    type: PropTypes.string,
    wp_id: PropTypes.number
  })
};

export default Post;
