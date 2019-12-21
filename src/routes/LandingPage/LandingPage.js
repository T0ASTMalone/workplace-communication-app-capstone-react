import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page">
        <h1>WorkPlace</h1>

        <div id="existing-user" className="landing-info">
          <h3>Already part of a WorkPlace</h3>
          <Link to={"/sign-in"} className="to-wp">
            <span className="to-wp">Sign In</span>
          </Link>
        </div>

        <div id="new-user" className="landing-info">
          <h3>Register</h3>
          <p className="landing-text">
            Register as a creator or member of a WorkPlace.
          </p>
          <p className="landing-text">
            When a WorkPlace is created a WorkPlace code will be generated.
          </p>

          {/* link to employer registration page */}
          <Link to={"/create"} className="to-wp">
            <span className="to-wp">Register</span>
          </Link>
          <p className="landing-text">
            As a new member you can use a WorkPlace code to join a WorkPlace.
          </p>
          {/* link to employee registration page */}
          <Link to={"/join"}>
            <span className="to-wp">Join a workplace</span>
          </Link>
        </div>
        {
          // div describing creating events for your WorkPlace
        }

        <div className="landing-info">
          <h3 className="div-title">Keep everyone in the loop</h3>
          <p className="landing-text">
            As a member of a WorkPlace you can make posts that other members of
            your WorkPlace need to see.
          </p>
          {
            //screen shot of WorkPlace main feed
          }
        </div>
        <div className="landing-info">
          <h3 className="div-title">Feedback</h3>
          <p className="landing-text">
            If you have ideas for improvement, safety concerns, or any other
            issues you might need to bring up you can make a post under the
            ideas tab so that the creator of the WorkPlace may see your idea.
          </p>
          {
            //screen shot of ideas form / feed
          }
          <p className="landing-text">
            As the creator of the WorkPlace you can see theses ideas posted by
            members of your WorkPlace. As a member of the WorkPlace you can see
            the ideas you have posted.
          </p>
        </div>
      </div>
    );
  }
}
