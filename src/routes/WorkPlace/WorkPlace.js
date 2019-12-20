import React, { Component } from "react";
import "./WorkPlace.css";
import Feed from "../../components/Feed/Feed";
import WorkPlaceContext from "../../context/WorkPlaceContext";
import users from "../../test-users";
import IdeasFeed from "../../components/IdeasFeed/IdeasFeed";
import NewMembers from "../../components/NewMembers/NewMembers";

class WorkPlace extends Component {
  state = {
    main: "feed"
  };

  static contextType = WorkPlaceContext;

  async componentDidMount() {
    let { user, wp } = this.props.match.params;
    //get user info where user and wp
    let currUser = users.find(x => {
      return x.user_alias === user;
    });
    //set this in context
    await this.context.setUserType(currUser.user_type);
    await this.context.setUserName(currUser.user_alias);
    await this.context.setWp(wp);
    // if user type is wpCreator
    // let users = fetch pending users
    // if users
    // this.setState({pending})
  }

  updateWpMain = e => {
    this.setState({ main: e });
  };

  render() {
    const main = this.state.main;
    const { userName, userType, workPlace } = this.context;
    return (
      <div className="workplace">
        <div className="workplace-info">
          <h2 className="user-name">
            {userName}
            {"\n"}
            {userType}
          </h2>
          <h2 className="workplace-name">{workPlace}</h2>
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
        <div className="workplace-main">
          {main === "feed" ? <Feed /> : <IdeasFeed />}
        </div>
      </div>
    );
  }
}

export default WorkPlace;
