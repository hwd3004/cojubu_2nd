import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";

const Stock = () => {
  const match = useRouteMatch();

  const [list, setList] = useState([]);

  const { isLoggedIn } = useSelector((state) => state.auth);

  let DB_NAME, DIV_CLASS_NAME, CATEGORY, LINK_WRITE, LINK_TO;

  const { path } = match;

  if (path === "/Coin") {
    // if (path === "/Coin" || path === "/Coin/:id") {
    DB_NAME = "CoinPostDB";
    DIV_CLASS_NAME = "Coin";
    LINK_TO = "Coin";
    CATEGORY = "코인";
    LINK_WRITE = "CoinPostWrite";
  } else if (path === "/Stock") {
    DB_NAME = "StockPostDB";
    DIV_CLASS_NAME = "Stock";
    LINK_TO = "Stock";
    CATEGORY = "주식";
    LINK_WRITE = "StockPostWrite";
  }

  const getPost = async () => {
    const postDB = await dbService
      .collection(`${DB_NAME}`)
      .orderBy("createdAt", "desc")
      .get();

    postDB.forEach((doc) => {
      // console.log(doc.data());
      const postObj = {
        id: doc.id,
        ...doc.data(),
      };
      setList((prev) => [...prev, postObj]);
    });
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${DIV_CLASS_NAME}`}>
      <div>{CATEGORY}</div>
      <div>글목록</div>

      <Table>
        <thead>
          <tr>
            <th colSpan="3">제목</th>
            <th>글쓴이</th>
            <th>날짜</th>
            <th>조회수</th>
            <th>추천</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => {
            const {
              fileUrl,
              title,
              creatorNickname,
              createdAt,
              upVote,
              id,
              views,
              comment,
            } = item;

            const { downloadTokens } = fileUrl;

            return (
              <tr key={index}>
                <td>
                  <img
                    src={`${fileUrl}?alt=media&amp;token=${downloadTokens}`}
                    width="50px;"
                    alt=""
                  />
                </td>
                <td>
                  <Link to={`/${LINK_TO}/${id}`}>{title}</Link>
                </td>
                <td>{comment.length !== 0 && `+${comment.length}`}</td>
                <td>{creatorNickname}</td>
                <td>{createdAt}</td>
                <td>{views}</td>
                <td>{upVote !== 0 && upVote}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <p>검색창 넣을 예정</p>
      <p>페이지네이션 넣을 예정</p>

      {isLoggedIn ? (
        <Button as={Link} to={`/${LINK_WRITE}`}>
          글쓰기
        </Button>
      ) : (
        <div>글못씀</div>
      )}
    </div>
  );
};

export default Stock;
