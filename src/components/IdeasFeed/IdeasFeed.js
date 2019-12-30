import React from "react";
import IdeasForm from "../Ideas/IdeasForm";
import WorkPlaceContext from "../../context/WorkPlaceContext";
import Post from "../Post/Post";
import "./IdeasFeed.css";
import WpService from "../../Services/wp-api-service";

export default class IdeasFeed extends React.Component {
  state = {
    err: null
  };

  static contextType = WorkPlaceContext;

  async componentDidMount() {
    const { userType, wpId, userId } = this.context;
    if (userType === "creator") {
      await WpService.getWpPosts(wpId, "idea")
        .then(ideas =>
          //set posts in state
          this.context.setIdeas(ideas)
        )
        .catch(err => this.setState({ err }));
    } else {
      await WpService.getUserPosts(userId, "idea")
        .then(ideas =>
          //set posts in state
          this.context.setIdeas(ideas)
        )
        .catch(err => this.setState({ err }));
    }
  }

  renderIdeas = () => {
    const { ideas } = this.context;
    return ideas ? ideas.map((idea, i) => <Post key={i} post={idea} />) : <></>;
  };

  render() {
    let { userType } = this.context;
    return (
      <div id="ideas-feed" className=" feed">
        {userType === "creator" ? (
          <>
            <h4>Here are some Ideas posted by people in your WorkPlace</h4>
            {this.renderIdeas()}
          </>
        ) : (
          <>
            <IdeasForm />
            <p className="user-ideas">Here are the ideas you have posted</p>
            {this.renderIdeas()}
          </>
        )}
      </div>
    );
  }
}
