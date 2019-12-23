import React from "react";
import IdeasForm from "../Ideas/IdeasForm";
import WorkPlaceContext from "../../context/WorkPlaceContext";
import Post from "../Post/Post";
import "./IdeasFeed.css";
import dummyPosts from "../../dummy-posts";

export default class IdeasFeed extends React.Component {
  static contextType = WorkPlaceContext;

  async componentDidMount() {
    const { userType, nickname } = this.context;
    if (userType === "creator") {
      await this.context.setIdeas(
        dummyPosts.filter(post => post.type === "idea")
      );
    } else {
      await this.context.setIdeas(
        dummyPosts.filter(
          post => post.type === "idea" && post.nickname === nickname
        )
      );
    }
  }

  render() {
    let ideas = this.context.ideas;
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
