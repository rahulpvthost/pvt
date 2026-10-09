function Rightbar({ posts }) {

  return (
    <aside className="rightbar">

      <h3>Recent Posts</h3>

      {posts.slice(0, 4).map((post) => (

        <div className="recent-post" key={post.id}>

          <strong>{post.title}</strong>

          <p>
            {post.author}
          </p>

        </div>

      ))}

    </aside>
  );
}

export default Rightbar;