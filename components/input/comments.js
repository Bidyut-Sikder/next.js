import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const notificationContext = useContext(NotificationContext);
  const { showNotification, hideNotification } = notificationContext;
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  useEffect(() => {
   if (showComments) {
    setLoading(true);
    fetch(`/api/comments/${eventId}`)
      .then((res) => res.json())
      .then((resData) => {
        setCommentList(resData.data);
        setLoading(false);
      });
   }
  }, [showComments]);

  function addCommentHandler(commentData) {
    showNotification({
      title: " creating...",
      message: "creating new comment.",
      status: "pending",
    });

    fetch(`/api/comments/` + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then((err) => {
          throw new Error(err.message || "something went wrong.");
        });
      })
      .then((data) => {
        showNotification({
          title: "sucess",
          message: "successfully created comment",
          status: "success",
        });
      })
      .catch((err) => {
        showNotification({
          title: "error",
          message: "error  for creating  new comment",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
       {/* {loading && <h1>loading...</h1>} */}
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
     
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !loading&& <CommentList commentsList={commentList} />}
    {showComments&& loading&&<p>Loading</p>}
    </section>
  );
}

export default Comments;
