import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { Button, NavbarBrand, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { Link, useLocation, useParams, useRouteMatch } from "react-router-dom";
import "scss/Board.scss";

const Board = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [list, setList] = useState([]);

  // const params = useParams();
  // const location = useLocation();
  const match = useRouteMatch();

  // console.log("params", params);
  // console.log("location", location);
  // console.log("match", match);

  const { path } = match;

  let divClassName, category, linkToWrite, dbName;

  switch (path) {
    case "/Coin":
      divClassName = "Coin";
      category = "코인";
      linkToWrite = "CoinPostWrite";
      dbName = "CoinPostDB";
      break;

    case "/Stock":
      divClassName = "Stock";
      category = "주식";
      linkToWrite = "StockPostWrite";
      dbName = "StockPostDB";
      break;

    default:
      alert("Board.js executed switch default.");
      break;
  }

  const getPost = async () => {
    const postDB = await dbService
      .collection(`${dbName}`)
      .orderBy("time", "desc")
      .limit(1)
      .get();

    if (postDB.docs.length > 0) {
      const lastSnapshot = postDB.docs[postDB.docs.length - 1];

      const startAtPostDB = await dbService
        .collection(`${dbName}`)
        .orderBy("time", "desc")
        .startAt(lastSnapshot.data().time)
        .limit(3)
        .get();

      startAtPostDB.forEach((doc) => {
        const postObj = {
          id: doc.id,
          ...doc.data(),
        };

        setList((prev) => [...prev, postObj]);
      });
    }
  };

  useEffect(() => {
    setList([]);
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return (
    <div className={divClassName}>
      <NavbarBrand>{category}</NavbarBrand>

      <Table id="boardTable" responsive>
        <thead>
          <tr>
            <th colSpan="2">제목</th>
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
              id,
              title,
              comment,
              creatorNickname,
              createdAt,
              views,
              upVote,
              downVote,
            } = item;

            const { downloadTokens } = fileUrl;

            return (
              <>
                <tr key={index}>
                  <td>
                    <img
                      src={`${fileUrl}?alt=media&amp;token=${downloadTokens}`}
                      alt=""
                      width="50px"
                    />
                  </td>
                  <td className="td_title">
                    <Link to={`${id}`}>{title}&nbsp;</Link>
                    <span>{comment.length !== 0 && +comment.length}</span>
                  </td>
                  <td>{creatorNickname}</td>
                  <td>{createdAt}</td>
                  <td>{views}</td>
                  <td>
                    {upVote.length !== 0 && `+${upVote.length}`}&nbsp;
                    {downVote.length !== 0 && `-${downVote.length}`}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>

      {isLoggedIn ? (
        <Button as={Link} to={`/${linkToWrite}`}>
          글쓰기
        </Button>
      ) : null}
    </div>
  );
};

export default Board;
