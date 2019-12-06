import React, { Component } from "react";
import "./WorkPlace.css";
import Feed from "../../components/Feed/Feed";
import IdeasFrom from "../../components/Ideas/IdeasForm";

class WorkPlace extends Component {
  state = {
    main: "feed"
  };

  updateWpMain = e => {
    this.setState({ main: e });
  };

  render() {
    const main = this.state.main;
    return (
      <div className="workplace">
        <div className="workplace-info">
          <h2 className="user-name">Miguel Ponce</h2>
          <h2 className="workplace-name">S & X seats</h2>
        </div>

        <div className="tabs">
          <button
            className="tab"
            value="feed"
            onClick={e => this.updateWpMain(e.target.value)}
          >
            Feed
          </button>
          <button
            className="tab"
            value="ideas"
            onClick={e => this.updateWpMain(e.target.value)}
          >
            Ideas
          </button>
        </div>
        <div className="workplace-main">
          {main === "feed" ? <Feed /> : <IdeasFrom />}
        </div>
      </div>
    );
  }
}

export default WorkPlace;
