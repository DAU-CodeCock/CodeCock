import React from 'react';

const Board = ({ boardPosts, setSelectedPost, showSection }) => (
    <div className="board-section">
        <h2>멘토링 게시판</h2>
        <button onClick={() => showSection('newPost')} className="write-button">
            글쓰기
        </button>
        <div className="articles">
            {boardPosts.map((post) => (
                <div key={post.id} className="article" onClick={() => setSelectedPost(post)}>
                    <p className="article-date">{post.date}</p>
                    <h3 className="article-title">{post.title}</h3>
                </div>
            ))}
        </div>
    </div>
);

export default Board;
