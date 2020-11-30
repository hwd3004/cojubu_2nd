import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { NavbarBrand, Pagination, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Everything = () => {
  const [totalList, setTotalList] = useState([]);
  const [sortedList, setSortedList] = useState([]);

  const getPost = async () => {
    const arrayPostDB = ["CoinPostDB", "StockPostDB", "OsStockPostDB"];

    for (let i = 0; i < arrayPostDB.length; i++) {
      const dbName = arrayPostDB[i];

      const postDB = await dbService
        .collection(`${dbName}`)
        .orderBy("time", "desc")
        .limit(1)
        .get();

      const lastSnapshot = postDB.docs[postDB.docs.length - 1];

      const startAtPostDB = await dbService
        .collection(`${dbName}`)
        .orderBy("time", "desc")
        .startAt(lastSnapshot.data().time)
        .limit(5)
        .get();

      startAtPostDB.forEach((doc) => {
        const postObj = {
          ...doc.data(),
        };

        setTotalList((prev) => [...prev, postObj]);
      });
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    const sorted = [...totalList].sort((a, b) => b.time - a.time);

    setSortedList(sorted);
  }, [totalList]);

  return (
    <div className="Everything">
      <NavbarBrand>전체 게시판</NavbarBrand>

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
              url,
              views,
              comment,
              category,
            } = item;

            console.log("item?", item);

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
                  <Link to={`${url}`}>{title}&nbsp;</Link>
                  {comment.length !== 0 && `+${comment.length}`}
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

      {/* <Pagination>
        <Pagination.Item>1</Pagination.Item>
        <Pagination.Item>2</Pagination.Item>
      </Pagination> */}
    </div>
  );
};

export default Everything;
