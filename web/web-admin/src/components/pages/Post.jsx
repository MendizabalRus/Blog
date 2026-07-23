// Packages
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

// Style
import style from '../../style/pages/Post.module.css';

// Files
import WriteComment from '../utils/WriteComment.jsx';
import Comment from '../utils/Comment.jsx';

const Post = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const { postId } = useParams();

  // Get post

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/posts/${postId}`,
          {
            method: 'GET',
          },
        );

        const result = await response.json();
        setPost(result);
      } catch (err) {
        console.error(err);
      }
    };

    getPost();
  }, [postId]);

  // Get post comments

  useEffect(() => {
    const getComments = async () => {
      const response = await fetch(
        `http://localhost:8080/api/posts/${postId}/comments`,
        {
          method: 'GET',
        },
      );

      const result = await response.json();
      setComments(result);
    };

    getComments();
  }, [postId]);

  return (
    <div className={style.postPage}>
      <section className={style.Post}>
        <h1>{post.title}</h1>
        <div>{post.body}</div>
      </section>
      <section className={style.comments}>
        <WriteComment postId={postId} />
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment.body}
            author={comment.user.username}
            publishedAt={comment.createdAt}
          />
        ))}
      </section>
    </div>
  );
};
export default Post;
