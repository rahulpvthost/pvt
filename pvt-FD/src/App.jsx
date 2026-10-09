import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  function handleLogin(name) {
    setUser(name);
    setPage("home");
  }

  function handleLogout() {
      localStorage.removeItem("token");
    setUser(null);
    setPage("login");
  }

  if (page === "login") {
    return (
      <Login
        onLogin={handleLogin}
        goToSignup={() => setPage("signup")}
      />
    );
  }

  if (page === "signup") {
    return (
      <Signup
        onSignup={handleLogin}
        goToLogin={() => setPage("login")}
      />
    );
  }

  return <Home user={user} onLogout={handleLogout} />;
}

export default App;