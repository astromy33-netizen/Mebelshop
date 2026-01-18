import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AdminGuard = ({ children }) => {
  const { user } = useAuth();
  return user?.role === 'admin' ? children : <Navigate to="/" replace />;
};
