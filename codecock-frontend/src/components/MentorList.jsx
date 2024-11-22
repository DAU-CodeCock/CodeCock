import React from 'react';

const MentorList = ({ searchTerm, filter, setSearchTerm, setFilter, showSection, setSelectedProfile }) => {
    const mentors = [
        { name: '김 멘토', specialty: 'JavaScript 전문가', bio: 'JavaScript와 React 전문가입니다.', skills: ['JavaScript', 'React', 'Node.js'] },
        { name: '이 멘토', specialty: 'React 전문가', bio: '프론트엔드 전문가입니다.', skills: ['React', 'HTML/CSS', 'Redux'] },
    ];

    const filteredMentors = mentors.filter((mentor) => {
        const matchesSearch = mentor.name.includes(searchTerm) || mentor.specialty.includes(searchTerm);
        return matchesSearch && (filter === 'all' || mentor.skills.includes(filter));
    });

    return (
        <div className="list-section">
            <h2>멘토 목록</h2>
            <div>
                <input
                    type="text"
                    placeholder="멘토 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">모든 스킬</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="React">React</option>
                    <option value="Node.js">Node.js</option>
                </select>
            </div>
            {filteredMentors.map((mentor, index) => (
                <div
                    key={index}
                    className="list-item"
                    onClick={() => {
                        setSelectedProfile({ ...mentor, role: 'mentor' });
                        showSection('profile');
                    }}
                >
                    <h3>{mentor.name} - {mentor.specialty}</h3>
                    <p>{mentor.bio}</p>
                </div>
            ))}
            <span className="back-button" onClick={() => showSection('home')}>홈으로 돌아가기</span>
        </div>
    );
};

export default MentorList;
