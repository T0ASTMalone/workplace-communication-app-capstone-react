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

  componentDidMount() {
    this.setState({ ideas });
  }

  static contextType = WorkPlaceContext;

  render() {
    let ideas = this.state.ideas;
    let { userType } = this.context;
    return (
      <div className="ideas-feed">
        {userType === "admin" ? (
          ideas.map(idea => <Post post={idea} />)
        ) : (
          <IdeasForm />
        )}
      </div>
    );
  }
}
