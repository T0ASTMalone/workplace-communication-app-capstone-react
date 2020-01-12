import React from "react";
import PropTypes from "prop-types";
import "./PendingMember.css";

import profile from "../../img/usr/default-user-image.png";

const PendingMember = props => {
  let member = props.member;

  return (
    <div className="pending-member card">
      <div className="new-user-info">
        <img
          className="user-img"
          src={member.user_img ? member.user_img : profile}
          alt="profile"
        />
        <p className="pending-name">{member.username}</p>
        <p className="pending-nickname">{member.nickname}</p>
      </div>
      <div className="button-container">
        <button className="accept" onClick={() => props.accept(member.user_id)}>
          Accept
        </button>
        <button
          className="decline"
          onClick={() => props.decline(member.user_id)}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

PendingMember.propTypes = {
  member: PropTypes.shape({
    user_id: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    workplace: PropTypes.string,
    wp_id: PropTypes.number,
    user_type: PropTypes.string,
    user_img: PropTypes.string
  }),
  accept: PropTypes.func.isRequired,
  decline: PropTypes.func.isRequired
};

export default PendingMember;
