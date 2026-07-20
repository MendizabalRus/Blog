// Packages
import { useState, useEffect } from 'react';

// Style
import style from '../../style/pages/Dashboard.module.css';

// Files
import Button from '../../../../shared/utils/Button.jsx';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const handleGetAllPusblishedPosts = async () => {
      const response = await fetch(
        'http://localhost:8080/api/posts/published',
        {
          method: 'GET',
        },
      );

      const result = await response.json();

      setPosts(result);
    };

    handleGetAllPusblishedPosts();
  }, []);

  return (
    <div className={style.Dashboard}>
      <section className={style.left}>
        <h1>Posts</h1>
        {posts.map((post) => {
          return (
            <PostPreview
              title={post.title}
              publishDate={post.createdAt}
              comments={post.comments}
            />
          );
        })}
        <PostPreview
              title="Paper and ink: the first step to a well structured project"
              publishDate="06-07-2026"
              comments="45"
            />
      </section>
      <div className={style.right}>
        <section className={style.new}>
          <h1>Feeling inspired?</h1>
          <Button value="Write a post!" />
        </section>
        <section className={style.kpis}>
            <Kpi title="Posts" data="7"/>
            <Kpi title="Comments" data="47" />
            <Kpi title="Users" data="183" />
            <Kpi title="Random" data="88"/>
        </section>
      </div>
    </div>
  );
};
export default Dashboard;

const PostPreview = ({ title, publishDate, comments }) => {
  return (
    <div className={style.PostPreview}>
      <h3>{title}</h3>
      <div className={style.info}>
        <p>Comments: {comments}</p>
        <p>Published: {publishDate}</p>
      </div>
    </div>
  );
};

const Kpi = ({ title, data }) => {
    return(
        <section className={style.Kpi}>
            <h2>{title}</h2>
            <h1>{data}</h1>
        </section>
    )
}