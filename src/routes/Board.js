import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { Button, NavbarBrand, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  Link,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import "scss/Board.scss";
import cp2077 from "assets/image/RX cp2077 FanArt.jpg";

const Board = () => {
  // const { isLoggedIn } = useSelector((state) => state.auth);

  const history = useHistory();

  const [list, setList] = useState([]);

  // const params = useParams();
  // const location = useLocation();
  const match = useRouteMatch();

  // console.log("params", params);
  // console.log("location", location);
  // console.log("match", match);

  const { path, params } = match;

  // console.log("params.id", params.id);
  // console.log(typeof params.id);
  // 문자형이라서 숫자로 바꿔주어야한다

  // console.log("path", path);

  let divClassName, category, linkToWrite, dbName;

  switch (path) {
    case "/Coin/page=:id":
      divClassName = "Coin";
      category = "코인";
      linkToWrite = "CoinPostWrite";
      dbName = "CoinPostDB";
      break;

    case "/Stock/page=:id":
      divClassName = "Stock";
      category = "국내주식";
      linkToWrite = "StockPostWrite";
      dbName = "StockPostDB";
      break;

    case "/OsStock/page=:id":
      divClassName = "OsStock";
      category = "해외주식";
      linkToWrite = "OsStockPostWrite";
      dbName = "OsStockPostDB";
      break;

    case "/Free/page=:id":
      divClassName = "Free";
      category = "자유";
      linkToWrite = "FreePostWrite";
      dbName = "FreePostDB";
      break;

    case "/Game/page=:id":
      divClassName = "Game";
      category = "게임";
      linkToWrite = "GamePostWrite";
      dbName = "GamePostDB";
      break;

    default:
      alert("Board.js executed switch default.");
      break;
  }

  const getPost = async () => {
    const nowPageNum = parseInt(params.id);

    let getLimit = 1;

    if (nowPageNum !== 1) {
      getLimit = getLimit * 20;
    }

    const postDB = await dbService
      .collection(`${dbName}`)
      .orderBy("time", "desc")
      .limit(getLimit)
      .get();

    if (postDB.docs.length > 0) {
      const lastSnapshot = postDB.docs[postDB.docs.length - 1];

      const startAtPostDB = await dbService
        .collection(`${dbName}`)
        .orderBy("time", "desc")
        .startAt(lastSnapshot.data().time)
        .limit(20)
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

  const checkEmailVerifiedToPostWrite = () => {
    if (authService.currentUser) {
      authService.currentUser.reload().then(() => {
        if (authService.currentUser.emailVerified) {
          history.push(`/${linkToWrite}`);
        } else {
          alert("이메일 인증이 완료된 사용자만 글쓰기가 가능합니다. alert-2");
        }
      });
    } else {
      alert("이메일 인증이 완료된 사용자만 글쓰기가 가능합니다. alert-1");
    }
  };

  return (
    <div className={divClassName}>
      <NavbarBrand>{category}</NavbarBrand>
      {category === "게임" && (
        <>
          <br></br>
          <img className="boardBanner" src={cp2077} alt="game board logo" />
        </>
      )}

      <br></br>

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
                    <Link to={`/${id}`}>{title}&nbsp;</Link>
                    <span>{comment.length !== 0 && `+${comment.length}`}</span>
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

      {/* <Button as={Link} to={`/${linkToWrite}`}>
        글쓰기
      </Button> */}

      <Button onClick={checkEmailVerifiedToPostWrite}>글쓰기</Button>
    </div>
  );
};

export default Board;
