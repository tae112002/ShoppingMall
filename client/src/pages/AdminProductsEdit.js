import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminProductsUpload.css";
import { Link, useNavigate, useParams } from "react-router-dom";

function AdminProductsUpload() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [showImages, setShowImages] = useState([]);

  async function getProductInfo() {
    await axios.get("/product/edit/" + id).then((response) => {
      if (response.data.status === 201) {
        setProduct(response.data.result[0]);
      } else {
        window.alert("상품 수정을 실패했습니다.");
        navigate("/admin/products");
      }
    });
  }

  useEffect(() => {
    getProductInfo();
  }, []);

  const onEditChang = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const productHandler = async (e) => {
    e.preventDefault();
    await axios.post("/product/edit/" + id, product).then((response) => {
      if (response.data.status === 201) {
        window.alert(response.data.msg);
        navigate("/admin/products");
      } else {
        window.alert("상품 수정에 실패했습니다.");
      }
    });
  };

  return (
    <div className="admin-container">
      <h1>상품 수정</h1>
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={productHandler}
      >
        <div className="admin-table-wrap">
          <div className="admin-items-wrap">
            <div className="admin-items">
              <span>상품 분류</span>
              <div className="admin-item">
                <table className="apu-tb-top">
                  <tbody>
                    <tr>
                      <td>성별 분류</td>
                      <td>
                        <select
                          onChange={onEditChang}
                          name="pGender"
                          defaultValue={product.pGender}
                        >
                          <option>선택하세요</option>
                          <option>MEN</option>
                          <option>WOMEN</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>카테고리 분류</td>
                      <td>
                        <select
                          onChange={onEditChang}
                          name="pCaregory"
                          defaultValue={product.pCaregory}
                        >
                          <option>선택하세요</option>
                          <option>상의</option>
                          <option>하의</option>
                          <option>기타</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="admin-items">
              <span>상품 입력</span>
              <div className="admin-item">
                <table className="apu-tb-center">
                  <tbody>
                    <tr>
                      <td>상품명</td>
                      <td>
                        <input
                          type="text"
                          name="pName"
                          defaultValue={product.pName || ""}
                          onChange={onEditChang}
                        ></input>
                      </td>
                    </tr>
                    <tr>
                      <td>상품 설명</td>
                      <td>
                        <textarea
                          defaultValue={product.pContent || ""}
                          onChange={onEditChang}
                          name="pContent"
                        ></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td>상품 가격</td>
                      <td>
                        <input
                          type="text"
                          defaultValue={product.pPrice || ""}
                          onChange={onEditChang}
                          name="pPrice"
                        ></input>
                      </td>
                    </tr>
                    <tr>
                      <td>상품 재고</td>
                      <td>
                        <input
                          type="text"
                          defaultValue={product.pStock}
                          onChange={onEditChang}
                          name="pStock"
                        ></input>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="admin-items">
              <span>상품 이미지</span>
              <div className="admin-item">
                <table className="apu-tb-bottom">
                  <tbody>
                    <tr>
                      <td>상품 이미지</td>
                      <td>
                        <div className="prevImg">
                          <img src={`../../../${product.pImage1}`} />
                          <img src={`../../../${product.pImage2}`} />
                          <img src={`../../../${product.pImage3}`} />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="prevImg">
                  {showImages.map((image, id) => (
                    <div key={id}>
                      <img src={image} alt={`${image}-${id}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="admin-prodUp-btn">
          <button type="button">
            <Link to="/admin/products">취소</Link>
          </button>
          <button type="submit">등록</button>
        </div>
      </form>
    </div>
  );
}

export default AdminProductsUpload;
