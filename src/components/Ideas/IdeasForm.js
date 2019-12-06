import React, { Component } from "react";
import "./IdeasForm.css";

export default class IdeasFrom extends Component {
  render() {
    return (
      <div className="ideas-form-container">
        <form action="" className="idea-form">
          <legend>
            <h3>Have an Idea?</h3>
          </legend>
          {/* idea title */}
          <label htmlFor="idea-title" className="idea-item">
            Title
          </label>
          <input
            type="text"
            id="idea-title"
            className="idea-item"
            placeholder="Title"
          />
          {/* idea content */}
          <label htmlFor="idea-content" className="idea-item">
            Idea
          </label>
          <input type="text" id="idea-content" className="idea-item" />
          <button className="post-idea idea-item">Send</button>
        </form>
      </div>
    );
  }
}
