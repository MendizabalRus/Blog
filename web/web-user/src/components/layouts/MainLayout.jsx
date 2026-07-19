// Packages
import { Outlet } from 'react-router';

// Style
import style from '../../style/layouts/MainLayout.module.css';

// Files
import Header from '../utils/Header.jsx';

const MainLayout = () => {
  return (
    <div className={style.MainLayout}>
      <Header />
      <div className={style.sections}>
        <section></section>
        <section><Outlet /></section>
        <section></section>
      </div>
    </div>
  );
};
export default MainLayout;
