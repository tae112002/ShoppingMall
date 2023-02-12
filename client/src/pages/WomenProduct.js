import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/WomenProduct.css";

function WomenProduct() {
  const [gender, setGender] = useState("WOMEN");
  const [caregory, setCaregory] = useState("all");
  const [products, setProducts] = useState([]);
  async function getProducts() {
    await axios
      .get("/products/list?gender=" + gender + "&caregory=" + caregory)
      .then((response) => {
        if (response.data.status === 201) {
          setProducts(response.data.result);
        } else {
          window.alert("Failed.");
        }
      });
  }

  useEffect(() => {
    getProducts();
  }, [caregory, gender]);

  return (
    <div className="container">
      <div className="title-container">
        <h1>Women</h1>
        <p>여성 제품을 만나보세요.</p>
      </div>
      <div className="product-container">
        <div className="product-list">
          <a
            className={`${caregory == "all" ? "click" : ""}`}
            onClick={() => {
              setCaregory("all");
            }}
          >
            All
          </a>
          <a
            className={`${caregory == "상의" ? "click" : ""}`}
            onClick={() => {
              setCaregory("상의");
            }}
          >
            상의
          </a>
          <a
            className={`${caregory == "하의" ? "click" : ""}`}
            onClick={() => {
              setCaregory("하의");
            }}
          >
            하의
          </a>
          <a
            className={`${caregory == "기타" ? "click" : ""}`}
            onClick={() => {
              setCaregory("기타");
            }}
          >
            기타
          </a>
        </div>
        <div className="product-wrap">
          {products.length > 0 ? (
            products.map((product, key) => {
              return (
                <div className="product-box" key={key}>
                  <Link to={`/product/${product.pId}`}>
                    <img src={`../${product.pImage1}`} alt="" />
                    {product.pStock > 0 ? (
                      <>
                        <p>
                          <strong>{product.pName}</strong>
                        </p>
                        <p style={{ color: "#8c8c8c", fontSize: "14px" }}>
                          {product.pPrice}원
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          <strong>품절상품</strong>
                        </p>
                        <p
                          style={{
                            color: "#8c8c8c",
                            fontSize: "14px",
                            textDecoration: "line-through",
                          }}
                        >
                          {product.pPrice}원
                        </p>
                      </>
                    )}
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="product-none-box">
              <p>
                <strong>등록된 상품이 없습니다.</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WomenProduct;
