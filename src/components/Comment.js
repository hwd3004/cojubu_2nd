import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const Comment = (props) => {
  console.log("props", props);

  const {
    item: {
      commentContent,
      commentCreatedAt,
      commentDownVote,
      commentId,
      commentUpVote,
      commenterNickname,
      commenterUid,
      isDeleted,
      postUrl,
      replyTo,
      unreadReply,
    },
    isLoading,
  } = props;

  return (
    <>
      <ListGroup>
        <ListGroupItem>
          <div className="d-flex">
            <p>{commenterNickname}</p>
            <div className="d-flex ml-auto">
              <p>추천 {commentUpVote} |</p>&nbsp;
              <p>비추 {commentDownVote} |</p>&nbsp;
              <p>{commentCreatedAt}</p>
            </div>
          </div>

          <div>
            {isDeleted ? <span>삭제된 댓글입니다</span> : commentContent}
          </div>
        </ListGroupItem>
      </ListGroup>
    </>
  );
};

export default Comment;
