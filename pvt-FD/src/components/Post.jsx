function Post({ post, onUpvote, onDownvote }) {

  return (
    <div className="post">

      <div className="post-header">

        <strong>{post.author}</strong>

        <span> • {post.time}</span>

      </div>

      <h2>{post.title}</h2>

      <p>{post.content}</p>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="post-image"
        />
      )}

      <div className="post-buttons">

        <button onClick={() => onUpvote(post.id)}>
          ⬆️ {post.upvotes}
        </button>

        <button onClick={() => onDownvote(post.id)}>
          ⬇️ {post.downvotes}
        </button>

        <button>
          💬 {post.comments}
        </button>

      </div>

    </div>
  );
}

export default Post;