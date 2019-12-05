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
          <Link to={"/sign-in"}>Sign In</Link>
        </div>

        <div id="new-user" className="landing-info">
          <h3>Register</h3>
          <p className="landing-text">
            Register as an employer or as an employee
          </p>
          <p className="landing-text">
            As an employer once registered a WorkPlace code will be generated
            for the company
          </p>
          {
            //link to employer registration page
          }
          <p className="landing-text">
            As an employee you can join a WorkPlace created by your employer
          </p>
          {
            //link to employee registration page
          }
        </div>
        {
          // div describing creating events for your WorkPlace
        }

        <div className="landing-info">
          <h3 className="div-title">Keep everyone in the loop</h3>
          <p className="landing-text">
            As the employer you can post notifications to keep your employees up
            to date
          </p>
          {
            //screen shot of WorkPlace main feed
          }
        </div>
        <div className="landing-info">
          <h3 className="div-title">Feedback</h3>
          <p className="landing-text">
            As an employee you can let your employer know about safety concerns
            or ideas for improvement that you might have
          </p>
          {
            //screen shot of ideas form / feed
          }
          <p className="landing-text">
            As an employer you can see these safety concerns or ideas that your
            employees have posted
          </p>
        </div>
      </div>
    );
  }
}
