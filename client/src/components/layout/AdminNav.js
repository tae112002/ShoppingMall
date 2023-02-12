import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import "../../styles/AdminNav.css";

function AdminNav() {
  const logout = () => {
    localStorage.clear();
    window.location.assign("/");
  };

  return (
    <>
      <header>
        <div className="header-wrap">
          <Link to="/">
            <FontAwesomeIcon icon={faHouse} style={{ marginRight: "10px" }} />
            LIFE FOR US
          </Link>
        </div>
      </header>
      <div className="admin-container-wrap">
        <div className="nav-wrap">
          <ul>
            <Link to="users">
              <li>회원 관리</li>
            </Link>
            <Link to="products">
              <li>상품 관리</li>
            </Link>
            <Link to="notice">
              <li>공지 관리</li>
            </Link>
            <Link to="review">
              <li>리뷰 관리</li>
            </Link>
            <Link to="qna">
              <li>Q&A 관리</li>
            </Link>
            <li>
              <a onClick={logout}>로그아웃</a>
            </li>
          </ul>
        </div>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default AdminNav;
