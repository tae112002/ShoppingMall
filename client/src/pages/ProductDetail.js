import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/ProductDetail.css";

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const idx = localStorage.getItem("idx");

  const [counter, setCounter] = useState(1);
  const plus = () => {
    setCounter(counter + 1);
  };
  const minus = () => {
    if (counter < 2) {
      setCounter(1);
    } else {
      setCounter(counter - 1);
    }
  };

  const [product, setProduct] = useState([]);
  async function getProduct() {
    await axios.get("/detail/" + id).then((response) => {
      if (response.data.status === 201) {
        setProduct(response.data.result[0]);
      } else {
        window.alert("Failed.");
      }
    });
  }

  const totalPrice = counter * product.pPrice;

  useEffect(() => {
    getProduct();
  }, []);

  const cartHandler = async (e) => {
    e.preventDefault();
    if (product.pStock > 0) {
      await axios.post("/cart", { idx, counter, pId: id }).then((response) => {
        if (response.data.status === 201) {
          window.alert(response.data.msg);
          const isOrders = window.confirm(
            "장바구니 페이지로 이동하시겠습니까?"
          );
          if (isOrders) {
            navigate(`/cart/${idx}`);
          } else {
            navigate(-1);
          }
        } else {
          window.alert("상품 등록에 실패했습니다.");
        }
      });
    } else {
      window.alert("품절 상품입니다.");
    }
  };

  const buyHandler = async (e) => {
    e.preventDefault();
    if (product.pStock > 0) {
      await axios.post(`/buy`, { pId: id, mId: idx }).then((response) => {
        if (response.data.status === 201) {
          if (response.data.result.length == 1) {
            const isOrder = window.confirm(
              "장바구니의 동일한 상품이 있습니다. 함께 구매하시겠습니까?"
            );
            if (isOrder) {
              axios
                .post(`/buy/cart/${idx}`, { pId: id, counter, mId: idx })
                .then((response) => {
                  if (response.data.status === 201) {
                    console.log(response.data.result[0]);
                    navigate("/order", {
                      state: response.data.result[0],
                    });
                  } else {
                    window.alert("상품 등록에 실패했습니다.");
                  }
                });
            } else {
              axios
                .post(`/buy/${idx}`, { pId: id, counter, mId: idx })
                .then((response) => {
                  if (response.data.status === 201) {
                    navigate("/order", {
                      state: response.data.result[0],
                    });
                  } else {
                    window.alert("상품 등록에 실패했습니다.");
                  }
                });
            }
          } else {
            axios
              .post(`/buy/cart/add/${idx}`, { pId: id, counter, mId: idx })
              .then((response) => {
                if (response.data.status === 201) {
                  console.log(response.data.result[0]);
                  navigate("/order", {
                    state: response.data.result[0],
                  });
                } else {
                  window.alert("상품 등록에 실패했습니다.");
                }
              });
          }
        } else {
          window.alert("상품 등록에 실패했습니다.");
        }
      });
    } else {
      window.alert("품절 상품입니다.");
    }
  };
  return (
    <div className="container">
      <div className="product">
        <img src={`../${product.pImage1}`} />
        <div className="product-title-wrap">
          <h3>{product.pName}</h3>
          {product.pStock === 0 ? (
            <>
              <span
                className="price-value"
                style={{ textDecoration: "line-through" }}
              >
                {product.pPrice}원
              </span>
              <p className="product-soldout">품절</p>
            </>
          ) : (
            <span className="price-value">{product.pPrice}원</span>
          )}

          <p>배송비</p>
          <span>3,000원 (50,000원 이상 구매 시 무료)</span>
          <p>수량</p>
          <div className="add-stock">
            <Link onClick={minus}>-</Link>
            <span>{counter}</span>
            <Link onClick={plus}>+</Link>
          </div>
          <form method="post" onSubmit={cartHandler}>
            <div className="product-price">
              <div className="product-price-item">
                <span>주문수량</span>
                <span>{counter}개</span>
              </div>
              <div className="product-price-item">
                <span>총 상품 금액</span>
                <span>{totalPrice}원</span>
              </div>
              <button type="button" className="buy-btn" onClick={buyHandler}>
                구매하기
              </button>
              <button type="submit" className="cart-btn">
                장바구니에 담기
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="product-detail-container">
        <div className="product-detail-content">
          <div className="product-detail-subimg">
            <img src={`../${product.pImage2}`} />
          </div>
          <div className="product-detail-subimg">
            <img src={`../${product.pImage3}`} />
          </div>
          <div>
            <span>{product.pName}</span>
            <p>&nbsp;</p>
            <p>{product.pContent}</p>
          </div>
        </div>
        <div className="product-delivery">
          <table className="delivery-table">
            <thead>
              <tr>
                <th colSpan={2}>배송안내</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>배송 업체</td>
                <td>CJ 대한통운 (1588-1255)</td>
              </tr>
              <tr>
                <td>배송 지역</td>
                <td>대한민국 전 지역</td>
              </tr>
              <tr>
                <td>배송 비용</td>
                <td> 2,500원 / 구매 금액 50,000원 이상 시 무료배송</td>
              </tr>
              <tr>
                <td>배송 기간</td>
                <td>주말·공휴일 제외 2일 ~ 5일</td>
              </tr>
            </tbody>
          </table>
          <table className="delivery-table">
            <thead>
              <tr>
                <th colSpan={2}>유의사항</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={2}
                  style={{ fontWeight: "inherit", border: "0", padding: "0" }}
                >
                  - 주문폭주 및 공급 사정으로 인하여 지연 및 품절이 발생될 수
                  있습니다.
                </td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  style={{ fontWeight: "inherit", border: "0", padding: "0" }}
                >
                  - 기본 배송기간 이상 소요되는 상품이거나, 품절 상품은 개별
                  연락을 드립니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="product-change">
          <table className="delivery-table">
            <thead>
              <tr>
                <th colSpan={2}>교환 및 반품안내</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>신청 방법</td>
                <td>
                  상품을 수령하신 날로부터 7일 이내로 콜센터(1234-1234) 및
                  홈페이지 Q&A 게시판을 통해 접수
                </td>
              </tr>
              <tr>
                <td>배송 비용</td>
                <td>
                  단순 변심은 왕복 택배비 5,000원 (반품 상품을 제외한 나머지
                  금액이 50,000원 이상일 경우에는 2,500원)
                </td>
              </tr>
              <tr>
                <td>반품 주소</td>
                <td>서울특별시 서초구 강남대로 123, ㅇㅇㅇ ㅇㅇㅇ</td>
              </tr>
            </tbody>
          </table>
          <table className="delivery-table">
            <thead>
              <tr>
                <th colSpan={2}>유의사항</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={2}
                  style={{ fontWeight: "inherit", border: "0", padding: "0" }}
                >
                  - 단순 변심의 경우 수령일로부터 7일 이내까지 교환∙반품이
                  가능합니다. (교환/반품비 고객님 부담)
                </td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  style={{ fontWeight: "inherit", border: "0", padding: "0" }}
                >
                  - 상품 하자, 오배송의 경우 수령일로부터 7일 이내 고객센터 접수
                  후 교환∙반품이 가능합니다. (교환/반품비 무료)
                </td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  style={{ fontWeight: "inherit", border: "0", padding: "0" }}
                >
                  - 제품 특성상 단순 변심, 부주의에 의한 제품 손상 및 파손, 사용
                  및 개봉한 경우 교환/반품이 불가합니다.
                </td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  style={{ fontWeight: "inherit", border: "0", padding: "0" }}
                >
                  - 네이버페이 결제 주문은 동일 상품 / 동일 옵션 교환만
                  가능합니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
