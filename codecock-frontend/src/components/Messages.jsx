import React from 'react';

const Messages = ({ messages, message, setMessage, setMessages }) => {
    const handleSendMessage = () => {
        if (message) {
            setMessages([...messages, message]);
            setMessage('');
        }
    };

    return (
        <div className="message-window">
            <h3>메시지</h3>
            <div className="message-list">
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지를 입력하세요"
            />
            <button onClick={handleSendMessage} className="send-button">
                전송
            </button>
        </div>
    );
};

export default Messages;
