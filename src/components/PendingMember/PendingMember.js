import React from "react";
import PropTypes from "prop-types";
import "./PendingMember.css";

import profile from "../../img/usr/default-user-image.png";

const PendingMember = props => {
  let member = props.member;

  console.log(member.user_img);

  return (
    <div className="pending-member">
      <div className="new-user-info">
        <img
          className="user-img"
          src={member.user_img ? member.user_img : profile}
          alt="profile"
        />

        <p>{member.username}</p>
      </div>

      <button onClick={() => props.accept(member.user_id)}>Accept</button>
      <button onClick={() => props.decline(member.user_id)}> Decline</button>
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
