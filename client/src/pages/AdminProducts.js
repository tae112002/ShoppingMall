import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../styles/AdminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [rows, setRows] = useState(0); // 전체 게시물 수
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0); // 전체 페이지
  const [offset, setOffset] = useState(5); // 한 페이지에 표시할 게시물 수
  const [keyword, setKeyword] = useState("");
  const [searchWords, setSearchWords] = useState("");
  const [searchType, setSearchType] = useState("pName");

  const [checkItems, setCheckItems] = useState([]);

  async function getProducts() {
    await axios
      .get(
        `/products?page=${page}&offset=${offset}&typeQuery=${searchType}&searchQuery=${keyword}`
      )
      .then((response) => {
        if (response.data.status === 201) {
          setProducts(response.data.products);
          setPage(response.data.page);
          setPages(response.data.totalPageNumber);
          setRows(response.data.totalRows);
        } else {
          window.alert("Failed.");
        }
      });
  }

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
      products.forEach((el) => idArray.push(el.pId));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  async function deleteItem(id) {
    const isDelete = window.confirm("상품을 삭제하시겠습니까?");
    if (isDelete) {
      await axios.delete("/delete/product/" + id).then((response) => {
        if (response.data.status === 201) {
          window.alert(response.data.msg);
          getProducts();
        } else {
          window.alert("Failed.");
        }
      });
    }
  }

  useEffect(() => {
    getProducts();
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
        <h1>상품 관리</h1>
        <div className="admin-table-wrap">
          <div className="admin-table-btn">
            <div className="buttons">
              <div className="button-left">
                <button onClick={searchData}>전체목록</button>
                {/* <button>선택삭제</button> */}
              </div>
              <div className="button-right">
                <button>
                  <Link to="/admin/products/upload">상품등록</Link>
                </button>
              </div>
            </div>
            <div>
              <span>
                <strong>총 상품수 : </strong> {products.length}개
              </span>
            </div>
            <div>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="pName">상품명</option>
                <option value="pId">상품코드</option>
              </select>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>
          <div className="admin-table">
            <table className="product-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      name="selectAll"
                      onChange={(e) => handleAllCheck(e.target.checked)}
                      checked={
                        checkItems.length === products.length ? true : false
                      }
                    />
                  </th>
                  <th>상품코드</th>
                  <th>상품이미지</th>
                  <th>상품명</th>
                  <th>성별</th>
                  <th>상품분류</th>
                  <th>가격</th>
                  <th>재고</th>
                  <th>판매일</th>
                  <th>-</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product, key) => {
                    return (
                      <tr key={key}>
                        <td>
                          <input
                            type="checkbox"
                            name={product.pId}
                            onChange={(e) =>
                              handleSingleCheck(e.target.checked, product.pId)
                            }
                            checked={
                              checkItems.includes(product.pId) ? true : false
                            }
                          />
                        </td>
                        <td>{product.pId}</td>
                        <td>
                          <img src={`../${product.pImage1}`} alt="" />
                        </td>
                        <td>{product.pName}</td>
                        <td>{product.pGender}</td>
                        <td>{product.pCaregory}</td>

                        <td style={{ width: "5%" }}>{product.pPrice}원</td>
                        <td style={{ width: "5%" }}>{product.pStock}개</td>
                        <td>{product.regdate}</td>
                        <td>
                          <button type="button">
                            <Link to={`/admin/product/edit/${product.pId}`}>
                              수정
                            </Link>
                          </button>
                          {/* <button
                            type="button"
                            onClick={() => deleteItem(product.pId)}
                          >
                            삭제
                          </button> */}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="11">등록된 상품이 없습니다.</td>
                  </tr>
                )}
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

export default AdminProducts;
