const MessagePopup = (chatPartner) => {
    const popupWindow = window.open(
        "",
        "_blank",
        "width=600,height=600,resizable,scrollbars"
    );

    if (popupWindow) {
        const popupContent = `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${chatPartner}와의 채팅</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            display: flex;
            flex-direction: column;
            height: 100vh;
          }
          .header {
            background-color: #61dafb;
            color: white;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .chat {
            flex-grow: 1;
            padding: 10px;
            overflow-y: auto;
            border: 1px solid #ddd;
            margin: 10px;
            background-color: #ffffff;
            font-size: 16px;
          }
          .footer {
            display: flex;
            gap: 10px;
            padding: 10px;
            border-top: 1px solid #ddd;
          }
          .footer input {
            flex: 1;
            padding: 5px;
            border: 1px solid #ddd;
            border-radius: 3px;
          }
          .footer button {
            padding: 5px 10px;
            background-color: #61dafb;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
          }
          .footer button.active {
            background-color: #007bff;
          }
          .code-editor {
            display: none;
            flex-grow: 1;
            background-color: #2d2d2d;
            color: #ffffff;
            font-family: monospace;
            padding: 10px;
            border: none;
            outline: none;
            resize: none;
            height: 100%;
          }
          .file-upload {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <span>${chatPartner}와의 채팅</span>
          <button id="closeButton" style="background: none; border: none; color: white; font-size: 16px; cursor: pointer;">✕</button>
        </div>
        <div id="chatContainer" class="chat">
          <p id="emptyMessage" style="color: #aaa;">채팅이 없습니다. 대화를 시작해보세요!</p>
        </div>
        <textarea id="codeEditor" class="code-editor" placeholder="여기에 코드를 입력하세요..."></textarea>
        <div class="footer">
          <input type="text" id="messageInput" placeholder="Type your message..." />
          <button id="sendButton">Send</button>
          <button id="codeModeButton">Code Add</button>
          <button id="micToggleButton">Mic On</button>
          <button id="screenShareButton">Screen Share</button>
        </div>
        <div class="file-upload">
          <input type="file" id="fileInput" />
          <button id="uploadFileButton">Upload</button>
        </div>
      </body>
      </html>
    `;

        popupWindow.document.write(popupContent);
        popupWindow.document.close();

        popupWindow.onload = () => {
            const chatContainer = popupWindow.document.getElementById("chatContainer");
            const messageInput = popupWindow.document.getElementById("messageInput");
            const sendButton = popupWindow.document.getElementById("sendButton");
            const fileInput = popupWindow.document.getElementById("fileInput");
            const uploadFileButton = popupWindow.document.getElementById("uploadFileButton");
            const codeModeButton = popupWindow.document.getElementById("codeModeButton");
            const codeEditor = popupWindow.document.getElementById("codeEditor");
            const micToggleButton = popupWindow.document.getElementById("micToggleButton");
            const screenShareButton = popupWindow.document.getElementById("screenShareButton");
            const emptyMessage = popupWindow.document.getElementById("emptyMessage");
            const closeButton = popupWindow.document.getElementById("closeButton");

            let inCodeMode = false;
            let isMicOn = false;
            let micStream = null;
            let isScreenSharing = false;
            let screenStream = null;

            // Helper Functions
            const updateChat = (message) => {
                if (emptyMessage) emptyMessage.style.display = "none";
                const messageElement = document.createElement("div");
                messageElement.innerHTML = message; // Use innerHTML for HTML content
                chatContainer.appendChild(messageElement);
                chatContainer.scrollTop = chatContainer.scrollHeight;
            };

            // Send button functionality
            sendButton.addEventListener("click", () => {
                const message = messageInput.value.trim();
                if (message) {
                    updateChat(`Me: ${message}`);
                    messageInput.value = "";
                }
            });

            // File upload functionality
            uploadFileButton.addEventListener("click", () => {
                const file = fileInput.files[0];
                if (file) {
                    const fileLink = `<a href="#" download="${file.name}">${file.name}</a>`;
                    updateChat(`File uploaded: ${fileLink}`);
                } else {
                    alert("Please select a file.");
                }
            });

            // Code mode toggle functionality
            codeModeButton.addEventListener("click", () => {
                inCodeMode = !inCodeMode;
                codeEditor.style.display = inCodeMode ? "block" : "none";
                messageInput.style.display = inCodeMode ? "none" : "block";
                sendButton.style.display = inCodeMode ? "none" : "block";
                codeModeButton.textContent = inCodeMode ? "Send Code" : "Code Add";

                if (!inCodeMode) {
                    const code = codeEditor.value.trim();
                    if (code) {
                        const codeMessage = `
                <pre style="background: #2d2d2d; color: #fff; padding: 10px; border-radius: 5px;">${code}</pre>
                <button style="margin-top: 5px;" onclick="navigator.clipboard.writeText(\`${code}\`).then(() => alert('Code copied!'));">Copy Code</button>
              `;
                        updateChat(codeMessage);
                        codeEditor.value = "";
                    }
                }
            });

            // Mic toggle functionality
            micToggleButton.addEventListener("click", async () => {
                if (!isMicOn) {
                    try {
                        micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                        micToggleButton.textContent = "Mic Off";
                        micToggleButton.classList.add("active");
                        updateChat("Microphone turned on.");
                        isMicOn = true;
                    } catch (error) {
                        alert("Failed to access microphone.");
                    }
                } else {
                    micStream.getTracks().forEach((track) => track.stop());
                    micToggleButton.textContent = "Mic On";
                    micToggleButton.classList.remove("active");
                    updateChat("Microphone turned off.");
                    isMicOn = false;
                }
            });

            // Screen sharing functionality
            const startScreenSharing = async () => {
                try {
                    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                    screenStream = stream;

                    const videoElement = document.createElement("video");
                    videoElement.srcObject = stream;
                    videoElement.autoplay = true;
                    videoElement.style.width = "100%";
                    videoElement.style.marginTop = "10px";

                    chatContainer.appendChild(videoElement);

                    stream.getVideoTracks()[0].onended = () => {
                        stopScreenSharing();
                    };

                    isScreenSharing = true;
                    screenShareButton.textContent = "Stop Sharing";
                } catch (error) {
                    alert("Screen sharing failed: " + error.message);
                }
            };

            const stopScreenSharing = () => {
                if (screenStream) {
                    screenStream.getTracks().forEach((track) => track.stop());
                    screenStream = null;
                }
                isScreenSharing = false;
                screenShareButton.textContent = "Screen Share";
            };

            screenShareButton.addEventListener("click", () => {
                if (!isScreenSharing) {
                    startScreenSharing();
                } else {
                    stopScreenSharing();
                }
            });

            // Close button functionality
            closeButton.addEventListener("click", () => {
                if (micStream) micStream.getTracks().forEach((track) => track.stop());
                if (screenStream) stopScreenSharing();
                popupWindow.close();
            });
        };
    } else {
        alert("Popups are blocked. Please allow popups for this site.");
    }
};

export default MessagePopup;
