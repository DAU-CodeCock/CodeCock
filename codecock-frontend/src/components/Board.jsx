import React, { useState, useEffect } from "react";
import axios from "axios";

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [currentView, setCurrentView] = useState("list"); // "list", "write", "view"
  const [selectedPost, setSelectedPost] = useState(null); // 현재 선택된 글
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [code, setCode] = useState("");
  const [comment, setComment] = useState("");
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("title"); // "title" or "content"
  const API_URL = "http://localhost:8080/api/boards";

  // 토큰에서 사용자 정보 추출
  const getCurrentUser = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const userData = JSON.parse(token);
        return userData;
      } catch (error) {
        console.error("Failed to parse auth token:", error);
        return null;
      }
    }
    return null;
  };

  const currentUser = getCurrentUser();

  // 모든 게시물 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/all`);
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // 게시물 추가
  const handleAddPost = async () => {
    if (!title || !content) {
      alert("Title and content cannot be empty.");
      return;
    }

    if (!currentUser) {
      alert("You need to be logged in to create a post.");
      return;
    }

    const newPost = {
      title,
      content,
      code,
      userId: currentUser.userId, // 사용자 ID 추가
    };

    try {
      const response = await axios.post(`${API_URL}/create`, newPost);
      setPosts((prevPosts) => [response.data, ...prevPosts]);
      setTitle("");
      setContent("");
      setCode("");
      setShowCodeEditor(false);
      setCurrentView("list"); // 글쓰기 후 목록으로 이동
    } catch (error) {
      console.error("Failed to add post:", error);
    }
  };

  // 게시물 좋아요
  const handleLikePost = async (postId) => {
    if (!currentUser) {
      alert("You need to be logged in to like a post.");
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/${postId}/like`, {
        userId: currentUser.userId,
      });
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? response.data : post))
      );
    } catch (error) {
      console.error("Failed to like the post:", error);
    }
  };

  // 댓글 추가
  const handleAddComment = async (postId) => {
    if (!comment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    if (!currentUser) {
      alert("You need to be logged in to comment.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/${postId}/comments`, {
        text: comment,
        user: currentUser.username,
      });
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? response.data : post))
      );
      setComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

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
          {posts
            .filter((post) => {
              if (filter === "title") {
                return post.title
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
              } else if (filter === "content") {
                return post.content
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
              }
              return true;
            })
            .map((post) => (
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
                  ❤️ {post.likes} 💬{" "}
                  {post.comments ? post.comments.length : 0}
                </p>
              </li>
            ))}
        </ul>
      </div>
    );
  }

  // 나머지 코드 (글쓰기, 게시글 보기 등)도 동일한 방식으로 currentUser 정보 사용
  // ...

  return null;
};

export default Board;
