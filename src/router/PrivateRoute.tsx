import { useUserStore } from '@stores/userStore';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
  // isAuthenticated: boolean;
  // userRoles: string[];
  roles?: string[]; //  reqRolesComponent = []
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  //const hasAccess = roles.length ? roles.some((role) => userRoles.includes(role)) : true;
  const { isAuthenticated = false } = useUserStore((state) => state.user);

  if (!isAuthenticated) return <Navigate to="/login" />;
  //if (!hasAccess) return <Navigate to="/unauthorized" />;

  return children;
};

export default PrivateRoute;
