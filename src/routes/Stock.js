import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";


const Stock = ({ isLoggedIn }) => {
  const [stockList, setStockList] = useState([]);

  useEffect(() => {
    dbService
      .collection("StockPostDB")
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setStockList(data);
      });
  }, []);

  return (
    <div className="Stock">
      <div>Stock</div>
      <div>글목록</div>

      <Table>
        {stockList.map((list) => {
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
                  <Link to={`/Stock/${id}`}>{title}</Link>
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
        <Button as={Link} to="/StockPost">
          글쓰기
        </Button>
      ) : null}
    </div>
  );
};

export default Stock;
