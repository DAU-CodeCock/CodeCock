import React from "react";
import "./Main.css";

const Main = () => {
  const handleLogin = async () => {
    alert("성공적으로 로그인되었습니다!");
  };

  return (
    <div className="main-container">
      <header className="main-header">
        <h1 className="main-title">CodeCock</h1>
        <p className="main-subtitle">Unite. Learn. Grow.</p>
      </header>

      <section className="main-features">
        <h2>Why CodeCock?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Connect</h3>
            <p>멘토, 멘티, 동료들과 협력하여 흥미로운 프로젝트를 진행하세요.</p>
          </div>
          <div className="feature-card">
            <h3>Learn</h3>
            <p>전문가의 도움을 받아 기술을 향상시키고 커뮤니티 지원을 받으세요.</p>
          </div>
          <div className="feature-card">
            <h3>Grow</h3>
            <p>네트워크를 구축하고 지식을 공유하며 더 많은 기회를 만드세요.</p>
          </div>
        </div>
      </section>

      <footer className="main-footer">
        <p>© 2024 CodeCock</p>
      </footer>

      <div className="background-animation">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Main;