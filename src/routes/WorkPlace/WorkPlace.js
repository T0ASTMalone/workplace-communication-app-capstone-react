import React, { Component } from "react";
import "./WorkPlace.css";
import Feed from "../../components/Feed/Feed";

class WorkPlace extends Component {
  render() {
    return (
      <div className="workplace">
        <div className="workplace-info">
          <h2 className="user-name">Miguel Ponce</h2>
          <h2 className="workplace-name">S & X seats</h2>
        </div>

        <div className="tabs">
          <div className="tab">Feed</div>
          <div className="tab">Ideas</div>
        </div>
        <div className="workplace-main">
          <Feed />
        </div>
      </div>
    );
  }
}

export default WorkPlace;
