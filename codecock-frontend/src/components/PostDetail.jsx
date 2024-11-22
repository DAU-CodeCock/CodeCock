import React from 'react';

const PostDetail = ({ post, setSelectedPost, showSection }) => {
    const handleAddComment = (comment) => {
        setSelectedPost((prevPost) => ({
            ...prevPost,
            comments: [...prevPost.comments, comment],
        }));
    };

    return (
        <div className="post-detail-section">
            <h2>{post.title}</h2>
            <p className="post-date">{post.date}</p>
            <p>{post.content}</p>
            <h3>댓글</h3>
            <ul className="comments-list">
                {post.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="댓글을 입력하세요"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddComment(e.target.value);
                }}
            />
            <button onClick={() => showSection('board')} className="back-button">
                게시판으로 돌아가기
            </button>
        </div>
    );
};

export default PostDetail;
