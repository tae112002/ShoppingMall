import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "../styles/QnADetail.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function QnADetail({ isAdmin, isLogin }) {
  const [datas, setDatas] = useState([]);
  const [qcContent, setQcContent] = useState("");
  const idx = useParams().id;

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/qna/${idx}`, idx).then((response) => {
        setDatas(response.data.result);
      });
    };
    fetchData();
  }, [idx]);

  const commentHandler = async (e) => {
    e.preventDefault();
    await axios
      .post(`/qna/${idx}`, {
        idx,
        qcWriter: localStorage.getItem("email"),
        qcContent,
      })
      .then((response) => {
        if (response.data.status === 201) {
          window.alert(response.data.msg);
          window.location.assign("/qna");
        } else {
          window.alert("문의 등록에 실패했습니다.");
        }
      });
  };

  return (
    <div className="board-container">
      {datas.map((data, key) => {
        return (
          <div key={key}>
            <div className="title-wrap">
              <h2>
                [{data.qCategory}] {data.qTitle}
              </h2>
            </div>
            <div className="content-wrap">
              <div>
                <p style={{ color: "#8c8c8c" }}>
                  {data.pName !== null ? data.pName : null}
                </p>
                <span>{data.mEmail}</span> /
                <span>
                  <small style={{ color: "#8c8c8c" }}> {data.qRegdate}</small>
                </span>
              </div>
              <div className="qna-content">
                {data.qContent}
                <div className="qna-img-box-wrap">
                  <div className="qna-grid">
                    {data.qImage1 === null ? null : (
                      <div className="qna-img-box">
                        <img src={`../${data.qImage1}`} alt={data.qImage1} />
                      </div>
                    )}
                    {data.qImage2 === null ? null : (
                      <div className="qna-img-box">
                        <img src={`../${data.qImage2}`} alt={data.qImage2} />
                      </div>
                    )}
                    {data.qImage3 === null ? null : (
                      <div className="qna-img-box">
                        <img src={`../${data.qImage3}`} alt={data.qImage3} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="answer-container">
        {datas.map((data, key) => {
          return (
            <div className="answer-box" key={key}>
              <div>
                <strong>{data.qcWriter}</strong>
                <span>
                  <small>{data.qcRegdate}</small>
                </span>
              </div>
              <div>{data.qcContent}</div>
            </div>
          );
        })}
        {!isAdmin ? null : (
          <div className="write-box">
            <form method="post" onSubmit={commentHandler}>
              <textarea
                value={qcContent}
                onChange={(e) => setQcContent(e.target.value)}
                placeholder="답변 작성하기"
              />
              <button>답변 쓰기</button>
            </form>
          </div>
        )}
      </div>
      <Link to="/qna">
        <FontAwesomeIcon icon={faAngleLeft} /> 목록으로 가기
      </Link>
    </div>
  );
}

export default QnADetail;
