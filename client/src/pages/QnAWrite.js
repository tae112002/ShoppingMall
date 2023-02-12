import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/QnAWrite.css";

function QnAWrite() {
  const [qCategory, setQCategory] = useState("");
  const [pId, setPId] = useState(null);
  const [pName, setPName] = useState("");
  const [qTitle, setQTitle] = useState("");
  const [qFile, setQFile] = useState("");
  const [qContent, setQContent] = useState("");
  const [qSecret, setQSecret] = useState(false);
  const [qSearch, setQSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const ref = useRef();

  const secretChk = () => {
    document.getElementById("secret-chk").checked
      ? setQSecret(true)
      : setQSecret(false);
  };

  const qnaWriteHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("qCategory", qCategory);
    formData.append("pId", pId);
    formData.append("mId", localStorage.getItem("idx"));
    formData.append("qTitle", qTitle);
    formData.append("qFile", qFile[0]);
    formData.append("qFile", qFile[1]);
    formData.append("qFile", qFile[2]);
    formData.append("qContent", qContent);
    formData.append("qSecret", qSecret);
    await axios.post("/qnawrite", formData).then((response) => {
      if (response.data.status === 201) {
        window.alert(response.data.msg);
        window.location.assign("/qna");
      } else {
        window.alert("문의 등록에 실패했습니다.");
      }
    });
  };

  const handleClickOutSide = (e) => {
    if (showSearch && !ref.current.contains(e.target)) {
      setShowSearch(false);
    }
  };

  useEffect(() => {
    if (showSearch) document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  });

  const searchHandler = async () => {
    setShowSearch(true);
    await axios.post("/qnaproduct", { qSearch }).then((response) => {
      setSearchData(response.data.result);
    });
  };

  return (
    <div className="write-container">
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={qnaWriteHandler}
      >
        <div className="write-top">
          <div className="write-caregory">
            <span>분류</span>
            <select
              value={qCategory}
              onChange={(e) => setQCategory(e.target.value)}
              required
            >
              <option>선택하세요.</option>
              <option>상품</option>
              <option>주문 / 결제</option>
              <option>배송</option>
              <option>반품 / 교환</option>
              <option>기타</option>
            </select>
          </div>
          <div className="write-title">
            <span>제목</span>
            <input
              type="text"
              value={qTitle}
              onChange={(e) => setQTitle(e.target.value)}
            />
          </div>
        </div>

        {qCategory === "상품" ? (
          <div className="product-search-container" ref={ref}>
            {pId > 0 ? (
              <>
                <input type="text" value={pName} readOnly />
                <input
                  type="button"
                  className="search-btn"
                  value="취소"
                  onClick={() => {
                    setPId(null);
                    setPName(null);
                  }}
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={qSearch}
                  onChange={(e) => setQSearch(e.target.value)}
                  placeholder="상품명을 입력해주세요..."
                  required
                />
                <input
                  type="button"
                  className="search-btn"
                  value="검색"
                  onClick={searchHandler}
                />
              </>
            )}

            {showSearch ? (
              <div className="search-container">
                {searchData.map((data, key) => {
                  return (
                    <ul
                      className="search-wrap"
                      key={key}
                      onClick={() => {
                        setPId(data.pId);
                        setPName(data.pName);
                        setShowSearch(false);
                      }}
                    >
                      <li className="search-data">
                        <img src={data.pImage1} alt={data.pName} />
                        <span>{data.pName}</span>
                      </li>
                    </ul>
                  );
                })}
              </div>
            ) : null}
          </div>
        ) : null}
        <input
          name="qFile"
          multiple
          onChange={(e) => setQFile(e.target.files)}
          type="file"
        />
        <div className="write-content-box">
          <textarea
            className="write-contents"
            value={qContent}
            onChange={(e) => setQContent(e.target.value)}
            required
          />
        </div>
        <div className="write-bottom">
          <div className="secret-wrap">
            <input type="checkbox" id="secret-chk" onClick={secretChk} />
            <label htmlFor="secret-chk">비밀글로 지정하기</label>
          </div>
          <div className="btn-wrap">
            <button type="button" className="list-btn">
              <Link to="/qna">목록으로 가기</Link>
            </button>
            <button type="submit" className="save-btn">
              저장하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default QnAWrite;
