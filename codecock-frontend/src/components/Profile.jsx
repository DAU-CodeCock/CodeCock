import React, { useState } from "react";

// MessagePopup Component
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

    popupWindow.onload = () => {
      const chatContainer = popupWindow.document.getElementById("chatContainer");
      const messageInput = popupWindow.document.getElementById("messageInput");
      const sendButton = popupWindow.document.getElementById("sendButton");
      const micToggleButton = popupWindow.document.getElementById("micToggleButton");
      const screenShareButton = popupWindow.document.getElementById("screenShareButton");
      const closeButton = popupWindow.document.getElementById("closeButton");

      let isMicOn = true;
      let screenStream = null;

      sendButton.onclick = () => {
        const message = messageInput.value.trim();
        if (message) {
          const messageElement = popupWindow.document.createElement("div");
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

          const videoElement = popupWindow.document.createElement("video");
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
    };
  } else {
    alert("Popup was blocked. Please allow popups for this site.");
  }
};

// Applications Component
const Applications = ({ applications, onApprove, onReject, onMentoringEnd, uploadedFiles, onFileUpload, onFileSubmit }) => {
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
                onClick={() => onApprove(app.id)}
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
                onClick={() => onReject(app.id)}
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
                  onClick={() => onMentoringEnd(app.id)}
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
                    onChange={(e) => onFileUpload(app.id, e)}
                    style={{ marginTop: "10px" }}
                  />
                  <button
                    onClick={() => onFileSubmit(app.id)}
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

// MentorTestPage Component
const MentorTestPage = ({ onTestComplete }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      question: "What is the use of useState in React?",
      options: [
        "To manage component state",
        "To fetch data from an API",
        "To style components",
        "To optimize performance",
      ],
      correctAnswer: "To manage component state",
    },
    {
      id: 2,
      question: "What does `let arr = [1, 2, 3]; arr.push(4);` do?",
      options: [
        "Creates a new array",
        "Adds 4 to the array",
        "Removes the first element",
        "Throws an error",
      ],
      correctAnswer: "Adds 4 to the array",
    },
    {
      id: 3,
      question: "What is the output of `typeof null` in JavaScript?",
      options: ["null", "object", "undefined", "string"],
      correctAnswer: "object",
    },
  ];

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    setScore((correctCount / questions.length) * 100);
    setSubmitted(true);

    if (correctCount === questions.length) {
      onTestComplete(true);
    } else {
      onTestComplete(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Mentor Qualification Test</h2>
      {submitted ? (
        <div>
          <h3>Your Score: {score}%</h3>
          {score === 100 ? (
            <p>Congratulations! You have passed the test!</p>
          ) : (
            <p>Sorry, you did not pass. Please try again later.</p>
          )}
        </div>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          {questions.map((q) => (
            <div key={q.id} style={{ marginBottom: "20px" }}>
              <p>{q.question}</p>
              {q.options.map((option) => (
                <label key={option} style={{ display: "block" }}>
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={option}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                    }
                    style={{ marginRight: "10px" }}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button
            type="button"
            onClick={handleSubmit}
            style={{
              backgroundColor: "#61dafb",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit Test
          </button>
        </form>
      )}
    </div>
  );
};

// Profile Component
const Profile = () => {
  const [formData, setFormData] = useState({
    displayName: "Default User",
    email: "defaultuser@example.com",
    role: "mentee",
    bio: "This is a default bio.",
  });
  const [editMode, setEditMode] = useState(false);
  const [applications, setApplications] = useState([
    { id: 1, name: "John Doe", status: "Pending", mentoringEnded: false },
    { id: 2, name: "Jane Smith", status: "Pending", mentoringEnded: false },
  ]);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [isMentorApproved, setIsMentorApproved] = useState(false);
  const [showTestPage, setShowTestPage] = useState(false);

  const handleRoleChange = (newRole) => {
    if (newRole === "mentor" && !isMentorApproved) {
      setShowTestPage(true);
    } else {
      setFormData((prev) => ({ ...prev, role: newRole }));
    }
  };

  const handleTestCompletion = (passed) => {
    setShowTestPage(false);
    if (passed) {
      setIsMentorApproved(true);
      setFormData((prev) => ({ ...prev, role: "mentor" }));
    } else {
      alert("Test failed. You cannot become a mentor at this time.");
    }
  };

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
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>My Profile</h2>

      {/* 프로필 정보 */}
      <div style={{ marginBottom: "20px" }}>
        {editMode ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEditMode(false);
            }}
          >
            <label style={{ display: "block", marginBottom: "10px" }}>
              Display Name:
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    displayName: e.target.value,
                  }))
                }
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              />
            </label>
            <label style={{ display: "block", marginBottom: "10px" }}>
              Email:
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              />
            </label>
            <label style={{ display: "block", marginBottom: "10px" }}>
              Bio:
              <input
                type="text"
                value={formData.bio}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bio: e.target.value,
                  }))
                }
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              />
            </label>
            <button
              type="submit"
              style={{
                backgroundColor: "#61dafb",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </form>
        ) : (
          <>
            <p>
              <strong>Display Name:</strong> {formData.displayName}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Bio:</strong> {formData.bio}
            </p>
            <button
              onClick={() => setEditMode(true)}
              style={{
                backgroundColor: "#61dafb",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Edit Profile
            </button>
          </>
        )}
      </div>

      {/* 역할 변경 */}
      <div>
        <p>
          <strong>Current Role:</strong>{" "}
          {formData.role === "mentor" ? "Mentor" : "Mentee"}
        </p>
        <div>
          <button
            onClick={() => handleRoleChange("mentee")}
            style={{
              backgroundColor: formData.role === "mentee" ? "gray" : "#61dafb",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Mentee
          </button>
          <button
            onClick={() => handleRoleChange("mentor")}
            style={{
              backgroundColor: formData.role === "mentor" ? "gray" : "#61dafb",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Mentor
          </button>
        </div>
      </div>
      {showTestPage && <MentorTestPage onTestComplete={handleTestCompletion} />}

      {/* Applications */}
      <Applications
        applications={applications}
        onApprove={handleApprove}
        onReject={handleReject}
        onMentoringEnd={handleMentoringEnd}
        uploadedFiles={uploadedFiles}
        onFileUpload={handleFileUpload}
        onFileSubmit={handleFileSubmit}
      />
    </div>
  );
};

export default Profile;