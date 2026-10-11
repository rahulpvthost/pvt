import { useState } from "react";
import { api } from "../api";

function Signup({ onSignup, goToLogin }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await api("/users/signup", "POST", {
        name,
        email,
        password
      });

      localStorage.setItem("token", data.token);
      onSignup(data.data.user.name);

    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-box">

        <h1 className="log">PVT</h1>
        <p>Create your account</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            Sign Up
          </button>

        </form>

        <p className="small-text">
          Already have an account?
        </p>

        <button className="link-button" onClick={goToLogin}>
          Login
        </button>

      </div>

    </div>
  );
}

export default Signup;