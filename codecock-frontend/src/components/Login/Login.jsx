import React, { useState } from "react";
import dummyUsers from "./login.json";

const LoginSignup = ({ onLoginSuccess }) => {
  const [view, setView] = useState("login"); // 'login', 'signup'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userStatus, setUserStatus] = useState("mentor");
  const [errorMessage, setErrorMessage] = useState("");
  const [users, setUsers] = useState(dummyUsers); // 더미 사용자 데이터

  // 로그인 처리 함수
  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      localStorage.setItem("authToken", JSON.stringify(user)); // 사용자 정보 저장
      setErrorMessage(""); // 로그인 성공 시 오류 메시지 초기화
      onLoginSuccess(user); // 부모 컴포넌트로 사용자 정보 전달
    } else {
      setErrorMessage("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  // 회원가입 처리 함수
  const handleSignup = () => {
    if (!username || !password || !name || !email || !userStatus) {
      setErrorMessage("모든 필드를 입력해주세요.");
      return;
    }

    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      setErrorMessage("이미 존재하는 아이디입니다.");
      return;
    }

    const newUser = {
      username,
      password,
      studentId: studentId || null,
      name,
      email,
      userStatus: userStatus === "mentor" ? 1 : 2, // 멘토: 1, 멘티: 2
    };

    setUsers([...users, newUser]); // 새로운 사용자 추가
    setView("login"); // 회원가입 후 로그인 화면으로 전환
    setErrorMessage(""); // 오류 메시지 초기화
  };

  // 로그인 화면
  const renderLoginView = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "radial-gradient(circle, #1a202c 0%, #000000 80%)",
      }}
    >
      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
          textAlign: "center",
          backgroundColor: "#333",
          color: "white",
        }}
      >
        <h2>Login</h2>
        <input
          type="text"
          placeholder="ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "80%", padding: "6px", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "80%", padding: "6px", marginBottom: "20px" }}
        />
        <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={handleLogin}
            style={{
              padding: "10px",
              backgroundColor: "blue",
              color: "white",
              border: "none",
              width: "120px",
              marginRight: "10px",
            }}
          >
            Login
          </button>
          <button
            onClick={() => {
              setView("signup");
              setErrorMessage(""); // 오류 메시지 초기화
            }}
            style={{
              padding: "10px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              width: "120px",
            }}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );

  // 회원가입 화면
  const renderSignupView = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "radial-gradient(circle, #1a202c 0%, #000000 80%)",
      }}
    >
      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
          textAlign: "center",
          backgroundColor: "#333",
          color: "white",
        }}
      >
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "80%", padding: "6px", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "80%", padding: "6px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ width: "80%", padding: "6px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "80%", padding: "6px", marginBottom: "10px" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "80%", padding: "6px", marginBottom: "10px" }}
        />
        <select
          value={userStatus}
          onChange={(e) => setUserStatus(e.target.value)}
          style={{ width: "80%", padding: "6px", marginBottom: "20px" }}
        >
          <option value="mentor">Mentor</option>
          <option value="mentee">Mentee</option>
        </select>
        <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>
        <button
          onClick={handleSignup}
          style={{
            padding: "10px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            width: "100%",
          }}
        >
          Signup
        </button>
        <button
          onClick={() => {
            setView("login");
            setErrorMessage(""); // 오류 메시지 초기화
          }}
          style={{
            padding: "10px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            width: "100%",
            marginTop: "10px",
          }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );

  return view === "login" ? renderLoginView() : renderSignupView();
};

export default LoginSignup;
