import React, { useState } from "react";

// MessagePopup Component with Screen Share and Mic Toggle
const MessagePopup = (chatPartner) => {
  const popupWindow = window.open(
    "",
    "_blank",
    "width=600,height=600,resizable,scrollbars"
  );

  if (popupWindow) {
    popupWindow.document.write(`
      <html>
        <head>
          <title>Chat with ${chatPartner}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f9f9f9;
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
              flex: 1;
              padding: 10px;
              overflow-y: auto;
              height: calc(100% - 150px);
            }
            .footer {
              display: flex;
              gap: 10px;
              padding: 10px;
              border-top: 1px solid #ddd;
              position: absolute;
              bottom: 0;
              width: 100%;
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
          </style>
        </head>
        <body>
          <div class="header">
            Chat with ${chatPartner}
            <button id="closeButton" style="background: none; border: none; color: white; font-size: 16px; cursor: pointer;">✕</button>
          </div>
          <div class="chat" id="chatContainer"></div>
          <div class="footer">
            <input type="text" id="messageInput" placeholder="Type a message..." />
            <button id="sendButton">Send</button>
            <button id="micToggleButton">Mic On</button>
            <button id="screenShareButton">Share Screen</button>
          </div>
        </body>
      </html>
    `);

    const chatContainer = popupWindow.document.getElementById("chatContainer");
    const messageInput = popupWindow.document.getElementById("messageInput");
    const sendButton = popupWindow.document.getElementById("sendButton");
    const closeButton = popupWindow.document.getElementById("closeButton");
    const micToggleButton = popupWindow.document.getElementById("micToggleButton");
    const screenShareButton = popupWindow.document.getElementById("screenShareButton");

    let isMicOn = true;
    let screenStream = null;

    sendButton.onclick = () => {
      const message = messageInput.value.trim();
      if (message) {
        const messageElement = document.createElement("div");
        messageElement.textContent = `Me: ${message}`;
        chatContainer.appendChild(messageElement);
        messageInput.value = "";
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    };

    micToggleButton.onclick = () => {
      isMicOn = !isMicOn;
      micToggleButton.textContent = isMicOn ? "Mic On" : "Mic Off";
    };

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

        screenShareButton.textContent = "Stop Sharing";
      } catch (error) {
        console.error("Screen sharing error:", error);
      }
    };

    const stopScreenSharing = () => {
      if (screenStream) {
        screenStream.getTracks().forEach((track) => track.stop());
        screenStream = null;
        screenShareButton.textContent = "Share Screen";
      }
    };

    screenShareButton.onclick = () => {
      if (!screenStream) {
        startScreenSharing();
      } else {
        stopScreenSharing();
      }
    };

    closeButton.onclick = () => {
      if (screenStream) stopScreenSharing();
      popupWindow.close();
    };
  } else {
    alert("Popup was blocked. Please allow popups for this site.");
  }
};

// Applications Component
const Applications = () => {
  const [applications, setApplications] = useState([
    { id: 1, name: "John Doe", status: "Pending", mentoringEnded: false },
    { id: 2, name: "Jane Smith", status: "Pending", mentoringEnded: false },
  ]);
  const [uploadedFiles, setUploadedFiles] = useState({});

  const handleApprove = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "Approved" } : app
      )
    );
  };

  const handleReject = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "Rejected" } : app
      )
    );
  };

  const handleMentoringEnd = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, mentoringEnded: true } : app
      )
    );
  };

  const handleFileUpload = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles((prev) => ({ ...prev, [id]: file.name }));
    }
  };

  const handleFileSubmit = (id) => {
    if (uploadedFiles[id]) {
      alert(`Mentoring for ${applications.find((app) => app.id === id).name} has been completed with file "${uploadedFiles[id]}"!`);
    } else {
      alert("Please upload a file before submitting.");
    }
  };

  return (
    <div>
      <h3>Applications</h3>
      {applications.map((app) => (
        <div
          key={app.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>
            <strong>{app.name}</strong>
          </p>
          <p>Status: {app.status}</p>
          {app.status === "Pending" && (
            <div>
              <button
                onClick={() => handleApprove(app.id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  marginRight: "10px",
                }}
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(app.id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                }}
              >
                Reject
              </button>
            </div>
          )}
          {app.status === "Approved" && (
            <div>
              <button
                onClick={() => MessagePopup(app.name)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "blue",
                  color: "white",
                  border: "none",
                  marginRight: "10px",
                }}
              >
                Message
              </button>
              {!app.mentoringEnded && (
                <button
                  onClick={() => handleMentoringEnd(app.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "orange",
                    color: "white",
                    border: "none",
                  }}
                >
                  End Mentoring
                </button>
              )}
              {app.mentoringEnded && (
                <div>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(app.id, e)}
                    style={{ marginTop: "10px" }}
                  />
                  <button
                    onClick={() => handleFileSubmit(app.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                      marginTop: "10px",
                    }}
                  >
                    Upload
                  </button>
                  {uploadedFiles[app.id] && (
                    <p>Uploaded File: {uploadedFiles[app.id]}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Applications;
