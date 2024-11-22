import React from 'react';

const Home = ({ showSection }) => (
    <div className="home-section">
        <h1>당신의 코딩 동반자, CodeCompanion</h1>
        <p>초보자와 멘토가 함께 성장할 수 있는 최고의 멘토링 플랫폼</p>
        <div className="home-buttons">
            <button onClick={() => showSection('mentorList')} className="main-button">
                멘토 찾기
            </button>
            <button onClick={() => showSection('menteeList')} className="main-button">
                멘티 찾기
            </button>
        </div>
    </div>
);

export default Home;
