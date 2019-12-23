import React from "react";
import "./PendingMember.css";

const PendingMember = props => {
  let member = props.member;

  console.log(member);

  return (
    <div className="pending-member">
      <div className="new-user-info">
        <img className="user-img" src={member.user_img} alt="profile" />
        <p>{member.nickname}</p>
      </div>

      <button onClick={() => props.accept(member.nickname)}>Accept</button>
      <button onClick={() => props.decline(member.nickname)}> Decline</button>
    </div>
  );
};

export default PendingMember;
