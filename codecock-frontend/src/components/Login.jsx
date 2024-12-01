import React, { useState } from "react";
import axios from "axios";

const LoginSignup = ({ onLoginSuccess }) => {
  const [view, setView] = useState("login"); // 'login', 'signup'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userStatus, setUserStatus] = useState("mentor");
  const [errorMessage, setErrorMessage] = useState("");

  // 로그인 처리 함수
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", { // 백엔드 URL 명확히 지정
        username,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem("authToken", JSON.stringify(response.data));
        onLoginSuccess(); // 로그인 성공 처리
      }
    } catch (error) {
      setErrorMessage("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  // 회원가입 처리 함수
  const handleSignup = async () => {
    // 모든 필드가 입력되었는지 확인
    if (!username || !password || !name || !email || !userStatus) {
      setErrorMessage("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/users/register", { // 백엔드 URL 명확히 지정
        username,
        password,
        studentId: studentId || null,  // studentId는 선택사항으로 설정
        name,
        email,
        userStatus: userStatus === "mentor" ? 1 : 2, // 멘토: 1, 멘티: 2
      });

      if (response.status === 200) {
        setView("login");
        setErrorMessage(""); // 성공 시 오류 메시지 초기화
      }
    } catch (error) {
      // 서버에서 오는 오류 메시지를 사용자에게 표시
      if (error.response && error.response.data) {
        setErrorMessage(`회원가입에 실패했습니다: ${JSON.stringify(error.response.data)}`);
      } else {
        setErrorMessage("회원가입에 실패했습니다. 입력 정보를 확인해주세요.");
      }
      console.error("회원가입 오류:", error);
    }
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
