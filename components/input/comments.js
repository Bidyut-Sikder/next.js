import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const [commentList, setCommentList] = useState([]);

  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  useEffect(() => {
    fetch(`/api/comments/${eventId}`)
      .then((res) => res.json())
      .then((resData) => {
        setCommentList(resData.data);
      });
  }, [showComments]);

  function addCommentHandler(commentData) {
    // send data to API
   // console.log(commentData);

    fetch(`/api/comments/` + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        // console.log(resData);
      });

    // fetch(`/api/comments/${eventId}`)
    //   .then((res) => res.json())
    //   .then((resData) => {
    //     console.log(resData);

    //   });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList commentsList={commentList} />}
    </section>
  );
}  

export default Comments;
