import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/Login.css";

function Login() {
  const loginHandler = async (e) => {
    e.preventDefault();
    await axios.post("/login", { email, passwd }).then((response) => {
      if (response.data.status === 201) {
        localStorage.setItem("idx", response.data.idx);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("auth", response.data.auth);
        window.location.assign("/");
      } else if (response.data.status === 400) {
        window.alert(response.data.msg);
      } else if (response.data.status === 404) {
        window.alert(response.data.msg);
      } else {
        window.alert("관리자에게 문의하세요.");
      }
    });
  };

  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");

  return (
    <div className="login-container">
      <form method="post" onSubmit={loginHandler}>
        <div className="login-title-wrap">
          <p>로그인</p>
        </div>
        <div>
          <p>이메일</p>
          <input
            type="text"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <p>비밀번호</p>
          <input
            type="password"
            name="passwd"
            required
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)}
          />
        </div>
        <div className="btn-wrap">
          <button className="login-btn">로그인</button>
          <Link to="/register">
            <button type="button" className="reg-btn">
              회원가입
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
