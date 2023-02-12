import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import "../styles/ReviewDetail.css";
import axios from "axios";

function ReviewDetail({ isLogin }) {
  const [datas, setDatas] = useState([]);
  const idx = useParams().id;
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/review/${idx}`, idx).then((response) => {
        setDatas(response.data.result);
      });
    };
    fetchData();
  }, [idx]);

  const deleteHandler = async () => {
    if (window.confirm("정말 삭제하시겠습니까 ?")) {
      await axios.delete(`/delReview/${idx}`, idx).then((response) => {
        if (response.data.status === 201) {
          window.alert(response.data.msg);
          window.location.assign("/review");
        } else {
          window.alert("error");
        }
      });
    } else {
      return false;
    }
  };

  return (
    <div className="board-container">
      {datas.map((data, key) => {
        return (
          <div key={key}>
            <div className="title-wrap">
              <h2>{data.rTitle}</h2>
              <div>
                {isLogin ? (
                  data.mId == localStorage.getItem("idx") ? (
                    <>
                      {/* <Link to={`/reviewEdit/${idx}`} datas={datas}>
                        <FontAwesomeIcon
                          icon={faPen}
                          style={{ marginRight: "10px" }}
                        />
                      </Link> */}
                      <Link onClick={deleteHandler}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Link>
                    </>
                  ) : null
                ) : null}
              </div>
            </div>
            <div className="content-wrap">
              <div>{data.rStar}</div>
              <div>
                <span>{data.mEmail}</span> /
                <span>
                  <small style={{ color: "#8c8c8c" }}> {data.rRegdate}</small>
                </span>
              </div>
              <div className="review-content">
                {data.rContent}
                <div className="review-box-wrap">
                  <div className="review-grid">
                    {data.rImage1 === null ? null : (
                      <div className="review-img-box">
                        <img src={`../${data.rImage1}`} alt={data.rImage1} />
                      </div>
                    )}
                    {data.rImage2 === null ? null : (
                      <div className="review-img-box">
                        <img src={`../${data.rImage2}`} alt={data.rImage2} />
                      </div>
                    )}
                    {data.rImage3 === null ? null : (
                      <div className="review-img-box">
                        <img src={`../${data.rImage3}`} alt={data.rImage3} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <Link to="/review">
        <FontAwesomeIcon icon={faAngleLeft} /> 목록으로 가기
      </Link>
    </div>
  );
}

export default ReviewDetail;
