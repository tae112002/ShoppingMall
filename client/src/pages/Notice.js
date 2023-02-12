import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import "../styles/Notice.css";

function Notice() {
  const [nData, setNData] = useState([]);
  const [rows, setRows] = useState(0); // 전체 게시물 수
  const [page, setPage] = useState(0); // 현재 페이지
  const [pages, setPages] = useState(0); // 전체 페이지
  const [offset, setOffset] = useState(10); // 한 페이지에 표시할 게시물 수
  const [msg, setMsg] = useState(""); // 데이터 마지막에 표시하는 메시지
  const [keyword, setKeyword] = useState("");
  const [searchWords, setSearchWords] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/notice?page=${page}&offset=${offset}&searchQuery=${keyword}`)
        .then((response) => {
          setNData(response.data.data);
          setRows(response.data.totalRows);
          setPages(response.data.totalPageNumber);
          setPage(response.data.page);
        });
    };
    fetchData();
  }, [page, keyword, offset]);

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === pages - 1) {
      setMsg("데이터가 없습니다.");
    } else {
      setMsg("");
    }
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
        <h1>Notice</h1>
        <p>공지사항과 다양한 이벤트 소식을 확인하세요.</p>
      </div>
      <div className="notice-table-wrap">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>글쓴이</th>
              <th>등록일</th>
            </tr>
          </thead>
          <tbody>
            {nData.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ fontSize: "14px" }}>
                  등록된 데이터가 없습니다.
                </td>
              </tr>
            ) : (
              nData.map((data, key) => {
                return (
                  <tr key={key}>
                    <td>{data.nId}</td>
                    <td>
                      <Link to={`${data.nId}`}>{data.nTitle} </Link>
                    </td>
                    <td>{data.mAuth === "admin" ? "관리자" : ""}</td>
                    <td>{data.nRegdate}</td>
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
      </div>
      <div className="pagination">
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
    </div>
  );
}

export default Notice;
