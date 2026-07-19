import MainLayout from "./layouts/MainLayout.jsx"
import Home from './pages/Home.jsx';
import Post from './pages/Post.jsx';
import LogIn from './pages/LogIn.jsx';
import Register from './pages/Register.jsx';

const routes = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/post/:postId',
        element: <Post />,
      },
      {
        path: '/login',
        element: <LogIn />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
];
export default routes;
