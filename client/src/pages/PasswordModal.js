import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Mypage.css";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";

function PasswordModal({ setModalOpen, user }) {
  const [pw, setPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [username, setUsername] = useState(user.mName);
  const [phone, setPhone] = useState(user.mPhone);
  const [zipcode, setZipcode] = useState(user.mPostnum);
  const [address, setAddress] = useState(user.mAddr1);
  const [address2, setAddress2] = useState(user.mAddr2);
  const [openPost, setOpenPost] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const chkPwHandler = async (e) => {
    e.preventDefault();
    await axios
      .post(`/upUser/${user.mId}`, {
        pw,
        hashpw: user.mPwd,
        newPw,
        username,
        phone,
        zipcode,
        address,
        address2,
      })
      .then((response) => {
        if (response.data.status === 201) {
          window.alert(response.data.msg);
          setModalOpen(false);
        } else if (response.data.status === 404) {
          window.alert(response.data.msg);
        } else {
          window.alert("관리자에게 문의해주세요.");
        }
      });
  };
  const phoneHandler = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };
  useEffect(() => {
    if (phone.length === 10) {
      setPhone(phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (phone.length === 13) {
      setPhone(
        phone.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  }, [phone]);

  const handle = {
    selectAddress: (data) => {
      setAddress(data.address);
      setZipcode(data.zonecode);
      setOpenPost(false);
    },
    addressHandler: () => {
      setOpenPost((current) => !current);
    },
  };

  return (
    <div className="modal-container">
      <Link className="modal-close" onClick={closeModal}>
        X
      </Link>
      <div className="info-title">
        <span>
          <strong>회원 정보 변경</strong>
        </span>
      </div>
      <div className="input-box">
        <div className="input-item">
          <label>이메일</label>
          <input type="text" name="email" value={user.mEmail} readOnly />
        </div>
        <div className="input-item">
          <label>이름</label>
          <input
            type="text"
            name="username"
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-item">
          <label>현재 비밀번호</label>
          <input
            type="password"
            name="pw"
            defaultValue={pw}
            onChange={(e) => {
              setPw(e.target.value);
            }}
          />
        </div>
        <div className="input-item">
          <label>새로운 비밀번호</label>
          <input
            type="password"
            name="newPw"
            defaultValue={newPw}
            onChange={(e) => setNewPw(e.target.value)}
          />
        </div>
        <div className="input-item">
          <label>전화번호</label>
          <input
            type="text"
            name="phone"
            defaultValue={phone}
            onChange={phoneHandler}
          />
        </div>
        <div className="input-item">
          <label>우편번호</label>
          <input
            type="text"
            name="postnum"
            value={zipcode}
            onClick={handle.addressHandler}
            readOnly
          />
        </div>
        {openPost && (
          <DaumPostcode onComplete={handle.selectAddress} autoClose={false} />
        )}
        <div className="input-item">
          <label>주소</label>
          <input type="text" name="addr1" value={address} readOnly />
        </div>
        <div className="input-item">
          <label>상세주소</label>
          <input
            type="text"
            name="addr2"
            defaultValue={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </div>
      </div>
      <div className="modal-button">
        <button onClick={chkPwHandler}>변경하기</button>
        <button onClick={closeModal}>취소</button>
      </div>
    </div>
  );
}

export default PasswordModal;
