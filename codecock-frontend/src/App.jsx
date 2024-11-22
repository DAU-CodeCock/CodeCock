import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MentorList from './components/MentorList';
import MenteeList from './components/MenteeList';
import MyPage from './components/MyPage';
import Profile from './components/Profile';
import Board from './components/Board';
import PostDetail from './components/PostDetail';
import NewPost from './components/NewPost';
import Messages from './components/Messages';
import MessageIcon from './components/MessageIcon';

function App() {
    const [section, setSection] = useState('home');
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [myPageData, setMyPageData] = useState({
        profile: { name: '홍길동', role: '멘토', specialty: 'JavaScript 전문가' },
        myLectures: ['React 기초 강의', 'Node.js 실전 프로젝트'],
        appliedMentees: [],
        receivedMentees: []
    });
    const [message, setMessage] = useState('');
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [boardPosts, setBoardPosts] = useState([
        {
            id: 1,
            date: '13/06/2021',
            title: '멘토링에 필요한 기본 준비물은?',
            content: '멘토링을 시작하기 전에 필요한 기본 준비물과 준비 사항에 대해 논의해봅시다.',
            category: '학습 자료',
            comments: ['좋은 내용이네요!', '많이 도움이 되었습니다.']
        },
        {
            id: 2,
            date: '10/06/2021',
            title: '멘티와의 소통 방법',
            content: '멘티와 어떻게 효과적으로 소통할 수 있을지에 대한 의견을 공유해주세요.',
            category: '멘토링 팁',
            comments: ['공감합니다!', '멘티와의 소통이 정말 중요하죠.']
        }
    ]);
    const [selectedPost, setSelectedPost] = useState(null);

    const showSection = (sectionId) => {
        setSection(sectionId);
        setSelectedProfile(null);
        setSelectedPost(null);
    };

    const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

    return (
        <div className="App">
            <MessageIcon toggleMessage={() => setIsMessageOpen(!isMessageOpen)} />
            {isMessageOpen && (
                <Messages
                    messages={messages}
                    message={message}
                    setMessage={setMessage}
                    setMessages={setMessages}
                />
            )}
            <Navbar isLoggedIn={isLoggedIn} toggleLogin={toggleLogin} showSection={showSection} />
            {section === 'home' && <Home showSection={showSection} />}
            {section === 'mentorList' && (
                <MentorList
                    searchTerm={searchTerm}
                    filter={filter}
                    setSearchTerm={setSearchTerm}
                    setFilter={setFilter}
                    showSection={showSection}
                    setSelectedProfile={setSelectedProfile}
                />
            )}
            {section === 'menteeList' && (
                <MenteeList showSection={showSection} setSelectedProfile={setSelectedProfile} />
            )}
            {section === 'myPage' && <MyPage myPageData={myPageData} />}
            {section === 'profile' && selectedProfile && (
                <Profile
                    profile={selectedProfile}
                    myPageData={myPageData}
                    setMyPageData={setMyPageData}
                    showSection={showSection}
                />
            )}
            {section === 'board' && (
                <Board boardPosts={boardPosts} setSelectedPost={setSelectedPost} showSection={showSection} />
            )}
            {selectedPost && (
                <PostDetail post={selectedPost} setSelectedPost={setSelectedPost} showSection={showSection} />
            )}
            {section === 'newPost' && (
                <NewPost boardPosts={boardPosts} setBoardPosts={setBoardPosts} showSection={showSection} />
            )}
        </div>
    );
}

export default App;
