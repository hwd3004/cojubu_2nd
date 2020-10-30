import { dbService } from "fbase";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
// import CKEditor from "ckeditor4-react";

const Coin = ({ isLoggedIn }) => {
  const match = useRouteMatch();

  const [something, setSomething] = useState({});
  const [board, setBoard] = useState([]);

  // let DB_NAME, DIV_CLASS_NAME, CATEGORY, TO_LINK, BUTTON_WRITE,

  useEffect(() => {
    const { path } = match;

    if (path === "/Coin") {
      setSomething({
        DB_NAME: "CoinPostDB",
        DIV_CLASS_NAME: "Coin",
        CATEGORY: "코인",
        TO_LINK: "Coin",
        BUTTON_WRITE: "/CoinPostWrite",
      });
    } else if (path === "/Stock") {
      setSomething({
        DB_NAME: "StockPostDB",
        DIV_CLASS_NAME: "Stock",
        CATEGORY: "주식",
        TO_LINK: "Stock",
        BUTTON_WRITE: "/StockPostWrite",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    TO_LINK,
    DIV_CLASS_NAME,
    BUTTON_WRITE,
    CATEGORY,
    DB_NAME,
  } = something;

  dbService
    .collection(`${DB_NAME}`)
    .orderBy("createdAt", "desc")
    .get()
    .then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBoard(data);
    });

  return (
    <div className={`${DIV_CLASS_NAME}`}>
      <div>{CATEGORY}</div>
      <div>글목록</div>

      <Table>
        {board.map((post) => {
          const {
            fileUrl,
            title,
            createdAt,
            creatorNickname,
            comment,
            id,
            upVote,
          } = post;
          return (
            <>
              <tr>
                <td>
                  <img src={fileUrl} alt="" />
                </td>
                <td>
                  <Link to={`/${TO_LINK}/${id}`}>{title}</Link>
                </td>
                <td>{comment.length}</td>
                <td>{creatorNickname}</td>
                <td>{createdAt}</td>
                <td>{upVote}</td>
              </tr>
            </>
          );
        })}
      </Table>

      {isLoggedIn ? (
        <Button as={Link} to={BUTTON_WRITE}>
          글쓰기
        </Button>
      ) : null}
    </div>
  );
};

export default Coin;
