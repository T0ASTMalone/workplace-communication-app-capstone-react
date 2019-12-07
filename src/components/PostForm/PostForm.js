import React, { Component } from "react";
import "./PostForm.css";
import dummyPosts from "../../dummy-posts";
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

    let updatedPosts = [...this.context.posts, post];
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
  };

  updateTitle = value => {
    this.setState({ title: { value, touched: true } });
  };

  updateContent = value => {
    this.setState({ content: { value, touched: true } });
  };

  render() {
    console.log(this.state);
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
          <label htmlFor="post-content" className="post-form-item">
            Post
          </label>
          <textarea
            type="text"
            id="post-content"
            className="post-form-item"
            value={content.value}
            onChange={e => this.updateContent(e.target.value)}
          />
          <button className="creat-post">Post</button>
        </form>
      </div>
    );
  }
}
