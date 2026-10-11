import { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";
import Rightbar from "../components/Rightbar";
import{api} from '../api';


function Home({ user, onLogout }) {
  const [image, setImage] = useState(null);

  const [posts, setPosts] = useState([]);
 useEffect(() => {
  api('/posts')
    .then((data) => {
      const loaded = data.data.posts.map((p) => ({
        id: p._id,
        author: p.author ? p.author.name : "unknown",
        title: p.title,
        content: p.content,
        image: p.image || "",
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

    if (!title.trim() || !content.trim()) {
      return;
    }


    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);

      if (image) {
      formData.append("image", image);
    }

      const data = await api('/posts','POST', formData);
      const savedPost = data.data.data;

      const newPost = {

        id: savedPost._id,
      author: user,
      title: savedPost.title,
      content: savedPost.content,
      image:savedPost.image ||"",
      time: "Just now",
      upvotes: savedPost.upvotes.length,
      downvotes: savedPost.downvotes.length,
      comments: 0
    };

     setPosts((prev) => [newPost, ...prev]);

    setTitle("");
    setContent("");
     setImage(null);
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

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0] || null)}
              />

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