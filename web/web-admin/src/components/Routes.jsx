import { Navigate } from "react-router"

import LogIn from './pages/LogIn.jsx';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import Dashboard from './pages/Dashboard.jsx';

const routes = [
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login', 
    element: <LogIn />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
];
export default routes;
