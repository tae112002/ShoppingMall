import "../styles/About.css";

function About() {
  return (
    <div className="container">
      <div className="section">
        <p>ABOUT</p>
        <h1>LIFE FOR US, LIFE FOR EARTH.</h1>
        <p>
          라이프포어스는 모든 제품 라인에는 자연스럽고 따듯한 감성이 담겨
          있으며, 매 시즌 새로운 감성을 전달합니다.
          <br /> 계절에 걸맞는 소재, 실용성에 충실한 디자인 모던한 무드를 느낄
          수 있습니다. <br />
          좋은 소재만 사용하여, 엣지있게 떨어지는 핏과 실용성을 모두 담은 제품을
          소개합니다.
        </p>
      </div>
      <div className="div-line" />
      <div className="img-box">
        <img src="./assets/img/about_img1.jpg" />
        <img src="./assets/img/about_img1.jpg" />
        <img src="./assets/img/about_img1.jpg" />
      </div>
      <div className="items">
        <div className="item-box">
          <h3>Contact Number</h3>
          <p>00-0000-0000</p>
        </div>
        <div className="item-box">
          <h3>E-Mail</h3>
          <p>brand_name@email.com</p>
        </div>
        <div className="item-box">
          <h3>Showroom</h3>
          <p>70, Gwangnam-ro, Suyeong-gu, Busan, Republic of Korea</p>
        </div>
        <div className="item-box">
          <h3>Instagram</h3>
          <p>@brand_name</p>
        </div>
      </div>
    </div>
  );
}

export default About;
