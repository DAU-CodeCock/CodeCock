import React from 'react';

const Navbar = ({ isLoggedIn, toggleLogin, showSection }) => (
    <nav className="navbar">
        <div className="navbar-logo">CodeCompanion</div>
        <div className="navbar-links">
            <button onClick={() => showSection('home')}>홈</button>
            <button onClick={() => showSection('board')}>게시판</button>
            <button onClick={() => showSection('myPage')}>My Page</button>
            <button onClick={toggleLogin}>{isLoggedIn ? '로그아웃' : '로그인'}</button>
        </div>
    </nav>
);

export default Navbar;
