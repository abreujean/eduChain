import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FoundationDashboard } from '@/components/dashboards/FoundationDashboard';
import { SchoolDashboard } from '@/components/dashboards/SchoolDashboard';

export function Dashboard() {
  const { state } = useAuth();

  if (!state.user) {
    return null;
  }

  return state.user.role === 'foundation_manager' ? (
    <FoundationDashboard />
  ) : (
    <SchoolDashboard />
  );
}