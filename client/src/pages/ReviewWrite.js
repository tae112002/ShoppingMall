import "../styles/ReviewWrite.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ReviewWrite() {
  const [orders, setOrders] = useState([]);
  const idx = localStorage.getItem("idx");
  const [pId, setPId] = useState(0);
  const [rTitle, setRTitle] = useState("");
  const [rFile, setRFile] = useState("");
  const [rContent, setRContent] = useState("");
  const [rStar, setRStar] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/reviewWrite/${idx}`, { idx: idx }).then((response) => {
        setOrders(response.data.user);
      });
    };
    fetchData();
  }, [idx]);

  const reviewWriteHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("pId", pId);
    formData.append("mId", idx);
    formData.append("rTitle", rTitle);
    formData.append("rFile", rFile[0]);
    formData.append("rFile", rFile[1]);
    formData.append("rFile", rFile[2]);
    formData.append("rContent", rContent);
    formData.append("rStar", rStar);
    if (rStar === "") {
      window.alert("별점은 필수입니다.");
    } else {
      await axios.post("/reviewWrite", formData).then((response) => {
        if (response.data.status === 201) {
          window.alert(response.data.msg);
          window.location.assign("/review");
        } else {
          window.alert("리뷰 등록에 실패했습니다.");
        }
      });
    }
  };

  return (
    <div className="write-container">
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={reviewWriteHandler}
      >
        <div className="select-product">
          <span>상품 이름</span>
          <select value={pId} onChange={(e) => setPId(e.target.value)}>
            <option>상품을 선택해주세요.</option>
            {orders.map((order, key) => {
              return (
                <option value={order.pId} key={key}>
                  {order.pName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="review-write-title-wrap">
          <span>제목</span>
          <input
            type="text"
            value={rTitle}
            onChange={(e) => setRTitle(e.target.value)}
          />
        </div>
        <div className="file-wrap">
          <input
            type="file"
            name="rFile"
            id="rFile"
            multiple
            onChange={(e) => setRFile(e.target.files)}
          />
        </div>
        <div className="write-content-box">
          <textarea
            className="write-contents"
            value={rContent}
            onChange={(e) => setRContent(e.target.value)}
          />
        </div>
        <div className="review-write-bottom">
          <div className="review-btn-wrap">
            <div className="left-wrap">
              <button type="button" className="list-btn">
                <Link to="/review">목록으로 가기</Link>
              </button>
            </div>
            <div className="right-wrap">
              <select value={rStar} onChange={(e) => setRStar(e.target.value)}>
                <option>별점을 선택해주세요.</option>
                <option value={"★★★★★"}>★★★★★</option>
                <option value={"★★★★☆"}>★★★★☆</option>
                <option value={"★★★☆☆"}>★★★☆☆</option>
                <option value={"★★☆☆☆"}>★★☆☆☆</option>
                <option value={"★☆☆☆☆"}>★☆☆☆☆</option>
              </select>
              <button type="submit" className="save-btn">
                저장하기
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReviewWrite;
