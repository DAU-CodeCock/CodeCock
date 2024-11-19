function MyPage() {
    const myPageData = {
        profile: { name: '홍길동', role: '멘토', specialty: 'JavaScript 전문가' },
        myLectures: ['React 기초 강의', 'Node.js 실전 프로젝트'],
        appliedMentees: [],
        receivedMentees: [],
    };

    return (
        <div className="my-page">
            <h2>My Page</h2>
            <div>
                <h3>내 프로필</h3>
                <p>이름: {myPageData.profile.name}</p>
                <p>역할: {myPageData.profile.role}</p>
                <p>전문 분야: {myPageData.profile.specialty}</p>
            </div>
            <div>
                <h3>내 강의</h3>
                <ul>
                    {myPageData.myLectures.map((lecture, index) => (
                        <li key={index}>{lecture}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MyPage;
