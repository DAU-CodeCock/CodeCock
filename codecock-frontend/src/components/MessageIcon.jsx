import React from 'react';

const MessageIcon = ({ toggleMessage }) => (
    <div className="message-icon" onClick={toggleMessage}>
        💬
    </div>
);

export default MessageIcon;
