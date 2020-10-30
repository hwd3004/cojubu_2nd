import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";

const Coin = ({ isLoggedIn }) => {
  // const getNweets = async () => {
  //     const dbNweets = await dbService.collection("nweets").get();
  //     // dbNweets.forEach( (document) => console.log(document.data()) )

  //     dbNweets.forEach( (document) => {
  //         const nweetObject = {
  //             ...document.data(),
  //             id : document.id,
  //         }
  //         // setNweets( (prev) => [nweetObject, ...prev] )
  //         setNweets( (prev) => [...prev, nweetObject] )
  //     } )
  // }

  // useEffect(() => {
  //     getNweets();
  //     dbService.collection("nweets").onSnapshot( snapshot => {
  //         console.log("something happened")
  //     } )
  // }, [])

  const match = useRouteMatch();

  const [something, setSomething] = useState({});

  useEffect(() => {
    const { path } = match;

    if (path === "/Coin") {
      setSomething({
        DB_NAME: "CoinPostDB",
        DIV_CLASS_NAME: "Coin",
        CATEGORY: "코인",
        LINK_WRITE: "CoinPostWrite",
      });
    } else if (path === "/Stock") {
      setSomething({
        DB_NAME: "StockPostDB",
        DIV_CLASS_NAME: "Stock",
        CATEGORY: "주식",
        LINK_WRITE: "StockPostWrite",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { DIV_CLASS_NAME, CATEGORY, LINK_WRITE } = something;

  return (
    <div className={`${DIV_CLASS_NAME}`}>
      <div>{CATEGORY}</div>
      <div>글목록</div>

      {isLoggedIn ? (
        <Button as={Link} to={`${LINK_WRITE}`}>
          글쓰기
        </Button>
      ) : (
        <div>글못씀</div>
      )}
    </div>
  );
};

export default Coin;
