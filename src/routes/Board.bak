import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { Button, NavbarBrand, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { Link, useLocation, useParams, useRouteMatch } from "react-router-dom";

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

  let divClassName, category, linkToWrite;

  switch (path) {
    case "/Coin":
      divClassName = "Coin";
      category = "코인";
      linkToWrite = "CoinPostWrite";
      break;

    case "/Stock":
      divClassName = "Stock";
      category = "주식";
      linkToWrite = "StockPostWrite";
      break;

    default:
      alert("Board.js executed switch default.");
      break;
  }

  // console.log(divClassName);
  // console.log(category);

  const getPost = async () => {
    const postDB = await dbService
      .collection("PostDB")
      .where("category", "==", category)
      .orderBy("createdAt", "desc")
      .get();

    await postDB.forEach((doc) => {
      const postObj = {
        id: doc.id,
        ...doc.data(),
      };
      // console.log(postObj);

      setList((prev) => [...prev, postObj]);
    });
  };

  useEffect(() => {
    setList([]);
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return (
    <div className={divClassName}>
      <NavbarBrand>{category}</NavbarBrand>
      <Table responsive>
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
              id,
              title,
              comment,
              creatorNickname,
              createdAt,
              views,
              upVote,
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
                  <td>
                    <Link to={`${id}`}>
                      {title}&nbsp;
                      {comment.length !== 0 && `+${comment.length}`}
                    </Link>
                  </td>
                  <td>{creatorNickname}</td>
                  <td>{createdAt}</td>
                  <td>{views}</td>
                  <td>{upVote !== 0 && upVote}</td>
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
