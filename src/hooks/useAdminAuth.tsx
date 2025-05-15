
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const adminAuth = localStorage.getItem('adminAuth');
      const isAuth = adminAuth === 'true';
      
      setIsAuthenticated(isAuth);
      
      if (!isAuth) {
        navigate('/admin');
      }
    };
    
    checkAuth();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    navigate('/admin');
  };

  return { isAuthenticated, logout };
};
