import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AdminUsers.css";
import ReactPaginate from "react-paginate";

function AdminUsers() {
  const [rows, setRows] = useState(0); // 전체 게시물 수
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0); // 전체 페이지
  const [offset, setOffset] = useState(5); // 한 페이지에 표시할 게시물 수
  const [keyword, setKeyword] = useState("");
  const [searchWords, setSearchWords] = useState("");
  const [searchType, setSearchType] = useState("mEmail");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `/admin/users?page=${page}&offset=${offset}&typeQuery=${searchType}&searchQuery=${keyword}`
        )
        .then((response) => {
          setUsers(response.data.users);
          setRows(response.data.totalRows);
          setPage(response.data.page);
          setPages(response.data.totalPageNumber);
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
    setPage(0);
    setSearchWords("");
  };

  return (
    <>
      <div className="admin-container">
        <h1>회원 관리</h1>
        <div className="admin-table-wrap">
          <div className="admin-table-btn">
            <button onClick={searchData}>전체목록</button>
            <button>선택삭제</button>
            <div>
              <span>
                <strong>총 회원수 : {rows}</strong> 명
              </span>
            </div>
            <div>
              <form method="post" onSubmit={searchData}>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value={"mEmail"}>이메일</option>
                  <option value={"mName"}>이름</option>
                  <option value={"mPhone"}>전화번호</option>
                </select>
                <input
                  type="text"
                  value={searchWords}
                  onChange={(e) => setSearchWords(e.target.value)}
                />
                <button>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
            </div>
          </div>
          <div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>-</th>
                  <th>이메일</th>
                  <th>이름</th>
                  <th>전화번호</th>
                  <th>권한</th>
                  <th>가입일</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, key) => {
                  return (
                    <tr key={key}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>{user.mId}</td>
                      <td>
                        <Link to={`${user.mId}`}>{user.mEmail}</Link>
                      </td>
                      <td>
                        <Link to={`${user.mId}`}>{user.mName}</Link>
                      </td>
                      <td>{user.mPhone}</td>
                      <td>{user.mAuth === "admin" ? "관리자" : "일반"}</td>
                      <td>{user.mRegdate}</td>
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

export default AdminUsers;
