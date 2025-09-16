import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import DonationModal from './DonationModal';
import { School } from '@/types/school';
import { useAuth } from '@/contexts/AuthContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface DonationDashboardProps {
  schools: School[];
  walletBalance: string;
}

const DonationDashboard: React.FC<DonationDashboardProps> = ({ schools, walletBalance }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state } = useAuth();
  const walletAddress = state.walletPublicKey;

  const handleConfirmDonation = (donations: { schoolId: string; amount: number }[]) => {
    // TODO: Implement donation logic
    console.log('Donations to be confirmed:', donations);
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Faça uma Doação</h2>
          <p className="text-muted-foreground mt-1">
            A sua contribuição ajuda a financiar escolas e transformar vidas.
          </p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  disabled={!walletAddress}
                  className="cursor-pointer"
                >
                  Doar para Escolas
                </Button>
                {!walletAddress && <div className="absolute inset-0" />} 
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Conecte sua carteira para doar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="p-6">
        <DonationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          schools={schools}
          onConfirm={handleConfirmDonation}
          walletBalance={walletBalance}
          walletAddress={walletAddress}
        />
      </div>
    </div>
  );
};

export default DonationDashboard;