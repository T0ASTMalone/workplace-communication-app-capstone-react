import React from "react";
import "./WpInfo.css";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

export default function WpInfo(props) {
  const location = useLocation();
  let { nickname, userName, userType, wpCode, workPlace } = props;
  return (
    <a
      href={`/join?wp=${wpCode}`}
      style={location.pathname !== "/" ? { pointerEvents: "none" } : null}
      onClick={(e) => location.pathname !== "/" && e.preventDefault()}
    >
      <div className="workplace-info card">
        <div className="user-info">
          <h3 className="user user-name">{userName}</h3>
          <h2 className="user nickname">{nickname}</h2>
          <h3 className="user user-type">
            {userType === "user" ? "member" : userType}
          </h3>
        </div>
        <div className="wp-info">
          <h2 className="workplace-name tooltip">
            {workPlace}
            <span className="tooltiptext card">{workPlace}</span>
          </h2>

          {userType === "creator" ? (
            <p className="wpCode">wp code: {wpCode}</p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </a>
  );
}

WpInfo.propTypes = {
  props: PropTypes.shape({
    nickname: PropTypes.string,
    userName: PropTypes.string,
    userType: PropTypes.string,
    wpCode: PropTypes.string,
    workPlace: PropTypes.string,
  }),
};
