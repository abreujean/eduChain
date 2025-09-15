import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface RoleRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export function RoleRoute({ children, allowedRoles }: RoleRouteProps) {
  const { state } = useAuth();

  if (!state.isAuthenticated || !state.user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(state.user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}