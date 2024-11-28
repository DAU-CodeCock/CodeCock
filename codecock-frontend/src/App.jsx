import React, { useState } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import Main from './components/Main';
import Profile from './components/Profile';
import MatchPage from './components/MatchPage';
import Login from './components/Login'; // Login 컴포넌트 추가

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 초기 상태는 로그아웃
  const [currentPage, setCurrentPage] = useState('home'); // 초기 페이지는 메인 페이지

  // 로그인 성공 후 처리 함수
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('home'); // 로그인 성공 시 홈 페이지로 이동
  };

  // 로그아웃 처리 함수
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home'); // 로그아웃 후 홈 페이지로 이동
    localStorage.removeItem("authToken"); // 로그아웃 시 토큰 삭제
  };

  // 현재 페이지 렌더링
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Main />;
      case 'board':
        return <Board />;
      case 'mypage':
        return <Profile />;
      case 'match':
        return <MatchPage />;
      case 'login':
        return <Login onLoginSuccess={handleLoginSuccess} />;
      default:
        return <Main />;
    }
  };

  return (
    <div>
      {/* 로그인 상태에 따라 Header 표시 */}
      <Header
        setCurrentPage={setCurrentPage}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      {renderPage()}
    </div>
  );
};

export default App;
