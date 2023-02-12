import { Link } from "react-router-dom";
import "../styles/Page404.css";

function Page404() {
  return (
    <div className="notfound-container">
      <div className="text-center">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-contents">
          <span>페이지를 찾을 수 없습니다.</span>
        </p>
        <p className="lead">
          존재하지 않는 주소를 입력하셨거나<br></br>요청하신 페이지의 주소가
          변경, 삭제되어 찾을 수 없습니다.
        </p>
        <Link to="/" className="btn-primary">
          홈화면으로
        </Link>
      </div>
    </div>
  );
}

export default Page404;
