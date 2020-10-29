import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";


const Coin = ({ isLoggedIn }) => {
  const [coinList, setCoinList] = useState([]);

  useEffect(() => {
    dbService
      .collection("CoinPostDB")
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCoinList(data);
      });
  }, []);

  return (
    <div className="Coin">
      <div>Coin</div>
      <div>글목록</div>

      <Table>
        {coinList.map((list) => {
          const {
            fileUrl,
            title,
            createdAt,
            creatorNickname,
            comment,
            id,
          } = list;
          return (
            <>
              <tr>
                <td>
                  <img src={fileUrl} alt="" />
                </td>
                <td>
                  <Link to={`/Coin/${id}`}>{title}</Link>
                </td>
                <td>{createdAt}</td>
                <td>{creatorNickname}</td>
                <td>{comment.length}</td>
              </tr>
            </>
          );
        })}
      </Table>

      {isLoggedIn ? (
        <Button as={Link} to="/CoinPost">
          글쓰기
        </Button>
      ) : null}
    </div>
  );
};

export default Coin;
