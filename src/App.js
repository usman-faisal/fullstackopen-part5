import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Toggleable from "./components/Toggleable";
import blogsService from "./services/blogs";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const showNotification = (message, type) => {
    setMessage({ text: message, type: type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 5000);
  };
  const createBlog = async (payload) => {
    try {
      const newBlog = await blogService.create(payload);
      setBlogs([...blogs, newBlog]);
      blogFormRef.current.toggleVisibility();
      showNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        "success"
      );
    } catch (error) {
      showNotification(error.response.data.error, "error");
    }
  };
  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      showNotification(error.response.data.error, "error");
    }
  };
  const handleRemoveClick = async (blog) => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (!confirm) return;
    await blogService.remove(blog.id);
    setBlogs((prevBlogs) => {
      return prevBlogs.filter((prevBlog) => prevBlog.id !== blog.id);
    });
  };

  const handleLikeClick = async (blog) => {
    console.log(blog);
    const newBlog = await blogsService.update(blog.id, {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    });
    setBlogs(blogs.map((blg) => (blg.id === blog.id ? newBlog : blg)));
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  const sortedBlogs = blogs.sort((a, b) => {
    return b.likes - a.likes;
  }, blogs[0]);
  return (
    <div>
      <h1>blogs</h1>
      <Notification message={message} />
      {!user ? (
        <Toggleable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
            setPassword={setPassword}
            password={password}
            setUsername={setUsername}
            username={username}
          />
        </Toggleable>
      ) : (
        <div>
          {user.username} logged in <button onClick={logout}>Logout</button>
          <Toggleable ref={blogFormRef} buttonLabel="create new">
            <BlogForm createBlog={createBlog} />
          </Toggleable>
        </div>
      )}
      <h2>blogs</h2>
      {sortedBlogs.map((blog) => (
        <Blog
          handleRemoveClick={() => handleRemoveClick(blog)}
          handleLikeClick={() => handleLikeClick(blog)}
          key={blog.id}
          blog={blog}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
