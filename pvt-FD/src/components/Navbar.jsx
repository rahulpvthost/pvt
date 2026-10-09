function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">

      <h2>PVT</h2>

      <input
        className="search"
        placeholder="Search posts..."
      />

      <div className="nav-user">
        <span>{user}</span>

        <button onClick={onLogout}>
          Logout
        </button>
      </div>

    </nav>
  );
}

export default Navbar;