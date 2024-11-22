import React from 'react';

const MenteeList = ({ showSection, setSelectedProfile }) => {
    const mentees = [
        { name: '유 멘티', level: '초급 JavaScript', bio: 'JavaScript 초보입니다.', interests: ['JavaScript', 'React'] },
        { name: '정 멘티', level: '중급 Python', bio: '데이터 분석에 관심이 있습니다.', interests: ['Python', 'Data Analysis'] },
    ];

    return (
        <div className="list-section">
            <h2>멘티 목록</h2>
            {mentees.map((mentee, index) => (
                <div
                    key={index}
                    className="list-item"
                    onClick={() => {
                        setSelectedProfile({ ...mentee, role: 'mentee' });
                        showSection('profile');
                    }}
                >
                    <h3>{mentee.name} - {mentee.level}</h3>
                    <p>{mentee.bio}</p>
                </div>
            ))}
            <span className="back-button" onClick={() => showSection('home')}>홈으로 돌아가기</span>
        </div>
    );
};

export default MenteeList;
