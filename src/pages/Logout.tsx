import { useUserStore } from '@stores/userStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return <></>;
};

export default Logout;
