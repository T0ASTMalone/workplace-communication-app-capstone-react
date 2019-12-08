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
      let user = this.context.userName;
      let title = this.state.title.value;
      let content = this.state.content.value;
      let date = new Date();
      let userImg = "https://picsum.photos/50/50";

      const post = {
        user,
        title,
        content,
        date,
        userImg
      };

      let updatedPosts = [post, ...this.context.posts];
      this.context.setPosts(updatedPosts);
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
    console.log(title);
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

  render() {
    const { title, content } = this.state;
    return (
      <div className="post-form-container">
        <form action="" className="post-form" onSubmit={this.handleAddPost}>
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
          <button className="creat-post">Post</button>
        </form>
      </div>
    );
  }
}
