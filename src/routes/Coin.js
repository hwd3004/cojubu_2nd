import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import CKEditor from "ckeditor4-react";

const Coin = ({ isLoggedIn }) => {
  return (
    <div className="Coin">
      <div>Coin</div>
      <div>글목록</div>

      {isLoggedIn ? (
        <Button as={Link} to="/CoinPost">
          글쓰기
        </Button>
      ) : (
        <div>글못씀</div>
      )}
    </div>
  );
};

export default Coin;
