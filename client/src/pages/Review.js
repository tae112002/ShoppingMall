import React, { useEffect, useState } from "react";
import "../styles/Review.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faPen,
  faMessage,
  faCamera,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ReactPaginate from "react-paginate";

function Review() {
  const [rData, setRData] = useState([]);
  const [rows, setRows] = useState(0); // 전체 게시물 수
  const [page, setPage] = useState(0); // 현재 페이지
  const [pages, setPages] = useState(0); // 전체 페이지
  const [offset, setOffset] = useState(10); // 한 페이지에 표시할 게시물 수
  const [keyword, setKeyword] = useState("");
  const [searchWords, setSearchWords] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/review?page=${page}&offset=${offset}&searchQuery=${keyword}`)
        .then((response) => {
          setRData(response.data.reviews);
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
        <h1>Review</h1>
        <p>지금 바로, 고객님의 제품 경험을 공유해주세요!</p>
        <p>매주 수요일 베스트 리뷰를 추첨해 추가 적립금을 드립니다.</p>
        <div className="review-wrap">
          <div className="icon-content-wrap">
            <FontAwesomeIcon icon={faPen} size="4x" />
            <h3>한줄 리뷰</h3>
            <p>텍스트 15자 이상</p>
            <p>(500원)</p>
          </div>
          <div className="icon-content-wrap">
            <FontAwesomeIcon icon={faMessage} size="4x" />
            <h3>꼼꼼 리뷰</h3>
            <p>텍스트 50자 이상</p>
            <p>(1,000원)</p>
          </div>
          <div className="icon-content-wrap">
            <FontAwesomeIcon icon={faCamera} size="4x" />
            <h3>포토 리뷰</h3>
            <p>제품사진 + 50자 이상</p>
            <p>(2,000원)</p>
          </div>
          <div className="icon-content-wrap">
            <FontAwesomeIcon icon={faCrown} size="4x" />
            <h3>베스트 리뷰</h3>
            <p>제품사진 + 50자 이상</p>
            <p>(10,000원)</p>
          </div>
        </div>
      </div>
      <div className="review-table-wrap">
        {/* <input type="checkbox" id="photo" />
        <label htmlFor="photo"> 사진 후기만 보기 (onclick이벤트)</label> */}
        <table className="review-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>상품명</th>
              <th>제목</th>
              <th>작성자</th>
              <th>등록일</th>
              <th>평점</th>
            </tr>
          </thead>
          <tbody>
            {rData.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ fontSize: "14px" }}>
                  등록된 데이터가 없습니다.
                </td>
              </tr>
            ) : (
              rData.map((review, key) => {
                return (
                  <tr key={key}>
                    <td>{review.rId}</td>
                    <td>
                      <Link to={`/product/${review.pId}`}>
                        <span>{review.pName}</span>
                      </Link>
                    </td>
                    <td>
                      <div className="review-title">
                        <div className="review-img-wrap">
                          <img src={review.pImage1} alt={review.pImage1} />
                        </div>
                        <div>
                          <Link to={`/review/${review.rId}`}>
                            {review.rImage1 === null ? (
                              <p>{review.rTitle}</p>
                            ) : (
                              <>
                                <p>
                                  <FontAwesomeIcon
                                    icon={faCamera}
                                    style={{ marginRight: "5px" }}
                                  />
                                  {review.rTitle}
                                </p>
                                <p style={{ color: "#8c8c8c" }}>
                                  {review.pName}
                                </p>
                              </>
                            )}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td>{review.mEmail}</td>
                    <td>{review.rRegdate}</td>
                    <td>{review.rStar}</td>
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
          <Link to={`/reviewWrite/${localStorage.getItem("idx")}`}>
            <button>글쓰기 </button>
          </Link>
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

export default Review;
