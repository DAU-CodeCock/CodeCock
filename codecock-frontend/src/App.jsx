import React, { useState } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import Main from './components/Main';
import Profile from './components/Profile/Profile';
import MatchPage from './components/MatchPage';
import LoginSignup from './components/Login/Login';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); // 현재 페이지 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [user, setUser] = useState(null); // 로그인된 사용자 정보

  // 로그인 성공 처리
  const handleLoginSuccess = (loggedInUser) => {
    setIsLoggedIn(true);
    setUser(loggedInUser); // 사용자 정보 저장
    setCurrentPage('home'); // 로그인 성공 시 메인 화면으로 전환
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null); // 사용자 정보 초기화
    setCurrentPage('home'); // 로그아웃 후 메인 화면으로 전환
  };

  // 페이지 렌더링
  const renderPage = () => {
    if (currentPage === 'login') {
      return <LoginSignup onLoginSuccess={handleLoginSuccess} />;
    }
    switch (currentPage) {
      case 'home':
        return <Main />;
      case 'board':
        return <Board currentUser={user.username} />;
      case 'mypage':
        return <Profile user={user} />; // Profile에 사용자 정보 전달
      case 'match':
        return <MatchPage />;
      default:
        return <Main />;
    }
  };

  return (
    <div>
      <Header
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        user={user}
        handleLogout={handleLogout}
      />
      {renderPage()}
    </div>
  );
};

export default App;
