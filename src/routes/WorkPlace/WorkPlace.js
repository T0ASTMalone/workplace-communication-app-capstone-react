import React, { Component } from "react";
import PropTypes from "prop-types";
import "./WorkPlace.css";
import Feed from "../../components/Feed/Feed";
import WorkPlaceContext from "../../context/WorkPlaceContext";
//import users from "../../test-users";
import IdeasFeed from "../../components/IdeasFeed/IdeasFeed";
import NewMembers from "../../components/NewMembers/NewMembers";
import WpService from "../../Services/wp-api-service";

class WorkPlace extends Component {
  state = {
    main: "feed"
  };

  static contextType = WorkPlaceContext;

  async componentDidMount() {
    let { user, wp } = this.props.match.params;
    //get user info by id
    await WpService.getUserInfo(user).then(async res => {
      const { username, type, nickname, user_id, wp_id, code } = res;
      console.log(code);
      //set user info in context
      await this.context.setUserType(type);
      await this.context.setNickname(nickname);
      await this.context.setUserName(username);
      await this.context.setUserId(user_id);
      await this.context.setWp(wp);
      await this.context.setWpId(wp_id);
      await this.context.setCode(code);
      this.setState({ ready: true });
    });
    // if user type is wpCreator
    //  display pending users component
  }

  updateWpMain = e => {
    this.setState({ main: e });
  };

  render() {
    const { main, ready } = this.state;
    const { userName, nickname, userType, workPlace, wpCode } = this.context;
    return (
      <div className="workplace">
        <div className="workplace-header">
          <div className="workplace-info">
            <div className="user-info">
              <h2 className="user nickname">{nickname}</h2>
              <h3 className="user user-name">{userName}</h3>
              <h3 className="user user-type">{userType}</h3>
            </div>
            <div className="wp-info">
              <h2 className="workplace-name">{workPlace}</h2>
              <p className="wpCode">wp code: {wpCode}</p>
            </div>
          </div>

          <div className="new-members">
            {userType === "creator" ? <NewMembers /> : <></>}
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
        </div>
        <div className="workplace-main">
          {/* 
            remove conditional rendering of components
            instead conditionally apply class hidden 
            to prevent components from unmounting
          */}
          {ready ? (
            <>
              <Feed className={main === "feed" ? "" : "hidden"} />
              <IdeasFeed className={main === "feed" ? "hidden" : ""} />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

WorkPlace.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};

export default WorkPlace;
