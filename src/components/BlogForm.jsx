import React from "react";

const BlogForm = (props) => {
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [url, setUrl] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.createBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div>
        <label>title:</label>
        <input
          value={title}
          placeholder="title"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>author:</label>
        <input
          value={author}
          placeholder="author"
          id="author"
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label>url:</label>
        <input
          value={url}
          id="url"
          placeholder="url"
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button id="create-btn">create</button>
    </form>
  );
};

export default BlogForm;
