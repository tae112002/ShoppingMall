import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NoticeWrite.css";

function NoticeWrite() {
  const idx = localStorage.getItem("idx");
  const [nTitle, setNTitle] = useState("");
  const [nFile, setNFile] = useState("");
  const [nContent, setNContent] = useState("");
  const Navigate = useNavigate();

  const writeHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("mId", idx);
    formData.append("nTitle", nTitle);
    formData.append("nFile", nFile[0]);
    formData.append("nFile", nFile[1]);
    formData.append("nFile", nFile[2]);
    formData.append("nContent", nContent);
    await axios.post("/admin/noticewrite", formData).then((response) => {
      if (response.data.status === 201) {
        window.alert(response.data.msg);
        Navigate("/admin/notice");
      } else {
        window.alert("공지사항 등록에 실패했습니다.");
      }
    });
  };

  return (
    <div className="admin-container">
      <h1>공지 작성</h1>
      <div className="admin-table-wrap">
        <form onSubmit={writeHandler} method="post">
          <div className="notice-write-title-wrap">
            <input
              type="text"
              placeholder="공지 제목"
              value={nTitle}
              onChange={(e) => setNTitle(e.target.value)}
            />
            <input
              type="file"
              name="nFile"
              multiple
              onChange={(e) => setNFile(e.target.files)}
            />
          </div>
          <div className="write-content-box">
            <textarea
              className="write-contents"
              placeholder="내용을 입력해주세요..."
              value={nContent}
              onChange={(e) => setNContent(e.target.value)}
            />
          </div>
          <div className="write-bottom">
            <div className="btn-wrap">
              <button className="save-btn">저장하기</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoticeWrite;
