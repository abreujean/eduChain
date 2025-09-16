import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import DonationModal from './DonationModal';
import { School } from '@/types/school';
import { useAuth } from '@/contexts/AuthContext';

interface DonationDashboardProps {
  schools: School[];
}

const DonationDashboard: React.FC<DonationDashboardProps> = ({ schools }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state } = useAuth();
  const walletAddress = state.walletPublicKey;

  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Faça uma Doação</h2>
          <p className="text-muted-foreground mt-1">
            A sua contribuição ajuda a financiar escolas e transformar vidas.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Doar para Escolas</Button>
      </div>

      <DonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        schools={schools}
        walletAddress={walletAddress || ''}
      />
    </div>
  );
};

export default DonationDashboard;