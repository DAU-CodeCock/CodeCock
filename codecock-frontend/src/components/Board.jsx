import React, { useState } from "react";

const Board = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Sample Post 1",
      content: "This is a sample post",
      likes: 0,
      likedBy: [],
      comments: [],
    },
    {
      id: 2,
      title: "Sample Post 2",
      content: "Another sample post",
      likes: 3,
      likedBy: [],
      comments: [],
    },
  ]);
  const [currentView, setCurrentView] = useState("list"); // "list", "write", "view"
  const [selectedPost, setSelectedPost] = useState(null); // 현재 선택된 글
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [code, setCode] = useState("");
  const [comment, setComment] = useState("");
  const [commentCode, setCommentCode] = useState("");
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("title"); // "title" or "content"
  const currentUser = "user123"; // 가상 사용자 ID

  // Add a new post
  const handleAddPost = () => {
    if (!title || !content) {
      alert("Title and content cannot be empty.");
      return;
    }

    const newPost = {
      id: posts.length + 1,
      title,
      content,
      code,
      likes: 0,
      likedBy: [],
      comments: [],
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setTitle("");
    setContent("");
    setCode("");
    setShowCodeEditor(false);
    setCurrentView("list"); // 글쓰기 후 목록으로 이동
  };

  // Like a post (only once per user)
  const handleLikePost = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          if (post.likedBy.includes(currentUser)) {
            alert("You have already liked this post.");
            return post;
          }
          return {
            ...post,
            likes: post.likes + 1,
            likedBy: [...post.likedBy, currentUser],
          };
        }
        return post;
      })
    );

    // Update the selected post's likes immediately
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) => ({
        ...prev,
        likes: prev.likes + 1,
        likedBy: [...prev.likedBy, currentUser],
      }));
    }
  };

  // Add a comment with optional code
  const handleAddComment = (postId) => {
    if (!comment.trim() && !commentCode.trim()) {
      alert("Comment or code cannot be empty.");
      return;
    }

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { text: comment, code: commentCode, user: currentUser },
              ],
            }
          : post
      )
    );

    setComment("");
    setCommentCode("");

    // Update the selected post immediately to reflect the new comment
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) => ({
        ...prev,
        comments: [
          ...prev.comments,
          { text: comment, code: commentCode, user: currentUser },
        ],
      }));
    }
  };

  // Copy code to clipboard
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      alert("Code copied to clipboard!");
    });
  };

  // Delete a post
  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    setSelectedPost(null);
    setCurrentView("list");
  };

  // Filtered and searched posts
  const filteredPosts = posts.filter((post) => {
    if (filter === "title") {
      return post.title.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (filter === "content") {
      return post.content.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  // Render List View
  if (currentView === "list") {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Board</h2>

        {/* Search and Filter */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search posts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: "10px", marginRight: "10px", width: "60%" }}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: "10px", marginRight: "10px" }}
          >
            <option value="title">Search by Title</option>
            <option value="content">Search by Content</option>
          </select>
        </div>

        {/* Write Post Button */}
        <button
          onClick={() => setCurrentView("write")}
          style={{
            padding: "10px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            marginBottom: "20px",
          }}
        >
          Write Post
        </button>

        {/* Post List */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredPosts.map((post) => (
            <li
              key={post.id}
              onClick={() => {
                setSelectedPost(post);
                setCurrentView("view");
              }}
              style={{
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
            >
              <h4>{post.title}</h4>
              <p>
                ❤️ {post.likes} 💬 {post.comments.length}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Render Write Post View
  if (currentView === "write") {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Write Post</h2>

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
        <button
          onClick={() => setCurrentView("list")}
          style={{
            padding: "10px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            marginLeft: "10px",
          }}
        >
          Cancel
        </button>
      </div>
    );
  }

  // Render View Post
  if (currentView === "view" && selectedPost) {
    return (
      <div style={{ padding: "20px" }}>
        <button
          onClick={() => setCurrentView("list")}
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
        <h3>{selectedPost.title}</h3>
        <p>{selectedPost.content}</p>
        {selectedPost.code && (
          <div>
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
            <button
              onClick={() => handleCopyCode(selectedPost.code)}
              style={{
                padding: "5px",
                backgroundColor: "#61dafb",
                color: "white",
                border: "none",
              }}
            >
              Copy Code
            </button>
          </div>
        )}
        <button
          onClick={() => handleLikePost(selectedPost.id)}
          style={{
            padding: "10px",
            background: "none",
            border: "none",
            marginTop: "10px",
          }}
        >
          ❤️ {selectedPost.likes}
        </button>

        {/* Comments */}
        <h4>Comments</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {selectedPost.comments.map((c, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              {c.text && <p>{c.text}</p>}
              {c.code && (
                <div>
                  <pre
                    style={{
                      backgroundColor: "#333",
                      color: "white",
                      padding: "10px",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {c.code}
                  </pre>
                  <button
                    onClick={() => handleCopyCode(c.code)}
                    style={{
                      padding: "5px",
                      backgroundColor: "#61dafb",
                      color: "white",
                      border: "none",
                    }}
                  >
                    Copy Code
                  </button>
                </div>
              )}
              <small>(by {c.user})</small>
            </li>
          ))}
        </ul>
        <textarea
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ width: "100%", padding: "5px", marginTop: "10px" }}
        />
        <button
          onClick={() => setCommentCode((prev) => (prev ? "" : "Write your code here..."))}
          style={{
            padding: "10px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            marginTop: "10px",
          }}
        >
          {commentCode ? "Close Code Editor" : "Add Code"}
        </button>
        {commentCode && (
          <textarea
            placeholder="Write your code here..."
            value={commentCode}
            onChange={(e) => setCommentCode(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "#333",
              color: "white",
              padding: "10px",
              marginTop: "10px",
            }}
          />
        )}
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
        <button
          onClick={() => handleDeletePost(selectedPost.id)}
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
    );
  }

  return null;
};

export default Board;
