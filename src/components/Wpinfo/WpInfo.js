import React from "react";
import "./WpInfo.css";
// import PropTypes from "prop-types";

export default function WpInfo(props) {
  const { nickname, userName, userType, wpCode, workPlace } = props;
  return (
    <div className="workplace-info card">
      <div className="user-info">
        <h3 className="user user-name">{userName}</h3>
        <h2 className="user nickname">{nickname}</h2>
        <h3 className="user user-type">
          {userType === "user" ? "member" : userType}
        </h3>
      </div>
      <div className="wp-info">
        <h2 className="workplace-name">{workPlace}</h2>
        {userType === "creator" ? (
          <p className="wpCode">wp code: {wpCode}</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
