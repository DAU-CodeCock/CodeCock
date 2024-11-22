import React, { useState } from "react";
import Message from './Message';

const defaultApplications = [
  {
    id: 1,
    name: "Mentor John",
    description: "React 및 JavaScript 멘토링 신청",
    status: "Pending",
  },
  {
    id: 2,
    name: "Mentee Jane",
    description: "Frontend 프로젝트 협업 신청",
    status: "Approved",
  },
];

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

const Profile = () => {
  const [formData, setFormData] = useState({
    displayName: "Default User",
    email: "defaultuser@example.com",
    role: "mentee",
  });
  const [editMode, setEditMode] = useState(false);
  const [applications, setApplications] = useState(defaultApplications);
  const [activeChat, setActiveChat] = useState(null);
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

      {showTestPage && (
        <MentorTestPage onTestComplete={handleTestCompletion} />
      )}

      {/* 애플리케이션 및 메시지 */}
      {!showTestPage && (
        <div style={{ marginTop: "40px" }}>
          <h3>Applications</h3>
          {applications.length === 0 ? (
            <p>No applications yet.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {applications.map((app) => (
                <li
                  key={app.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "15px",
                    borderRadius: "5px",
                    marginBottom: "10px",
                  }}
                >
                  <p>
                    <strong>{app.name}</strong>: {app.description}
                  </p>
                  <p>Status: {app.status}</p>
                  {app.status === "Approved" && (
                    <button
                      onClick={() => setActiveChat(app.name)}
                      style={{
                        backgroundColor: "#61dafb",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "3px",
                        cursor: "pointer",
                        marginTop: "10px",
                      }}
                    >
                      Message
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
          {activeChat && (
            <Message
              chatPartner={activeChat}
              onClose={() => setActiveChat(null)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;