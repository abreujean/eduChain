import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'; // Ajuste o caminho se necessário
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'; // Ajuste o caminho se necessário
import { School } from '@/types/school';
import { useToast } from '@/hooks/use-toast';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools: School[];
  walletAddress: string | { address: string };
  walletBalance: string;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose, schools, walletAddress, walletBalance }) => {
  const { toast } = useToast();
  if (!isOpen) return null;

  const totalDonation = schools.reduce((acc, school) => acc + (school.donationInstallmentValue || 0), 0);
  const balance = parseFloat(walletBalance);
  const isBalanceInsufficient = totalDonation > balance;

  const abbreviateWalletAddress = (address: string | { address: string }) => {
    if (!address) return '';
    const addressString = typeof address === 'string' ? address : address.address;
    if (!addressString) return '';
    return `${addressString.slice(0, 6)}...${addressString.slice(-4)}`;
  };

  const handleConfirmDonation = () => {
    const donationData = {
      walletAddress,
      totalDonation,
      schoolDonations: schools.map(school => ({
        schoolAddress: school.walletAddress, // Supondo um walletAddress por escola
        value: school.donationInstallmentValue,
      })),
    };
    console.log('Dados da doação a serem enviados:', donationData);
    toast({ title: 'Sucesso!', description: 'Sua doação foi confirmada.' });
    onClose(); // Fecha o modal após a confirmação
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmar Doação</DialogTitle>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle>Resumo da Doação</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Você está doando da carteira: <span className="font-mono text-sm">{abbreviateWalletAddress(walletAddress)}</span></p>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Escolas a Receber</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Escola</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schools.map(school => (
                    <TableRow key={school.id}>
                      <TableCell>{school.name}</TableCell>
                      <TableCell className="text-right">${school.donationInstallmentValue.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="text-xl font-bold my-4 text-right">
              Valor Total da Doação: ${totalDonation.toFixed(2)}
            </div>
            {isBalanceInsufficient && (
              <p className="text-red-500 text-sm text-center mt-2">
                Saldo insuficiente para realizar esta doação.
              </p>
            )}
          </CardContent>
        </Card>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleConfirmDonation} disabled={isBalanceInsufficient}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;