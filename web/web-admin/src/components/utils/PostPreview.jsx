// Packages

// Style
import style from '../../style/utils/PostPreview.module.css';

// Files
import settingSvg from '../../../../shared/assets/settings.svg';
import editSvg from '../../../../shared/assets/edit.svg';

const PostPreview = ({
  title,
  publishDate,
  comments,
  isPublished,
  navigate, // onClick
  togglePublish, // onClick
}) => {


  return (
    <div onClick={navigate} className={style.PostPreview}>
      <div className={style.top}>
        <h3>{title}</h3>
        <div className={style.buttons}>
          <button onClick={togglePublish}>
            {isPublished ? 'Unpublish' : 'Publish'}
          </button>
          <img src={settingSvg} alt="Settings icon" />
          <img src={editSvg} alt="Editing icon" />
        </div>
      </div>
      <div className={style.bottom}>
        <p>Comments: {comments}</p>
        <p>Published: {publishDate}</p>
      </div>
    </div>
  );
};
export default PostPreview;
