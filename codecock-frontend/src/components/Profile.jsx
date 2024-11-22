import React from 'react';

const Profile = ({ profile, myPageData, setMyPageData, showSection }) => {
    const applyForMentorship = () => {
        if (profile.role === 'mentee') {
            setMyPageData((prevData) => ({
                ...prevData,
                appliedMentees: [...prevData.appliedMentees, profile],
            }));
        } else if (profile.role === 'mentor') {
            setMyPageData((prevData) => ({
                ...prevData,
                receivedMentees: [...prevData.receivedMentees, profile],
            }));
        }
        alert(`${profile.name}님에게 성공적으로 지원했습니다!`);
        showSection('myPage');
    };

    return (
        <div className="profile-section">
            <h2>{profile.role === 'mentor' ? '멘토 프로필' : '멘티 프로필'}</h2>
            <h3>{profile.name}</h3>
            <p><strong>전문 분야:</strong> {profile.specialty || profile.level}</p>
            <p><strong>소개:</strong> {profile.bio}</p>
            <p><strong>{profile.role === 'mentor' ? '보유 기술' : '관심 분야'}:</strong></p>
            <ul>
                {(profile.skills || profile.interests).map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
            </ul>
            <button onClick={applyForMentorship} className="apply-button">지원하기</button>
            <span
                className="back-button"
                onClick={() => showSection(profile.role === 'mentor' ? 'mentorList' : 'menteeList')}
            >
                목록으로 돌아가기
            </span>
        </div>
    );
};

export default Profile;
