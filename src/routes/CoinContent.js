import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import Coin from "./Coin";

const CoinContent = () => {
  const { id } = useParams();
  const match = useRouteMatch();
  const { path } = match;
  console.log(id);
  console.log(path);

  let DB_NAME, DIV_CLASS_NAME;

  if (path === "/Coin/:id") {
    DB_NAME = "CoinPostDB";
    DIV_CLASS_NAME = "CoinContent";
  } else if (path === "/Stock/:id") {
    DB_NAME = "StockPostDB";
    DIV_CLASS_NAME = "StockContent";
  }

  const [document, setDocument] = useState({});

  const getContent = async () => {
    const contentRef = await dbService.collection(`${DB_NAME}`).doc(`${id}`);

    // eslint-disable-next-line no-unused-vars
    const getDoc = await contentRef.get().then((doc) => {
      //   console.log(doc.data())
      setDocument(doc.data());
    });
  };

  useEffect(() => {
    getContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { contents, title, createdAt, creatorNickname } = document;

  return (
    <>
      <div className={`${DIV_CLASS_NAME}`}>
        <p>{title}</p>
        <p>{createdAt}</p>
        <p>{creatorNickname}</p>
        <div dangerouslySetInnerHTML={{ __html: contents }}></div>
      </div>
      {/* <Coin /> */}
    </>
  );
};

export default CoinContent;
