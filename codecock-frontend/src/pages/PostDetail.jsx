import PropTypes from 'prop-types';
import PostComments from '../components/PostComments';

function PostDetail({ post, onBack }) {
    const handleAddComment = (comment) => {
        post.comments.push(comment); // 로컬에서만 업데이트
    };

    return (
        <div className="post-detail">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <PostComments comments={post.comments} onAddComment={handleAddComment} />
            <button onClick={onBack}>뒤로 가기</button>
        </div>
    );
}

PostDetail.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        comments: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    onBack: PropTypes.func.isRequired,
};

export default PostDetail;
