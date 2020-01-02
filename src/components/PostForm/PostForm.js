import React, { Component } from "react";
import "./PostForm.css";
import PostFormError from "./PostFormError";
import WorkPlaceContext from "../../context/WorkPlaceContext";

export default class PostForm extends Component {
  state = {
    title: {
      value: "",
      touched: false
    },
    content: {
      value: "",
      touched: false
    }
  };

  static contextType = WorkPlaceContext;

  handleAddPost = e => {
    e.preventDefault();
    if (this.validateTitle() || this.validateContent()) {
      this.setAllToTouched();
    } else {
      this.setState({
        title: {
          value: "",
          touched: false
        },
        content: {
          value: "",
          touched: false
        }
      });
    }
  };

  setAllToTouched = () => {
    let title = this.state.title.value;
    let content = this.state.content.value;
    this.setState({
      title: {
        value: title,
        touched: true
      },
      content: {
        value: content,
        touched: true
      }
    });
  };

  updateTitle = value => {
    this.setState({ title: { value, touched: true } });
  };

  updateContent = value => {
    this.setState({ content: { value, touched: true } });
  };

  validateTitle = () => {
    let title = this.state.title.value;
    if (title.length < 1 || title.length > 50) {
      return "A title is required to be between 1 and 50 characters";
    }
  };

  validateContent = () => {
    let content = this.state.content.value;
    if (content.length < 1) {
      return "A post is required";
    }
  };

  cancelPost = () => {
    this.setState({
      title: { value: "", touched: false },
      content: { value: "", touched: false }
    });
  };

  render() {
    const { title, content } = this.state;
    return (
      <div className="post-form-container card">
        <form action="" className="post-form"  onSubmit={this.handleAddPost}>
          <legend htmlFor="post-form">
          <p className="form-desc">
            Have Something everyone in your WorkPlace should know?
          </p>
            
          </legend>
          <label htmlFor="title" className="post-form-item">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="post-form-item"
            placeholder="Title"
            value={title.value}
            onChange={e => this.updateTitle(e.target.value)}
          />
          <PostFormError
            hasError={this.validateTitle()}
            touched={title.touched}
          />
          <label htmlFor="post-content" className="post-form-item">
            Post
          </label>
          <textarea
            type="text"
            id="post-content"
            className="post-form-item"
            placeholder="Post"
            value={content.value}
            onChange={e => this.updateContent(e.target.value)}
          />
          <PostFormError
            hasError={this.validateContent()}
            touched={content.touched}
          />
          <div className="form-button-container">
            <button type="button" onClick={() => this.cancelPost()}>
              Cancel
            </button>
            <button type="submit" className="creat-post">
              Post
            </button>
          </div>
        </form>
      </div>
    );
  }
}
