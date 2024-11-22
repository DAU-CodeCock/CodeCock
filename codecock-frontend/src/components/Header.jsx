import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signOut } from "../firebase";

const Header = ({ setCurrentPage }) => {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <header
      style={{
        background: "#333",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* 왼쪽: 사이트 타이틀 */}
      <h1
        onClick={() => setCurrentPage("home")}
        style={{
          margin: 0,
          fontSize: "1.5rem",
          cursor: "pointer",
          transition: "color 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.color = "#61dafb")}
        onMouseOut={(e) => (e.target.style.color = "white")}
      >
        My Website
      </h1>

      {/* 중앙: 네비게이션 메뉴 */}
      <nav>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "20px",
            margin: 0,
            padding: 0,
          }}
        >
          {["Home", "Board", "My Page", "Match"].map((page) => (
            <li key={page}>
              <button
                onClick={() => setCurrentPage(page.toLowerCase().replace(" ", ""))}
                style={{
                  background: "none",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                  transition: "color 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.color = "#61dafb")}
                onMouseOut={(e) => (e.target.style.color = "white")}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* 오른쪽: 로그인/로그아웃 */}
      <div>
        {user ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
          >
            <p
              style={{
                margin: 0,
                cursor: "pointer",
                transition: "color 0.3s",
              }}
              onClick={() => setCurrentPage("mypage")}
              onMouseOver={(e) => (e.target.style.color = "#61dafb")}
              onMouseOut={(e) => (e.target.style.color = "white")}
            >
              Welcome, {user.displayName}!
            </p>
            <button
              onClick={handleLogout}
              style={{
                cursor: "pointer",
                background: "#61dafb",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#4dabdb")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#61dafb")}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            style={{
              cursor: "pointer",
              background: "#61dafb",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#4dabdb")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#61dafb")}
          >
            Login with Google
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;