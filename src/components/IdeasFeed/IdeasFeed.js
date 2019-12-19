import React from "react";
import IdeasForm from "../Ideas/IdeasForm";
import WorkPlaceContext from "../../context/WorkPlaceContext";
import Post from "../Post/Post";
import ideas from "../../dummy-ideas";
import "./IdeasFeed.css";

export default class IdeasFeed extends React.Component {
  state = {
    ideas: []
  };
  static contextType = WorkPlaceContext;

  async componentDidMount() {
    const { userType, userName } = this.context;
    if (userType === "admin") {
      this.setState({ ideas });
    } else {
      const usersIdeas = ideas.filter(idea => idea.user === userName);
      this.setState({ ideas: usersIdeas });
    }
  }

  render() {
    let ideas = this.state.ideas;
    let { userType } = this.context;
    return (
      <div className="ideas-feed">
        {userType === "admin" ? (
          <>
            <h4>Here are some Ideas posted by people in your WorkPlace</h4>
            {ideas.map(idea => (
              <Post post={idea} />
            ))}
          </>
        ) : (
          <>
            <IdeasForm />
            <p className="user-ideas">Here are the ideas you have posted</p>
            {ideas.map(idea => (
              <Post post={idea} />
            ))}
          </>
        )}
      </div>
    );
  }
}
