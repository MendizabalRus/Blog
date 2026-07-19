// Packages
import { Link, useNavigate } from 'react-router';

// Style
import style from '../../style/utils/Header.module.css';

// Files
import { useAuth } from '../../../../shared/context/authContext';
import Button from '../../../../shared/utils/Button.jsx';

const Header = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  return (
    <header className={style.Header}>
      <div>
        <h1>Mendizabal's Blog</h1>
      </div>
      <div className={style.right}>
        <div className={style.links}>
          <Link to={"/"}>Posts</Link>
        </div>
        <div className={style.auth}>
          {!user ? (
            <>
              <Button
                value="Register"
                onClick={() => navigate("/register")}
              />
              <Button
                value="Log in"
                onClick={() => navigate("/login")}
              />
            </>
          ) : (
            <div className={style.userInfo}>
              <h3>{user.username}</h3>
              <div className={style.profilePic}></div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
