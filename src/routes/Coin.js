import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";

const Coin = ({ isLoggedIn }) => {
  const match = useRouteMatch();

  const [list, setList] = useState([]);

  let DB_NAME, DIV_CLASS_NAME, CATEGORY, LINK_WRITE, LINK_TO;

  const { path } = match;

  if (path === "/Coin") {
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
        {list.map((item) => {
          const {
            fileUrl,
            title,
            creatorNickname,
            createdAt,
            upVote,
            id,
          } = item;

          const { downloadTokens } = fileUrl;

          return (
            <tr>
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
              <td>{creatorNickname}</td>
              <td>{createdAt}</td>
              <td>{upVote}</td>
            </tr>
          );
        })}
      </Table>

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

export default Coin;
