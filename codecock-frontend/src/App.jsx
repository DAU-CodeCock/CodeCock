import React, { useState } from "react";
import Header from "./components/Header";
import Board from "./components/Board";
import Main from "./components/Main";
import Profile from "./components/Profile";

import MatchPage from "./components/MatchPage"; // MatchPage 추가

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    console.log("Current page:", currentPage); // 현재 페이지 값 확인
    switch (currentPage) {
      case "home":
        return <Main />;
      case "board":
        return <Board />;
      case "mypage":
        return <Profile />;

      case "match":
        return <MatchPage />; // MatchPage 연결
      default:
        return <Main />;
    }
  };

  return (
    <div>
      <Header setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

export default App;