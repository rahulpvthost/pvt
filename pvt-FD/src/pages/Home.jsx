import { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";
import Rightbar from "../components/Rightbar";
import{api} from '../api';


function Home({ user, onLogout }) {

  const [posts, setPosts] = useState([]);
 useEffect(() => {
  api('/posts')
    .then((data) => {
      const loaded = data.data.posts.map((p) => ({
        id: p._id,
        author: p.author ? p.author.name : "unknown",
        title: p.title,
        content: p.content,
        time: new Date(p.createdAt).toLocaleString(),
        upvotes: p.upvotes.length,
        downvotes: p.downvotes.length,
        comments: 0
      }));
      setPosts(loaded);
    })
    .catch((err) => console.error(err.message));
}, []);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

   async function createPost() {

    if (!title || !content) {
      return;
    }


    try {
      const data = await api('/posts','POST',{
        title,
        content
      });
      const newPost = {
        id: data.data.data._id,
      author: user,
      title: title,
      content: content,
      time: "Just now",
      upvotes: 0,
      downvotes: 0,
      comments: 0
    };

    setPosts([newPost, ...posts]);

    setTitle("");
    setContent("");
  }catch (err) {
    console.error(err.message);
  }
}

 async function upvote(id) {
     let doc;
    try{
     const data = await api(`/posts/${id}/upvote`,'PATCH');
      doc=data.data.doc;
    }catch(err){
      console.error(err.message);
      return;
    }
    const updatedPosts = posts.map((post) => {

      if (post.id === id) {
        return {
          ...post,
          upvotes: doc.upvotes.length,
          downvotes: doc.downvotes.length
        };
      }

      return post;
    });

    setPosts(updatedPosts);
  }

  async function downvote(id) {
    let doc;
    try{
     const data= await api(`/posts/${id}/downvote`,'PATCH');
      doc=data.data.doc;
    }catch(err){
      console.error(err.message);
      return;
    }

    const updatedPosts = posts.map((post) => {

      if (post.id === id) {
        return {
          ...post,
          upvotes: doc.upvotes.length,
          downvotes: doc.downvotes.length
        };
      }

      return post;
    });

    setPosts(updatedPosts);
  }

  return (
    <div>

      <Navbar
        user={user}
        onLogout={onLogout}
      />

      <div className="layout">

        <Sidebar user={user} />

        <main className="feed">

          <div className="create-box">

            <h2>Create Post</h2>

            <input
              type="text"
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="What do you want to share?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <button onClick={createPost}>
              Create Post
            </button>

          </div>

          {posts.map((post) => (

            <Post
              key={post.id}
              post={post}
              onUpvote={upvote}
              onDownvote={downvote}
            />

          ))}

        </main>

        <Rightbar posts={posts} />

      </div>

    </div>
  );
}

export default Home;