import React, { Component } from "react";
import InputError from "./IdeasFormError";
import WorkPlaceContext from "../../context/WorkPlaceContext";
import "./IdeasForm.css";

export default class IdeasFrom extends Component {
  state = {
    title: { value: "", touched: false },
    idea: { value: "", touched: false }
  };

  static contextType = WorkPlaceContext;

  handleSubmit = e => {
    e.preventDefault();
    if (this.validateTitle() || this.validateIdea()) {
      this.setAllToTouched();
    } else {
      // const { title, idea } = this.state;
      // const { userName, workPlace } = this.context;
      // let newIdea = {
      //   user: userName,
      //   title: title.value,
      //   idea: idea.value,
      //   date: new Date(),
      //   workplace: workPlace
      // };
      this.clearValues();
    }
  };

  clearValues = () => {
    this.setState({
      title: { value: "", touched: false },
      idea: { value: "", touched: false }
    });
  };

  setAllToTouched = () => {
    const { title, idea } = this.state;
    this.setState({
      title: { value: title.value, touched: true },
      idea: { value: idea.value, touched: true }
    });
  };

  updateTitle = title => {
    this.setState({ title: { value: title, touched: true } });
  };

  updateIdea = idea => {
    this.setState({ idea: { value: idea, touched: true } });
  };

  validateTitle = () => {
    const title = this.state.title.value;
    if (title < 1) {
      return "A user name is required";
    }
  };

  validateIdea = () => {
    const idea = this.state.idea.value;
    if (idea < 1) {
      return "A idea is required";
    }
  };

  render() {
    const { title, idea } = this.state;
    return (
      <div className="ideas-form-container">
        <form
          action=""
          className="idea-form"
          onSubmit={e => this.handleSubmit(e)}
        >
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
            value={title.value}
            onChange={e => this.updateTitle(e.target.value)}
          />
          <InputError hasError={this.validateTitle()} touched={title.touched} />
          {/* idea content */}
          <label htmlFor="idea-content" className="idea-item">
            Idea
          </label>
          <input
            type="text"
            id="idea-content"
            className="idea-item"
            value={idea.value}
            onChange={e => this.updateIdea(e.target.value)}
          />
          <InputError hasError={this.validateIdea()} touched={idea.touched} />
          <button className="post-idea idea-item">Send</button>
        </form>
      </div>
    );
  }
}
