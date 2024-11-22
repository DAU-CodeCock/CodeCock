import React from 'react';

const MyPage = ({ myPageData }) => (
    <div className="my-page-section">
        <h2>My Page</h2>
        <div className="profile-container">
            <h3>내 프로필</h3>
            <p><strong>이름:</strong> {myPageData.profile.name}</p>
            <p><strong>역할:</strong> {myPageData.profile.role}</p>
            <p><strong>전문 분야:</strong> {myPageData.profile.specialty}</p>
        </div>
        <div className="profile-container">
            <h3>내 강의</h3>
            <ul>
                {myPageData.myLectures.map((lecture, index) => (
                    <li key={index}>{lecture}</li>
                ))}
            </ul>
        </div>
        <div className="profile-container">
            <h3>지원한 멘티 목록</h3>
            <ul>
                {myPageData.appliedMentees.map((mentee, index) => (
                    <li key={index}>{mentee.name} - {mentee.level}</li>
                ))}
            </ul>
        </div>
        <div className="profile-container">
            <h3>제의받은 멘티 목록</h3>
            <ul>
                {myPageData.receivedMentees.map((mentor, index) => (
                    <li key={index}>{mentor.name} - {mentor.specialty}</li>
                ))}
            </ul>
        </div>
    </div>
);

export default MyPage;
