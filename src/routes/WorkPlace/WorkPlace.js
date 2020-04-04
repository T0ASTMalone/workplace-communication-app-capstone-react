import React, { Component } from "react";
import PropTypes from "prop-types";
import "./WorkPlace.css";
import Feed from "../../components/Feed/Feed";
import WorkPlaceContext from "../../context/WorkPlaceContext";
//import users from "../../test-users";
import IdeasFeed from "../../components/IdeasFeed/IdeasFeed";
import NewMembers from "../../components/NewMembers/NewMembers";
import WpService from "../../Services/wp-api-service";
import Footer from "../../components/Footer/Footer";

class WorkPlace extends Component {
  state = {
    main: "feed",
  };

  static contextType = WorkPlaceContext;

  async componentDidMount() {
    let { user, wp } = this.props.match.params;
    //get user info by id
    await WpService.getUserInfo(user).then(async (res) => {
      const { username, type, nickname, user_id, wp_id, code } = res;
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

  updateWpMain = (e) => {
    // toggle between wp feed and ideas feed
    this.setState({ main: e });
  };

  render() {
    const { main, ready } = this.state;
    const { userName, nickname, userType, workPlace, wpCode } = this.context;
    return (
      <div className='workplace'>
        <div className='workplace-header'>
          <div className='workplace-info card'>
            <div className='user-info'>
              <h2 className='user nickname'>{nickname}</h2>
              <h3 className='user user-name'>{userName}</h3>
              <h3 className='user user-type'>
                {userType === "user" ? "member" : userType}
              </h3>
            </div>
            <div className='wp-info'>
              <h2 className='workplace-name'>{workPlace}</h2>
              {userType === "creator" ? (
                <p className='wpCode'>wp code: {wpCode}</p>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className='new-members'>
            {userType === "creator" ? <NewMembers /> : <></>}
          </div>

          <div className='tabs '>
            <button
              id='feed'
              className='tab'
              aria-label='main-feed'
              value='feed'
              onClick={(e) => this.updateWpMain(e.target.value)}
            ></button>
            <button
              className='tab'
              aria-label='ideas-feed'
              id='ideas'
              value='ideas'
              onClick={(e) => this.updateWpMain(e.target.value)}
            ></button>
          </div>
        </div>
        <div className='workplace-main'>
          {ready ? (
            <>
              <Feed className={main === "feed" ? "feed" : "hidden"} />
              <IdeasFeed className={main === "feed" ? "hidden" : "feed"} />
              <Footer />
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
  match: PropTypes.object,
};

export default WorkPlace;
