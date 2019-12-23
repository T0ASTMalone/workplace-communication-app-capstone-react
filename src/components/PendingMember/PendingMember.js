import React from "react";
import PropTypes from "prop-types";
import "./PendingMember.css";

const PendingMember = props => {
  let member = props.member;

  return (
    <div className="pending-member">
      <div className="new-user-info">
        <img className="user-img" src={member.user_img} alt="profile" />

        <p>{member.user_name}</p>
      </div>

      <button onClick={() => props.accept(member.nickname)}>Accept</button>
      <button onClick={() => props.decline(member.nickname)}> Decline</button>
    </div>
  );
};

PendingMember.propTypes = {
  member: PropTypes.shape({
    user_id: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    user_name: PropTypes.string.isRequired,
    workplace: PropTypes.string,
    wp_id: PropTypes.number,
    user_type: PropTypes.string,
    user_img: PropTypes.string
  }),
  accept: PropTypes.func.isRequired,
  decline: PropTypes.func.isRequired
};

export default PendingMember;
