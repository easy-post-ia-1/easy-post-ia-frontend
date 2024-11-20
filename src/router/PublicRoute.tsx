//import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  //if (isAuthenticated && restricted) return <Navigate to="/dashboard" />;

  return children;
};

export default PublicRoute;
