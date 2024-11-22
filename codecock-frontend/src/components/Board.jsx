import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  arrayUnion,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [code, setCode] = useState("");
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOption, setSearchOption] = useState("title");
  const [isEditing, setIsEditing] = useState(false);

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          likes: doc.data().likes || 0,
          likedBy: doc.data().likedBy || [],
          comments: Array.isArray(doc.data().comments) ? doc.data().comments : [],
          ...doc.data(),
        }));
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Add a new post
  const handleAddPost = async () => {
    if (!title || !content) {
      alert("Title and content cannot be empty.");
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        code: code || "",
        userId: auth.currentUser.uid || "Anonymous",
        displayName: auth.currentUser.displayName || "Anonymous",
        createdAt: serverTimestamp(),
        likes: 0,
        likedBy: [],
        comments: [],
      });
      setTitle("");
      setContent("");
      setCode("");
      setShowForm(false);
      setShowCodeEditor(false);
      alert("Post added successfully!");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  // Edit an existing post
  const handleEditPost = async () => {
    if (!selectedPost) return;

    const postRef = doc(db, "posts", selectedPost.id);
    try {
      await updateDoc(postRef, {
        title: selectedPost.title,
        content: selectedPost.content,
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === selectedPost.id
            ? { ...post, title: selectedPost.title, content: selectedPost.content }
            : post
        )
      );

      alert("Post updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // Like a post
  const handleLikePost = async (postId, currentLikes, likedBy) => {
    const userId = auth.currentUser.uid || "Anonymous";

    if (likedBy.includes(userId)) {
      alert("You already liked this post.");
      return;
    }

    const postRef = doc(db, "posts", postId);
    try {
      await updateDoc(postRef, {
        likes: currentLikes + 1,
        likedBy: arrayUnion(userId),
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, likes: currentLikes + 1, likedBy: [...likedBy, userId] }
            : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Add a comment
  const handleAddComment = async (postId) => {
    if (!comment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    const postRef = doc(db, "posts", postId);
    const newComment = {
      userId: auth.currentUser.uid || "Anonymous",
      text: comment,
      createdAt: serverTimestamp(),
    };

    try {
      await updateDoc(postRef, {
        comments: arrayUnion(newComment),
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [...post.comments, { ...newComment, createdAt: new Date() }],
              }
            : post
        )
      );

      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Delete a post
  const handleDeletePost = async (postId, postUserId) => {
    if (auth.currentUser.uid !== postUserId) {
      alert("You can only delete your own posts.");
      return;
    }

    const postRef = doc(db, "posts", postId);
    try {
      await deleteDoc(postRef);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Search for posts
  const handleSearch = async () => {
    try {
      let filteredPosts = [];
      if (searchQuery.trim() === "") {
        const querySnapshot = await getDocs(collection(db, "posts"));
        filteredPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } else {
        let q;
        if (searchOption === "title") {
          q = query(
            collection(db, "posts"),
            where("title", ">=", searchQuery),
            where("title", "<=", searchQuery + "\uf8ff")
          );
        } else if (searchOption === "content") {
          q = query(
            collection(db, "posts"),
            where("content", ">=", searchQuery),
            where("content", "<=", searchQuery + "\uf8ff")
          );
        }

        const querySnapshot = await getDocs(q);
        filteredPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      }

      setPosts(filteredPosts);
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Board</h2>

      {!selectedPost && (
        <div>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: "10px", marginRight: "10px", width: "60%" }}
            />
            <select
              value={searchOption}
              onChange={(e) => setSearchOption(e.target.value)}
              style={{ padding: "10px", marginRight: "10px" }}
            >
              <option value="title">Title</option>
              <option value="content">Content</option>
            </select>
            <button
              onClick={handleSearch}
              style={{
                padding: "10px",
                backgroundColor: "#61dafb",
                color: "white",
                border: "none",
              }}
            >
              Search
            </button>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: "10px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              marginBottom: "20px",
            }}
          >
            {showForm ? "Cancel" : "Write Post"}
          </button>
        </div>
      )}

      {showForm && (
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <button
            onClick={() => setShowCodeEditor(!showCodeEditor)}
            style={{
              padding: "10px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              marginBottom: "10px",
            }}
          >
            {showCodeEditor ? "Close Code Editor" : "Add Code"}
          </button>
          {showCodeEditor && (
            <textarea
              placeholder="Write your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{
                width: "100%",
                backgroundColor: "#333",
                color: "white",
                padding: "10px",
                marginBottom: "10px",
                minHeight: "150px",
              }}
            />
          )}
          <button
            onClick={handleAddPost}
            style={{
              padding: "10px",
              backgroundColor: "blue",
              color: "white",
              border: "none",
            }}
          >
            Submit
          </button>
        </div>
      )}

      {!selectedPost ? (
        <div>
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
                cursor: "pointer",
              }}
            >
              <h4>{post.title}</h4>
              <p>❤️ {post.likes} 💬 {post.comments.length}</p>
              <p>By: {post.displayName}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedPost(null)}
            style={{
              padding: "10px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              marginBottom: "10px",
            }}
          >
            Back
          </button>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={selectedPost.title}
                onChange={(e) =>
                  setSelectedPost({ ...selectedPost, title: e.target.value })
                }
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />
              <textarea
                value={selectedPost.content}
                onChange={(e) =>
                  setSelectedPost({ ...selectedPost, content: e.target.value })
                }
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />
              <button
                onClick={handleEditPost}
                style={{
                  padding: "10px",
                  backgroundColor: "blue",
                  color: "white",
                  border: "none",
                  marginBottom: "10px",
                }}
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div>
              <h3>{selectedPost.title}</h3>
              <p>{selectedPost.content}</p>
              {selectedPost.code && (
                <pre
                  style={{
                    backgroundColor: "#333",
                    color: "white",
                    padding: "10px",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {selectedPost.code}
                </pre>
              )}
              <p>By: {selectedPost.displayName}</p>
              <button
                onClick={() =>
                  handleLikePost(selectedPost.id, selectedPost.likes, selectedPost.likedBy)
                }
                style={{
                  padding: "10px",
                  color: "white",
                  border: "none",
                  marginTop: "10px",
                }}
              >
                ❤️
              </button>
            </div>
          )}
          <textarea
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ width: "100%", padding: "5px", marginTop: "10px" }}
          />
          <button
            onClick={() => handleAddComment(selectedPost.id)}
            style={{
              padding: "5px",
              backgroundColor: "#61dafb",
              color: "white",
              border: "none",
              marginTop: "10px",
            }}
          >
            Add Comment
          </button>
          {auth.currentUser.uid === selectedPost.userId && (
            <div>
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  padding: "10px",
                  backgroundColor: "orange",
                  color: "white",
                  border: "none",
                  marginTop: "10px",
                }}
              >
                Edit Post
              </button>
              <button
                onClick={() => handleDeletePost(selectedPost.id, selectedPost.userId)}
                style={{
                  padding: "10px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  marginTop: "10px",
                }}
              >
                Delete Post
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Board;