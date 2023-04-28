import { useState } from "react";
import PropTypes from "prop-types";
const Blog = ({ blog, handleRemoveClick, handleLikeClick, user }) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="blog">
      <p>
        {blog.title} by {blog.author}{" "}
        <button className="toggle-btn" onClick={toggleVisibility}>
          {visible ? "hide" : "show"}
        </button>
      </p>
      <div style={showWhenVisible} className="content">
        <a href={blog.url}>{blog.url}</a>
        <p>likes:</p> <span className="likes">{blog.likes}</span>
        <button className="like-btn" onClick={handleLikeClick}>
          Like
        </button>
      </div>
      {user && user?.username === blog?.user?.username && (
        <button onClick={handleRemoveClick}>remove</button>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleRemoveClick: PropTypes.func.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
};

export default Blog;
