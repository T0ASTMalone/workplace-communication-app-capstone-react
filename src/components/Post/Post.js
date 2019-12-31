import React, { Component } from "react";
import PropTypes from "prop-types";
import usrImg from "../../img/usr/default-user-image.png";
import "./Post.css";

class Post extends Component {
  state = {
    numSeen: 40
  };

  toggleSeen = () => {};

  componentDidMount = () => {
    // fetch post info numSeen, content, username, title,
    // populate state with post info
  };

  render() {
    const post = this.props.post;
    const numSeen = this.state.numSeen;
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
            Seen {numSeen}
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
