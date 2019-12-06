import React from "react";
import "./PostForm.css";

export default function PostForm() {
  return (
    <div className="post-form-container">
      <form action="" className="post-form">
        {/* post title */}
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
        />
        {/* post content */}
        <label htmlFor="post-content" className="post-form-item">
          Post
        </label>
        <textarea type="text" id="post-content" className="post-form-item" />
        <button className="creat-post">Post</button>
      </form>
    </div>
  );
}
