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
      const { title, idea } = this.state;
      const { userName, workPlace } = this.context;
      let newIdea = {
        username: userName,
        user_id: 1,
        title: title.value,
        content: idea.value,
        date_added: new Date(),
        priority: 0,
        wp_id: 1,
        type: "idea"
      };
      console.log(newIdea);
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

  cancelPost = () => {
    this.setState({
      title: { value: "", touched: false },
      idea: { value: "", touched: false }
    });
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

          <p className="form-desc">Have an that can improve your WorkPlace?</p>
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
          <textarea
            type="text"
            id="idea-content"
            className="idea-item"
            value={idea.value}
            onChange={e => this.updateIdea(e.target.value)}
            placeholder="Idea"
          />
          <InputError hasError={this.validateIdea()} touched={idea.touched} />
          <div className=" form-button-container">
            <button type="button" onClick={() => this.cancelPost()}>
              Cancel
            </button>
            <button type="submit" className="creat-post post-idea idea-item">
              Send
            </button>
          </div>
        </form>
      </div>
    );
  }
}
