import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MessageWindow from './components/MessageWindow';
import Home from './pages/Home';
import Board from './pages/Board';
import PostDetail from './pages/PostDetail';
import NewPost from './pages/NewPost';
import MyPage from './pages/MyPage';
import './App.css';

function App() {
    const [section, setSection] = useState('home');
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isMessageOpen, setIsMessageOpen] = useState(false);

    const toggleMessage = () => setIsMessageOpen(!isMessageOpen);

    const handleViewProfile = (profile) => {
        setSelectedProfile(profile);
        setSection('profile');
    };

    const handleViewPost = (post) => {
        setSelectedPost(post);
        setSection('postDetail');
    };

    return (
        <div className="App">
            <Navbar onSectionChange={setSection} />
            <div className="message-icon" onClick={toggleMessage}>💬</div>
            {isMessageOpen && <MessageWindow />}
            {section === 'home' && <Home onViewProfile={handleViewProfile} />}
            {section === 'board' && <Board onViewPost={handleViewPost} />}
            {section === 'postDetail' && selectedPost && (
                <PostDetail post={selectedPost} onBack={() => setSection('board')} />
            )}
            {section === 'newPost' && <NewPost onBack={() => setSection('board')} />}
            {section === 'myPage' && <MyPage />}
            {section === 'profile' && selectedProfile && (
                <ProfileSection profile={selectedProfile} onBack={() => setSection('home')} />
            )}
        </div>
    );
}

export default App;
