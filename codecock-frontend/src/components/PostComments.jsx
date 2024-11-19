import PropTypes from 'prop-types';
import { useState } from 'react';

function PostComments({ comments, onAddComment }) {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim()) {
            onAddComment(newComment);
            setNewComment('');
        }
    };

    return (
        <div className="comments-section">
            <h3>댓글</h3>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요"
            />
            <button onClick={handleAddComment}>댓글 추가</button>
        </div>
    );
}

PostComments.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.string).isRequired,
    onAddComment: PropTypes.func.isRequired,
};

export default PostComments;
