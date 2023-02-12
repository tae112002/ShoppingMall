import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import "../styles/QnA.css";
import ReactPaginate from "react-paginate";

function QnA({ isLogin }) {
  const [qData, setQData] = useState([]);
  const [rows, setRows] = useState(0); // 전체 게시물 수
  const [page, setPage] = useState(0); // 현재 페이지
  const [pages, setPages] = useState(0); // 전체 페이지
  const [offset, setOffset] = useState(10); // 한 페이지에 표시할 게시물 수
  const [keyword, setKeyword] = useState("");
  const [searchWords, setSearchWords] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/qna?page=${page}&offset=${offset}&searchQuery=${keyword}`)
        .then((response) => {
          setQData(response.data.users);
          setRows(response.data.totalRows);
          setPages(response.data.totalPageNumber);
          setPage(response.data.page);
        });
    };
    fetchData();
  }, [page, keyword]);

  const changePage = ({ selected }) => {
    setPage(selected);
  };
  const searchData = async (e) => {
    e.preventDefault();
    setKeyword(searchWords);
    setPage(0); // 검색 후 첫페이지로 보내기
    setSearchWords("");
  };

  return (
    <div className="container">
      <div className="title-container">
        <h1>Q&A</h1>
        <p>1:1 질문 게시판입니다. 무엇이든 물어보세요!</p>
        <p>자주 묻는 질문은 공지글에서 확인할 수 있습니다.</p>
      </div>
      <div className="qna-table-wrap">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>분류</th>
              <th>제목</th>
              <th>글쓴이</th>
              <th>등록일</th>
            </tr>
          </thead>
          <tbody>
            {qData.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ fontSize: "14px" }}>
                  등록된 데이터가 없습니다.
                </td>
              </tr>
            ) : (
              qData.map((data, key) => {
                return (
                  <tr key={key}>
                    <td>{data.qId}</td>
                    <td>{data.qCategory}</td>
                    <td>
                      <div className="qna-title">
                        {data.pImage1 === null ? null : (
                          <div className="qna-img-wrap">
                            <Link to="/qna">
                              <img src={data.pImage1} alt={data.pImage1} />
                            </Link>
                          </div>
                        )}
                        <div>
                          <Link to={`/qna/${data.qId}`}>
                            <p>
                              {data.qSecret ? (
                                <FontAwesomeIcon
                                  icon={faLock}
                                  style={{ marginRight: "5px" }}
                                />
                              ) : null}
                              {data.qTitle}
                            </p>
                            <p style={{ color: "#8c8c8c" }}>{data.pName}</p>
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td>{data.mEmail}</td>
                    <td>{data.qRegdate}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="bottom-wrap">
        <div>
          <form method="post" onSubmit={searchData}>
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              value={searchWords}
              onChange={(e) => setSearchWords(e.target.value)}
            />
            <button>검색</button>
          </form>
        </div>
        <div className="admin-btn">
          {isLogin ? (
            <Link to="/qnawrite">
              <button>글쓰기</button>
            </Link>
          ) : null}
        </div>
      </div>
      <nav key={rows} role="navigation">
        <ReactPaginate
          breakLabel="..."
          previousLabel="<"
          nextLabel=">"
          onPageChange={changePage}
          pageCount={pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </nav>
    </div>
  );
}

export default QnA;
