//import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
  isAuthenticated?: boolean;
  userRoles?: string[];
  roles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  //const hasAccess = roles.some((role) => userRoles.includes(role));

  //if (!isAuthenticated || !hasAccess) return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
