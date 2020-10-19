import React from "react";
import { useHistory } from "react-router-dom";


const CoinPost = ({ isLoggedIn }) => {
  const history = useHistory();
  const onSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="CoinPost">
      코인게시판 글쓰기 폼
      <div>{isLoggedIn ? <div></div> : history.push("/")}</div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            placeholder="제목 등록"
            name="coin_post_title"
            type="text"
          ></input>
          <br></br>
          {/* CKEditor */}
          <input
            name="coin_post_contents"
            type="submit"
            value="글 등록"
          ></input>
        </form>
      </div>
    </div>
  );
};

export default CoinPost;
