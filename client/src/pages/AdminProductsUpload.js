import React, { useState } from "react";
import axios from "axios";
import "../styles/AdminProductsUpload.css";
import { Link, useNavigate } from "react-router-dom";

function AdminProductsUpload() {
  const navigate = useNavigate();

  const [pGender, setPGender] = useState("");
  const [pCaregory, setPCaregory] = useState("");
  const [pName, setPName] = useState("");
  const [pStock, setPStock] = useState("");
  const [pPrice, setPPrice] = useState("");
  const [imageLength, setImageLength] = useState("");
  const [pImage1, setPImage1] = useState("");
  const [pImage2, setPImage2] = useState("");
  const [pImage3, setPImage3] = useState("");
  const [pContent, setPContent] = useState("");
  const [showImages, setShowImages] = useState([]);

  // 이미지 상대경로 저장
  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < 3; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    setShowImages(imageUrlLists);
  };

  const stockHandler = (e) => {
    const regex = /^[0-9]*$/;
    if (regex.test(e.target.value)) {
      setPStock(e.target.value);
    } else {
      window.alert("재고는 숫자만 입력이 가능합니다.");
      e.target.value = "";
    }
  };

  const priceHandler = (e) => {
    const regex = /^[0-9]*$/;
    if (regex.test(e.target.value)) {
      setPPrice(e.target.value);
    } else {
      window.alert("가격는 숫자만 입력이 가능합니다.");
      e.target.value = "";
    }
  };

  const productHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("pGender", pGender);
    formData.append("pCaregory", pCaregory);
    formData.append("pName", pName);
    formData.append("pStock", pStock);
    formData.append("pPrice", pPrice);
    formData.append("pImage1", pImage1);
    formData.append("pImage2", pImage2);
    formData.append("pImage3", pImage3);
    formData.append("pContent", pContent);
    if (pGender == "") {
      alert("성별을 선택해주세요.");
      return false;
    }
    if (pCaregory == "") {
      alert("카테고리를 선택해주세요.");
      return false;
    }
    if (imageLength != 3) {
      alert("상품이미지는 3개 선택해주세요");
      return false;
    }
    await axios.post("/product/upload", formData).then((response) => {
      if (response.data.status === 201) {
        window.alert(response.data.msg);
      } else {
        window.alert("상품 등록에 실패했습니다.");
      }
    });

    navigate("/admin/products");
  };

  return (
    <div className="admin-container">
      <h1>상품 등록</h1>
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
                          value={pGender}
                          onChange={(e) => setPGender(e.target.value)}
                        >
                          <option value="">선택하세요</option>
                          <option value="MEN">MEN</option>
                          <option value="WOMEN">WOMEN</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>카테고리 분류</td>
                      <td>
                        <select
                          value={pCaregory}
                          onChange={(e) => setPCaregory(e.target.value)}
                        >
                          <option value="">선택하세요</option>
                          <option value="상의">상의</option>
                          <option value="하의">하의</option>
                          <option value="기타">기타</option>
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
                          value={pName}
                          onChange={(e) => setPName(e.target.value)}
                          required
                        ></input>
                      </td>
                    </tr>
                    <tr>
                      <td>상품 설명</td>
                      <td>
                        <textarea
                          value={pContent}
                          onChange={(e) => setPContent(e.target.value)}
                          required
                        ></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td>상품 가격</td>
                      <td>
                        <input
                          type="text"
                          onChange={priceHandler}
                          required
                        ></input>
                      </td>
                    </tr>
                    <tr>
                      <td>상품 재고</td>
                      <td>
                        <input
                          type="text"
                          onChange={stockHandler}
                          required
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
                        <input
                          name="pImage"
                          onChange={(e) => {
                            setImageLength(e.target.files.length);
                            setPImage1(e.target.files[0]);
                            setPImage2(e.target.files[1]);
                            setPImage3(e.target.files[2]);
                            handleAddImages(e);
                          }}
                          type="file"
                          accept="image/jpg,image/png,image/jpeg,image/gif"
                          multiple
                          required
                        ></input>
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
