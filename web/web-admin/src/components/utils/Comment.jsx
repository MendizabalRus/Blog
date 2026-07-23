// Packages

// Style
import style from '../../style/utils/Comment.module.css';

// Files

const Comment = ({ comment, author, publishedAt }) => {
  return (
    <div className={style.Comment}>
      <div className={style.user}>
        <div className={style.profilePic}></div>
        <p>{author}</p>
        <p>{publishedAt}</p>
      </div>
      <p className={style.commentBody}>{comment}</p>
    </div>
  );
};
export default Comment;