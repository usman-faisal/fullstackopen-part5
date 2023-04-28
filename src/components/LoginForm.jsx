import React from "react";

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <form id="form-login" onSubmit={handleLogin}>
      <h2>Login to application</h2>
      <div>
        <label>username</label>
        <input
          type="text"
          value={username}
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label>password</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-btn">Login</button>
    </form>
  );
};

export default LoginForm;
