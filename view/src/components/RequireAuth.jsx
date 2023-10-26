import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import authContext from '../contexts/AuthContext';

const RequireAuth = ({ children }) => {
  const authContxt = useContext(authContext);
  if (!authContxt?.user) return <Navigate to={'/login'} />;
  return children;
};

export default RequireAuth;
