// Packages
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

// Style
import style from '../../style/pages/Dashboard.module.css';

// Files
import PostPreview from "../utils/PostPreview.jsx";
import Button from '../../../../shared/utils/Button.jsx';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const handleGetAllPusblishedPosts = async () => {
      const response = await fetch('http://localhost:8080/api/posts/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer: ${token}`,
        },
      });

      const result = await response.json();

      setPosts(result);
    };

    handleGetAllPusblishedPosts();
  }, [token]);

  const togglePublish = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/posts/${postId}/publish`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={style.Dashboard}>
      <section className={style.new}>
        <h1>Feeling inspired?</h1>
        <Button value="Write a post!" onClick={() => navigate('/redact')} />
      </section>
      <div className={style.records}>
        <section className={style.kpis}>
          <Kpi title="Posts" data="7" />
          <Kpi title="Comments" data="47" />
          <Kpi title="Users" data="183" />
          <Kpi title="Random" data="88" />
        </section>
        <section className={style.posts}>
          <div>
            <h1>Posts</h1>
          </div>
          {posts.map((post) => {
            return (
              <PostPreview
                key={post.id}
                title={post.title}
                publishDate={post.createdAt}
                comments={post.comments}
                isPublished={post.isPublished}
                navigate={() => navigate(`/${post.id}`)}
                togglePublish={() => togglePublish(post.id)}
              />
            );
          })}
        </section>
      </div>
    </div>
  );
};
export default Dashboard;

const Kpi = ({ title, data }) => {
  return (
    <section className={style.Kpi}>
      <h2>{title}</h2>
      <h1>{data}</h1>
    </section>
  );
};
