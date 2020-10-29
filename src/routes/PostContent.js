import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";

const PostContent = () => {
  const { id } = useParams();
  // console.log("id 타입", typeof id)
  // console.log(id)
  // const location = useLocation();
  // console.log(location)
  const match = useRouteMatch();
  const { path } = match;
  // console.log(path)
  // console.log(typeof path)

  let FIND_DB;

  if (path === "/Coin/:id") {
    FIND_DB = "CoinPostDB";
  } else if (path === "/Stock/:id") {
    FIND_DB = "StockPostDB";
  }

  const [PostContent, SetPostContent] = useState({});

  useEffect(() => {
    dbService
      .collection(`${FIND_DB}`)
      .doc(`${id}`)
      .get()
      .then((doc) => {
        // console.log(doc.data())
        SetPostContent({...doc.data()});
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(PostContent);

  const {
    category,
    comment,
    contents,
    createdAt,
    creatorNickname,
    creatorUid,
    downVote,
    fileUrl,
    title,
    upVote,
    views,
  } = PostContent;

  return (
    // const {  }
    <div className="PostContent">
      <div className="container">
        <p>{category}</p>
        <p>{title}</p>
        <p>{createdAt}</p>
        <p>
          <span>{creatorNickname}</span>
          <span>조회수 {views}</span>
          <span>추천수 {upVote}</span>
          <span>댓글 {comment}</span>
        </p>
        <div>
          {contents}
        </div>
      </div>
    </div>
  );
};

export default PostContent;
