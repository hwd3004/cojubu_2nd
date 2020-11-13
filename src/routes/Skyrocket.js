import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { NavbarBrand, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "scss/Skyrocket.scss";

const Skyrocket = () => {
  const [list, setList] = useState([]);

  const getPost = async () => {
    // https://stackoverflow.com/questions/54244722/firestore-invalid-query-am-i-using-indexing-wrong

    // https://firebase.google.com/docs/firestore/query-data/order-limit-data
    // where() 필터를 orderBy() 및 limit()와 결합할 수 있습니다. 다음 예시의 쿼리에서는 인구 기준을 정의하고,
    // 인구를 오름차순으로 정렬하며, 기준을 초과하는 처음 몇 개의 결과만 반환합니다.
    // 그러나 필터에 범위 비교(<, <=, >, >=)가 포함된 경우 동일한 필드를 기준으로 1차 정렬이 이루어져야 합니다.

    const postDB = await dbService
      .collection("PostDB")
      .where("upVote", ">=", 0)
      .orderBy("upVote")
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
    <div className="Skyrocket">
      <NavbarBrand>떡상 게시판</NavbarBrand>

      <Table id="skyrocketTable" responsive>
        <thead>
          <tr>
            <th>카테고리</th>
            <th colspan="2">제목</th>
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
    </div>
  );
};

export default Skyrocket;
