import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AdminQnA.css";
import ReactPaginate from "react-paginate";

function AdminQnA() {
  const [rows, setRows] = useState(0); // 전체 게시물 수
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0); // 전체 페이지
  const [offset, setOffset] = useState(10); // 한 페이지에 표시할 게시물 수
  const [keyword, setKeyword] = useState("");
  const [searchWords, setSearchWords] = useState("");
  const [searchType, setSearchType] = useState("qTitle");
  const [datas, setDatas] = useState([]);
  const [checkItems, setCheckItems] = useState([]);
  const fetchData = async () => {
    await axios
      .get(
        `/admin/qna?page=${page}&offset=${offset}&typeQuery=${searchType}&searchQuery=${keyword}`
      )
      .then((response) => {
        setDatas(response.data.users);
        setRows(response.data.totalRows);
        setPage(response.data.page);
        setPages(response.data.totalPageNumber);
      });
  };
  useEffect(() => {
    fetchData();
  }, [page, keyword]);

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const searchData = async (e) => {
    e.preventDefault();
    setKeyword(searchWords);
    setPage(0);
    setSearchWords("");
  };

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      datas.forEach((el) => idArray.push(el.pId));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  const deleteNotice = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await axios.delete(`qna/${id}`).then((response) => {
        if (response.data.status === 201) {
          fetchData();
          window.alert(response.data.msg);
        } else {
          window.alert("삭제에 실패했습니다.");
        }
      });
    }
  };
  return (
    <>
      <div className="admin-container">
        <h1>Q&A 관리</h1>
        <div className="admin-table-wrap">
          <div className="admin-table-btn">
            <button onClick={searchData}>전체목록</button>
            {/* <button>선택삭제</button> */}
            <div>
              <span>
                <strong>질문 수 : {rows}</strong> 개
              </span>
            </div>
            <div>
              <form onSubmit={searchData}>
                <div>
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                  >
                    <option value={"qTitle"}>제목</option>
                    <option value={"qCategory"}>분류</option>
                  </select>
                  <input
                    type="text"
                    value={searchWords}
                    onChange={(e) => setSearchWords(e.target.value)}
                  />
                  <button>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div>
            <table className="notice-table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>번호</th>
                  <th>분류</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>날짜</th>
                  <th>-</th>
                </tr>
              </thead>
              <tbody>
                {datas.map((data, key) => {
                  return (
                    <tr key={key}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>{data.qId}</td>
                      <td>{data.qCategory}</td>
                      <td>{data.qTitle}</td>
                      <td>{data.mEmail}</td>
                      <td>{data.qRegdate}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => deleteNotice(data.qId)}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
        </div>
      </div>
    </>
  );
}

export default AdminQnA;
