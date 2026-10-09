import { useState } from "react";
import { api } from "../api";

function Login({ onLogin, goToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (email && password) {
      try {
        setError("");
        const data = await api('/users/login', 'POST', { email, password });
        localStorage.setItem('token', data.token);
        onLogin(data.data.user.name);
      } catch (err) {
        setError(err.message);
      }
    }
    }
  

  return (
    <div className="auth-page">
      <div className="auth-box">

        <h1>PVT</h1>
        <p>Welcome back</p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p className="small-text">
          Don't have an account?
        </p>

        <button className="link-button" onClick={goToSignup}>
          Create account
        </button>

      </div>
    </div>
  );
}

export default Login;