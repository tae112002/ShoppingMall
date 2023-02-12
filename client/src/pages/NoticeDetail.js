import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import "../styles/NoticeDetail.css";
import axios from "axios";

function NoticeDetail() {
  const [datas, setDatas] = useState([]);
  const idx = useParams().id;

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/notice/${idx}`, idx).then((response) => {
        setDatas(response.data.result);
      });
    };
    fetchData();
  }, [idx]);

  return (
    <div className="board-container">
      {datas.map((data, key) => {
        return (
          <div key={key}>
            <div className="title-wrap">
              <h2>{data.nTitle}</h2>
            </div>
            <div className="content-wrap">
              <div>
                <span>{data.nRegdate}</span>
              </div>
              <div className="review-content">
                {data.nContent}
                <div className="review-box-wrap">
                  <div className="review-grid">
                    {data.nImage1 === null ? null : (
                      <div className="review-img-box">
                        <img src={`../${data.nImage1}`} alt={data.nImage1} />
                      </div>
                    )}
                    {data.nImage2 === null ? null : (
                      <div className="review-img-box">
                        <img src={`../${data.nImage2}`} alt={data.nImage2} />
                      </div>
                    )}
                    {data.nImage3 === null ? null : (
                      <div className="review-img-box">
                        <img src={`../${data.nImage3}`} alt={data.nImage3} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <Link to="/notice">
        <FontAwesomeIcon icon={faAngleLeft} /> 목록으로 가기
      </Link>
    </div>
  );
}

export default NoticeDetail;
