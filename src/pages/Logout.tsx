import { useAuthStore } from '@stores/useAuthStore';
import { useUserStore } from '@stores/userStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const logout = useUserStore((state) => state.logout);
  const { updateErrorToken, updateToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    updateErrorToken(null);
    updateToken(null);
    navigate('/login');
  }, [logout, navigate]);

  return <></>;
};

export default Logout;
