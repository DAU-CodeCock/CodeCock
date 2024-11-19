import { useState } from 'react';

function MessageWindow() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages((prev) => [...prev, message]);
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
            <button onClick={handleSendMessage} className="send-button">전송</button>
        </div>
    );
}

export default MessageWindow;
