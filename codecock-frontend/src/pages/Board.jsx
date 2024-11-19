import PropTypes from 'prop-types';

function Board({ onViewPost }) {
    const posts = [
        { id: 1, title: '첫 번째 게시글', content: '내용입니다.' },
        { id: 2, title: '두 번째 게시글', content: '내용입니다.' },
    ];

    return (
        <div className="board-section">
            <h2>게시판</h2>
            <div className="articles">
                {posts.map((post) => (
                    <div className="article" key={post.id} onClick={() => onViewPost(post)}>
                        <div className="article-content">
                            <div className="article-date">{post.date}</div>
                            <div className="article-title">{post.title}</div>
                            <div className="article-description">{post.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

Board.propTypes = {
    onViewPost: PropTypes.func.isRequired,
};

export default Board;
