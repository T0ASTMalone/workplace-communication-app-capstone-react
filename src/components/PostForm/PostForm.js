import React from "react";
import "./PostForm.css";

export default function PostForm() {
  return (
    <div className="post-form-container">
      <form action="" className="post-form">
        {/* post title */}
        <label htmlFor="title" className="post-form-item">
          title
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
        <input type="text" id="post-content" className="post-form-item" />
        <button className="creat-post">Post</button>
      </form>
    </div>
  );
}
