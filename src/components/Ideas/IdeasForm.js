import React, { Component } from "react";
import InputError from "./IdeasFormError";
import WorkPlaceContext from "../../context/WorkPlaceContext";
import "./IdeasForm.css";
import WpService from "../../Services/wp-api-service";

export default class IdeasFrom extends Component {
  state = {
    title: { value: "", touched: false },
    idea: { value: "", touched: false }
  };

  static contextType = WorkPlaceContext;

  async handleSubmit(e) {
    e.preventDefault();
    if (this.validateTitle() || this.validateIdea()) {
      this.setAllToTouched();
    } else {
      let { wpId, userId } = this.context;
      const { title, idea } = this.state;

      const post = {
        wp_id: wpId,
        user_id: userId,
        title: title.value,
        content: idea.value,
        type: "idea"
      };

      WpService.post(post).then(res => {
        let { ideas } = this.context;
        ideas = [res, ...ideas];
        this.context.setIdeas(ideas);
        this.clearValues();
      });
    }
  }

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
          {/* idea idea */}
          <label htmlFor="idea-idea" className="idea-item">
            Idea
          </label>
          <textarea
            type="text"
            id="idea-idea"
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
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    );
  }
}
