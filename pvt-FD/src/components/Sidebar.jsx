function Sidebar({ user }) {
  return (
    <aside className="sidebar">

      <div className="profile">

        <div className="avatar">
          {user[0]}
        </div>

        <h3>{user}</h3>

        <p>@{user.toLowerCase()}</p>

      </div>

      <hr />

      <div className="menu">

        <p>🏠 Home</p>
        <p>🔥 Popular</p>
        <p>⭐ Saved</p>
        <p>👤 Profile</p>

      </div>

    </aside>
  );
}

export default Sidebar;