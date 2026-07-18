// Packages
import { Navigate, Outlet } from 'react-router';

// Files
import { useAuth } from '../../../shared/context/authContext.jsx';

const ProtectedRoutes = () => {
  const { loading, user } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/log-in" replace />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/log-in" replace />;
  }

  return <Outlet />;
};
export default ProtectedRoutes;
