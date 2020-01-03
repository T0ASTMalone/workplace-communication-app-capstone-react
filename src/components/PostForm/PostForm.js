import React, { Component } from "react";
import "./PostForm.css";
import PostFormError from "./PostFormError";
import WorkPlaceContext from "../../context/WorkPlaceContext";
import WpService from "../../Services/wp-api-service";

export default class PostForm extends Component {
  state = {
    err: null,
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
      // get user and wp id
      let { wpId, userId } = this.context;

      // get post content and title
      let title = this.state.title.value;
      let content = this.state.content.value;

      // build post object
      const post = {
        wp_id: wpId,
        user_id: userId,
        title,
        content,
        type: "posts"
      };

      //post post lol
      WpService.post(post)
        .then(res => {
          console.log(res);
          let { posts } = this.context;
          posts = [res, ...posts];
          this.context.setPosts(posts);
          this.clearValues();
        })
        .catch(err => this.setState({ err }));
    }
  };

  clearValues = () => {
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
      <div className="post-form-container">
        <form action="" className="post-form" onSubmit={this.handleAddPost}>
          <p className="form-desc">
            Have Something everyone in your WorkPlace should know?
          </p>
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
