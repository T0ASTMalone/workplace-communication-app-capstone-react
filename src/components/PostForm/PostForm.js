import React, { Component } from "react";
import "./PostForm.css";
import posts from "../../dummy-posts";
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

  handleAddPost = () => {};

  updateTitle = value => {
    this.setState({ title: { value, touched: true } });
  };

  updateContent = value => {
    this.setState({ content: { value, touched: true } });
  };

  render() {
    console.log(this.state);
    return (
      <div className="post-form-container">
        <form action="" className="post-form">
          <legend htmlFor="post-form">
            <h3>Make a new post</h3>
          </legend>
          <label htmlFor="title" className="post-form-item">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="post-form-item"
            placeholder="Title"
            onChange={e => this.updateTitle(e.target.value)}
          />
          <label htmlFor="post-content" className="post-form-item">
            Post
          </label>
          <textarea
            type="text"
            id="post-content"
            className="post-form-item"
            onChange={e => this.updateContent(e.target.value)}
          />
          <button className="creat-post">Post</button>
        </form>
      </div>
    );
  }
}
