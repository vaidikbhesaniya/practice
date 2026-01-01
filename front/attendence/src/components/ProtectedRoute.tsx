import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<null | boolean>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    axios.get('/api/check-auth', { withCredentials: true })
      .then(({ data }) => {
        setAuth(!!data.authenticated);
        setChecked(true);
      })
      .catch((err) => {
        console.error('Auth check error:', err);
        setAuth(false);
        setChecked(true);
      });
  }, []);

  if (!checked) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="mt-4 text-gray-600">Checking authentication...</p>
      </div>
    </div>
  );
  if (!auth) return <Navigate to="/signin" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
