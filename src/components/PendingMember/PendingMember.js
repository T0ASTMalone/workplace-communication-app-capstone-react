import React from "react";
import "./PendingMember.css";

const PendingMember = props => {
  let member = props.member;

  return (
    <div className="pending-member">
      <div className="new-user-info">
        <img className="user-img" src={member.user_img} alt="profile" />
        <p>{member.user_alias}</p>
      </div>

      <button onClick={() => props.accept(member.user_alias)}>Accept</button>
      <button onClick={() => props.decline(member.user_alias)}> Decline</button>
    </div>
  );
};

export default PendingMember;
