import PropTypes from 'prop-types';
import { useState } from 'react';

function NewPost({ onBack }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handlePost = () => {
        if (title.trim() && content.trim()) {
            // 실제로는 API 호출 후 성공적으로 게시글 생성 처리
            alert('게시글이 성공적으로 등록되었습니다!');
            onBack();
        }
    };

    return (
        <div className="new-post">
            <h2>새 게시글 작성</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용"
            ></textarea>
            <button onClick={handlePost}>게시글 등록</button>
            <button onClick={onBack}>취소</button>
        </div>
    );
}

NewPost.propTypes = {
    onBack: PropTypes.func.isRequired,
};

export default NewPost;
