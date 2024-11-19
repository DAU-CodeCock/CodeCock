import PropTypes from 'prop-types';

function Home({ onViewProfile }) {
    const mentors = [
        { name: '김 멘토', specialty: 'JavaScript 전문가', bio: 'React 전문가입니다.' },
        { name: '이 멘토', specialty: 'Node.js 전문가', bio: '백엔드 개발자입니다.' },
    ];

    return (
        <div className="home-section">
            <h1>CodeCompanion</h1>
            <h2>멘토 목록</h2>
            {mentors.map((mentor, index) => (
                <div key={index} onClick={() => onViewProfile(mentor)}>
                    <h3>{mentor.name} - {mentor.specialty}</h3>
                    <p>{mentor.bio}</p>
                </div>
            ))}
        </div>
    );
}

Home.propTypes = {
    onViewProfile: PropTypes.func.isRequired,
};

export default Home;
