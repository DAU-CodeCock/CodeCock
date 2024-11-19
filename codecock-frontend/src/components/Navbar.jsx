import PropTypes from 'prop-types';

function Navbar({ onSectionChange }) {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <button onClick={() => onSectionChange('home')}>CodeCompanion</button>
            </div>
            <div className="navbar-links">
                <button onClick={() => onSectionChange('board')}>게시판</button>
                <button onClick={() => onSectionChange('myPage')}>My Page</button>
            </div>
        </nav>
    );
}

Navbar.propTypes = {
    onSectionChange: PropTypes.func.isRequired,
};

export default Navbar;
