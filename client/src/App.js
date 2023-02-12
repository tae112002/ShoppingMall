import { useEffect, useState } from "react";
import "./App.css";
import TotalRoute from "./route/TotalRoute";

function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("auth") === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);
  return (
    <>
      <TotalRoute isLogin={isLogin} isAdmin={isAdmin} />
    </>
  );
}

export default App;
