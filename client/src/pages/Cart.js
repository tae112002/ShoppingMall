import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/Cart.css";

function Cart() {
  const [quantity, setQuantity] = useState(1);
  let totalPrice = 0;

  function Plus() {
    setQuantity(quantity + 1);
  }
  function Minus() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const idx = localStorage.getItem("idx");
  const [carts, setCarts] = useState([]);

  async function getCartList() {
    await axios.get("/cart/" + idx).then((response) => {
      if (response.data.status === 201) {
        setCarts(response.data.cart);
      } else {
        window.alert("Failed.");
      }
    });
  }
  async function deleteItem(id) {
    const isDelete = window.confirm("상품을 삭제하시겠습니까?");
    if (isDelete) {
      await axios
        .delete("/delete/cart?mId=" + idx + "&pId=" + id)
        .then((response) => {
          if (response.data.status === 201) {
            window.alert(response.data.msg);
            getCartList();
          } else {
            window.alert("Failed.");
          }
        });
    }
  }

  useEffect(() => {
    getCartList();
  }, []);

  return (
    <div className="cartWrap">
      <h1>장바구니({carts.length})</h1>
      {carts.length > 0 ? (
        <div className="cart-box">
          <div className="tb">
            <div className="tb-title">
              <span className="name">상품정보</span>
              <span className="qty">수량</span>
              <span className="price">가격</span>
              <span className="deliveryPrice">배송비</span>
            </div>
            <div className="tb-main">
              <div className="tb-main-left">
                {carts.map((cart, key) => {
                  {
                    totalPrice += cart.cQuantity * cart.pPrice;
                  }
                  return (
                    <div key={key} className="tb-cartInfo">
                      <div className="product-info">
                        <Link to={`/product/${cart.pId}`}>
                          <img src={`../${cart.pImage1}`} />
                        </Link>
                        <div className="text">
                          <Link to={`/product/${cart.pId}`}>{cart.pname}</Link>
                          <span
                            onClick={() => deleteItem(cart.pId)}
                            style={{ cursor: "pointer", color: "#666" }}
                          >
                            삭제하기
                          </span>
                        </div>
                      </div>
                      <div className="add-stock">
                        <Link onClick={Minus}>-</Link>
                        <span>{cart.cQuantity}</span>
                        <Link onClick={Plus}>+</Link>
                      </div>
                      <div className="cartPrice">
                        <p>{cart.cQuantity * cart.pPrice}원</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="tb-delivery-group">
                <div className="delivery-priceInfo">
                  {totalPrice > 50000 ? "0원" : "3000원"}
                </div>
                <div className="delivery-freeInfo">
                  50000원 이상 구매 시 무료
                </div>
              </div>
            </div>
          </div>
          <div className="tb-bottom">
            <div className="cartInfo-bottom">
              <div className="bottom-box">
                <div className="title">상품 합계</div>
                <div className="content">{totalPrice}원</div>
              </div>
              <div className="bottom-box">
                <div className="title">배송비</div>
                <div className="content">
                  {totalPrice > 50000 ? "0원" : "3000원"}
                </div>
              </div>
            </div>
            <div className="price-total">
              <div className="bottom-box total">
                <div className="title">합계</div>
                <div className="content">
                  {totalPrice > 50000
                    ? `${totalPrice}원`
                    : `${totalPrice + 3000}원`}
                </div>
              </div>
            </div>
            <div className="cartBtn">
              <button type="button">
                <Link to="/order">주문하기</Link>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="noncart-box">
          <p>장바구니가 비어 있습니다.</p>
        </div>
      )}
    </div>
  );
}

export default Cart;
