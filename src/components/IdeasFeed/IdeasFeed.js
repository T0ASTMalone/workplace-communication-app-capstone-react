import React from "react";
import IdeasForm from "../Ideas/IdeasForm";
import WorkPlaceContext from "../../context/WorkPlaceContext";
import Post from "../Post/Post";
import "./IdeasFeed.css";
import posts from "../../dummy-posts";

export default class IdeasFeed extends React.Component {
  state = {
    ideas: []
  };
  static contextType = WorkPlaceContext;

  componentDidMount() {
    const { userType, nickname } = this.context;
    if (userType === "creator") {
      const wpIdeas = posts.filter(post => post.type === "idea");
      this.setState({ ideas: wpIdeas });
    } else {
      const usersIdeas = posts.filter(
        post => post.nickname === nickname && post.type === "idea"
      );
      this.setState({ ideas: usersIdeas });
    }
  }

  render() {
    let ideas = this.state.ideas;
    let { userType } = this.context;
    return (
      <div id="ideas-feed" className=" feed">
        {userType === "creator" ? (
          <>
            <h4>Here are some Ideas posted by people in your WorkPlace</h4>
            {ideas.map((idea, i) => (
              <Post key={i} post={idea} />
            ))}
          </>
        ) : (
          <>
            <IdeasForm />
            <p className="user-ideas">Here are the ideas you have posted</p>
            {ideas.map((idea, i) => (
              <Post key={i} post={idea} />
            ))}
          </>
        )}
      </div>
    );
  }
}
