import { Navigate } from 'react-router';

import LogIn from './pages/LogIn.jsx';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Redact from './pages/Redact.jsx';

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
      {
        path: '/redact',
        element: <Redact />,
      },
    ],
  },
];
export default routes;
