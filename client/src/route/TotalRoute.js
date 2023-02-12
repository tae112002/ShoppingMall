import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Notice from "../pages/Notice";
import Review from "../pages/Review";
import QnA from "../pages/QnA";
import ReviewDetail from "../pages/ReviewDetail";
import NoticeDetail from "../pages/NoticeDetail";
import QnADetail from "../pages/QnADetail";
import AllProduct from "../pages/AllProduct";
import MenProduct from "../pages/MenProduct";
import WomenProduct from "../pages/WomenProduct";
import ProductDetail from "../pages/ProductDetail";
import AdminNav from "../components/layout/AdminNav";
import AdminUsers from "../pages/AdminUsers";
import AdminProducts from "../pages/AdminProducts";
import AdminProductsUpload from "../pages/AdminProductsUpload";
import AdminNotice from "../pages/AdminNotice";
import AdminReview from "../pages/AdminReview";
import AdminQnA from "../pages/AdminQnA";
import QnAWrite from "../pages/QnAWrite";
import ReviewWrite from "../pages/ReviewWrite";
import NoticeWrite from "../pages/NoticeWrite";
import Main from "../pages/Main";
import About from "../pages/About";
import Order from "../pages/Order";
import Mypage from "../pages/Mypage";
import Cart from "../pages/Cart";

import Page404 from "../pages/Page404";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import AdminRoute from "./AdminRoute";
import NoticeEdit from "../pages/NoticeEdit";
import AdminProductsEdit from "../pages/AdminProductsEdit";
import ReviewEdit from "../pages/ReviewEdit";

function TotalRoute({ isLogin, isAdmin }) {
  return (
    <Router>
      <Routes>
        <Route element={<Navbar isLogin={isLogin} isAdmin={isAdmin} />}>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/review" element={<Review isLogin={isLogin} />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/qna" element={<QnA isLogin={isLogin} />} />
          <Route
            path="/review/:id"
            element={<ReviewDetail isLogin={isLogin} />}
          />
          <Route path="/notice/:id" element={<NoticeDetail />} />
          <Route path="/qna/:id" element={<QnADetail isAdmin={isAdmin} />} />
          <Route path="/all" element={<AllProduct />} />
          <Route path="/men" element={<MenProduct />} />
          <Route path="/women" element={<WomenProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route element={<PublicRoute isLogin={isLogin} />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute isLogin={isLogin} />}>
            <Route path="/mypage/:idx" element={<Mypage isLogin={isLogin} />} />
            <Route path="/cart/:idx" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/qnawrite" element={<QnAWrite />} />
            <Route path="/reviewWrite/:idx" element={<ReviewWrite />} />
            <Route path="/reviewEdit/:idx" element={<ReviewEdit />} />
          </Route>
        </Route>
        <Route element={<AdminRoute isAdmin={isAdmin} />}>
          <Route path="/admin" element={<AdminNav isAdmin={isAdmin} />}>
            <Route path="users" element={<AdminUsers isAdmin={isAdmin} />} />
            <Route
              path="products"
              element={<AdminProducts isAdmin={isAdmin} />}
            />
            <Route
              path="products/upload"
              element={<AdminProductsUpload isAdmin={isAdmin} />}
            />
            <Route
              path="product/edit/:id"
              element={<AdminProductsEdit isAdmin={isAdmin} />}
            />
            <Route path="notice" element={<AdminNotice isAdmin={isAdmin} />} />
            <Route
              path="notice/:idx"
              element={<NoticeEdit isAdmin={isAdmin} />}
            />
            <Route
              path="noticewrite"
              element={<NoticeWrite isAdmin={isAdmin} />}
            />
            <Route path="review" element={<AdminReview isAdmin={isAdmin} />} />
            <Route path="qna" element={<AdminQnA isAdmin={isAdmin} />} />
          </Route>
        </Route>
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default TotalRoute;
