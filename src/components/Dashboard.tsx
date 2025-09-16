import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FoundationDashboard } from './dashboards/FoundationDashboard';
import { SchoolDashboard } from './dashboards/SchoolDashboard';

const Dashboard = () => {
  const { state } = useAuth();
  const { user, isWalletConnected, walletPublicKey } = state;

  console.log('Dashboard -> isWalletConnected:', isWalletConnected);
  console.log('Dashboard -> walletPublicKey:', walletPublicKey);

  if (!user) {
    return null;
  }

  return state.user.role === 'foundation_manager' ? (
    <FoundationDashboard 
      isWalletConnected={isWalletConnected} 
      walletPublicKey={walletPublicKey} 
    />
  ) : (
    <SchoolDashboard />
  );
}

export default Dashboard;