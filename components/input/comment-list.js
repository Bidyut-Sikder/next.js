import classes from "./comment-list.module.css";

function CommentList({ commentsList=[] }) {
  console.log(commentsList);
  
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}

       {commentsList.length > 0 ? (
        commentsList.map((item) => {
          return (
            <li key={item._id}>
              <p>{item.text}</p>
              <div>
                By <address>{item.name}</address>
              </div>
            </li>
          );
        })
      ) : (
        <p>No data</p>
      )} 
    </ul>
  );
}

export default CommentList;
