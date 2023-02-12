import "../styles/Mypage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PasswordModal from "./PasswordModal";
import Loading from "./Loading";

function Mypage() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editUser, setEditUser] = useState(false);
  const idx = localStorage.getItem("idx");
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  const logout = () => {
    localStorage.clear();
    window.location.assign("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/mypage/${idx}`, { idx: idx }).then((response) => {
        setUsers(response.data.user);
        setOrders(response.data.orders);
      });
    };
    fetchData();
  }, []);

  return (
    <div className="container mypage-gird">
      <div className="userInfo-left">
        <div className="orderHistory-box">
          <div className="info-title">
            <span>주문 내역</span>
          </div>
          <table>
            <thead>
              <tr>
                <td>주문번호</td>
                <td>가격</td>
                <td>결제정보</td>
                <td>주문날짜</td>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, key) => {
                return (
                  <tr key={key}>
                    <td>{order.oId}</td>
                    <td>{order.oPrice}</td>
                    <td>{order.oPayment}</td>
                    <td>{order.oDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <form method="post">
        {users.map((user, key) => {
          return (
            <div className="userInfo-right" key={key}>
              <div className="info-title">
                <span>
                  <strong>{user.mName}</strong> 님 환영합니다.
                </span>
              </div>
              <div className="logout">
                <a onClick={logout}>로그아웃</a>
              </div>
              <div className="input-box">
                <div className="input-item">
                  <label>이메일</label>
                  <input
                    type="text"
                    name="email"
                    value={user.mEmail}
                    readOnly
                  />
                </div>
                <div className="input-item">
                  <label>이름</label>
                  <input type="text" name="name" value={user.mName} readOnly />
                </div>
                <div className="input-item">
                  <label>전화번호</label>
                  <input type="text" name="tel" value={user.mPhone} readOnly />
                </div>
                <div className="input-item">
                  <label>우편번호</label>
                  <input
                    type="text"
                    name="post"
                    value={user.mPostnum}
                    readOnly
                  />
                </div>
                <div className="input-item">
                  <label>주소</label>
                  <input
                    type="text"
                    name="addr1"
                    value={user.mAddr1}
                    readOnly
                  />
                </div>
                <div className="input-item">
                  <label>상세주소</label>
                  <input
                    type="text"
                    name="addr2"
                    value={user.mAddr2}
                    readOnly
                  />
                </div>
                <div className="input-item">
                  <label>적립금</label>
                  <input
                    type="text"
                    name="post"
                    value={`${user.mPoint}원`}
                    readOnly
                  />
                </div>
                <div className="input-item">
                  <label>가입일</label>
                  <input
                    type="text"
                    name="post"
                    value={user.mRegdate}
                    readOnly
                  />
                </div>
                <div className="link-wrap">
                  <Link onClick={showModal}>회원정보 변경하기</Link>
                  {modalOpen && (
                    <PasswordModal setModalOpen={setModalOpen} user={user} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </form>
    </div>
  );
}

export default Mypage;
