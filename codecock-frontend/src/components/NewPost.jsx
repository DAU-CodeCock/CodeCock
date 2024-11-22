import React from 'react';

const NewPost = ({ boardPosts, setBoardPosts, showSection }) => {
    const handleNewPost = (title, content) => {
        const newPost = {
            id: boardPosts.length + 1,
            date: new Date().toLocaleDateString(),
            title,
            content,
            comments: [],
        };
        setBoardPosts([...boardPosts, newPost]);
        showSection('board');
    };

    return (
        <div className="new-post-section">
            <h2>새 글 작성</h2>
            <input type="text" placeholder="제목" id="postTitle" />
            <textarea placeholder="내용" id="postContent"></textarea>
            <button
                onClick={() =>
                    handleNewPost(
                        document.getElementById('postTitle').value,
                        document.getElementById('postContent').value
                    )
                }
                className="submit-button"
            >
                게시
            </button>
            <button onClick={() => showSection('board')} className="back-button">
                취소
            </button>
        </div>
    );
};

export default NewPost;
