import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { NavbarBrand, Pagination, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "scss/Skyrocket.scss";

const Skyrocket = () => {
  const [totalList, setTotalList] = useState([]);
  const [sortedList, setSortedList] = useState([]);

  const getPost = async () => {
    const arrayPostDB = ["CoinPostDB", "StockPostDB"];

    for (let i = 0; i < arrayPostDB.length; i++) {
      const dbName = arrayPostDB[i];

      const postDB = await dbService
        .collection(`${dbName}`)
        .where("upVote", ">=", 0)
        .orderBy("upVote")
        .orderBy("time", "desc")
        .limit(1)
        .get();

      // const lastSnapshotCoin = coinPostDB.docs[coinPostDB.docs.length - 1];
      const lastSnapshot = postDB.docs[postDB.docs.length - 1];

      const startAtPostDB = await dbService
        .collection(`${dbName}`)
        .orderBy("time", "desc")
        .startAt(lastSnapshot.data().time)
        .limit(2)
        .get();

      startAtPostDB.forEach((doc) => {
        const postObj = {
          ...doc.data(),
        };

        setTotalList((prev) => [...prev, postObj]);
      });
    }

    // eslint-disable-next-line no-unused-vars
    const log = () => {
      // https://stackoverflow.com/questions/54244722/firestore-invalid-query-am-i-using-indexing-wrong
      // https://firebase.google.com/docs/firestore/query-data/order-limit-data
      // where() 필터를 orderBy() 및 limit()와 결합할 수 있습니다. 다음 예시의 쿼리에서는 인구 기준을 정의하고,
      // 인구를 오름차순으로 정렬하며, 기준을 초과하는 처음 몇 개의 결과만 반환합니다.
      // 그러나 필터에 범위 비교(<, <=, >, >=)가 포함된 경우 동일한 필드를 기준으로 1차 정렬이 이루어져야 합니다.
      //
      // const postDB = await dbService
      //   .collection("PostDB")
      //   .where("upVote", ">=", 0)
      //   .orderBy("upVote")
      //   .orderBy("time", "desc")
      //   .limit(1);
      //
      // const snapshot = await postDB.get();
      //
      // const last = snapshot.docs[snapshot.docs.length - 1];
      //
      // const startAtSnapshot = await dbService
      //   .collection("PostDB")
      //   .orderBy("time", "desc")
      //   .startAfter(last.data().time)
      //   .limit(3)
      //   .get();
      //
      // // 맥스사이즈를 구해서 원하는 숫자로 나눠서 페이지 나누기를
      // // 하려면 게시판 접속시 DB 조회를 2번 해야하는데...
      // // 비용적인 측면에서도 그렇고... 비효율적인거같다
      // // await console.log(postDB.size);
      //
      //
      //
      //
      //
      // const coinPostDB = await dbService
      //   .collection("CoinPostDB")
      //   .where("upVote", ">=", 0)
      //   .orderBy("upVote")
      //   .orderBy("time", "desc")
      //   .limit(1)
      //   .get();
      //
      // const stockPostDB = await dbService
      //   .collection("StockPostDB")
      //   .where("upVote", ">=", 0)
      //   .orderBy("upVote")
      //   .orderBy("time", "desc")
      //   .limit(1)
      //   .get();
      //
      // //
      // //
      // //
      //
      // const lastSnapshotCoin = coinPostDB.docs[coinPostDB.docs.length - 1];
      // // console.log(coinPostDB.docs[0].data());
      //
      // const lastSnapshotStock = stockPostDB.docs[stockPostDB.docs.length - 1];
      //
      // //
      // //
      // //
      //
      // const startAtCoinPostDB = await dbService
      //   .collection("CoinPostDB")
      //   .orderBy("time", "desc")
      //   .startAt(lastSnapshotCoin.data().time)
      //   .limit(2)
      //   .get();
      //
      // const startAtStockPostDB = await dbService
      //   .collection("StockPostDB")
      //   .orderBy("time", "desc")
      //   .startAt(lastSnapshotStock.data().time)
      //   .limit(2)
      //   .get();
      //
      // //
      // //
      // //
      //
      // startAtCoinPostDB.forEach((doc) => {
      //   const postObj = {
      //     ...doc.data(),
      //   };
      //
      //   setTotalList((prev) => [...prev, postObj]);
      // });
      //
      // startAtStockPostDB.forEach((doc) => {
      //   const postObj = {
      //     ...doc.data(),
      //   };
      //
      //   setTotalList((prev) => [...prev, postObj]);
      // });
    };
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //
  //
  //

  // 구글 검색 - useeffect console.log undefined
  // Fetching data in React's useEffect() returns “undefined”
  // https://stackoverflow.com/questions/58934643/fetching-data-in-reacts-useeffect-returns-undefined

  // 구글 검색 - useeffect usestate array sort
  // Sort the obj in array By React useEffect method
  // https://stackoverflow.com/questions/62993051/sort-the-obj-in-array-by-react-useeffect-method

  useEffect(() => {
    const sorted = [...totalList].sort((a, b) => b.time - a.time);

    setSortedList(sorted);
  }, [totalList]);

  //
  //
  //

  return (
    <div className="Skyrocket">
      <NavbarBrand>떡상 게시판</NavbarBrand>

      <Table id="skyrocketTable" responsive>
        <thead>
          <tr>
            <th>카테고리</th>
            <th colSpan="2">제목</th>
            <th>글쓴이</th>
            <th>날짜</th>
            <th>조회수</th>
            <th>추천</th>
          </tr>
        </thead>
        <tbody>
          {sortedList.map((item, index) => {
            const {
              fileUrl,
              title,
              creatorNickname,
              createdAt,
              upVote,
              id,
              views,
              comment,
              category,
            } = item;

            const { downloadTokens } = fileUrl;

            return (
              <tr key={index}>
                <td>{category}</td>
                <td>
                  <img
                    src={`${fileUrl}?alt=media&amp;token=${downloadTokens}`}
                    width="50px;"
                    alt=""
                  />
                </td>
                <td className="td_title">
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
            );
          })}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Item>1</Pagination.Item>
        <Pagination.Item>2</Pagination.Item>
      </Pagination>
    </div>
  );
};

export default Skyrocket;
