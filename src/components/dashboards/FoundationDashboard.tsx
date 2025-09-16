import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useStellarBalance from '@/hooks/useStellarBalance';
import { useXLMPrice } from '@/hooks/useXLMPrice';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FiatWithXLM } from '@/components/common/FiatWithXLM';
import { 
  TrendingUp, 
  Users, 
  School, 
  DollarSign, 
  Heart, 
  BookOpen, 
  Utensils, 
  Award,
  CheckCircle,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { ApprovedSchoolsList } from './ApprovedSchoolsList';
import DonationDashboard from './DonationDashboard';

interface School {
  id: string;
  name: string;
  state: string;
  city: string;
  donationInstallmentValue: number;
  walletAddress: string;
  lastMetric: string;
  nextDistribution: string;
  responsible: string;
  installmentsPaid: number;
  lastPaymentDate: Date;
  location: string;
  communityType: string;
  students: number;
}

interface FoundationDashboardProps {
  isWalletConnected: boolean;
  walletPublicKey: string | null;
}

export function FoundationDashboard({ isWalletConnected, walletPublicKey }: FoundationDashboardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { balance, loading, error } = useStellarBalance(walletPublicKey);
  const { data: xlmPrice, isLoading: isXlmPriceLoading } = useXLMPrice();
  const [balanceInBRL, setBalanceInBRL] = useState<number | null>(null);
  const [approvedSchools, setApprovedSchools] = useState<School[]>([]);

  useEffect(() => {
    if (balance && xlmPrice) {
      setBalanceInBRL(parseFloat(balance) * xlmPrice);
    }
  }, [balance, xlmPrice]);

  useEffect(() => {
    console.log('FoundationDashboard isWalletConnected:', isWalletConnected);
    console.log('Dashboard - walletPublicKey:', walletPublicKey);
  }, [isWalletConnected, walletPublicKey]);

  useEffect(() => {
    const fetchApprovedSchools = async () => {
      try {
        const response = await fetch('http://localhost:8000/institutions');
        if (!response.ok) {
          throw new Error('Failed to fetch approved schools');
        }
        const data = await response.json();
        // Mapeie os dados da API para o formato esperado pelo componente
        const formattedSchools = data.map((school: any) => ({
          id: school.id,
          name: school.name,
          state: school.state,
          city: school.city,
          donationInstallmentValue: school.installment_value,
          walletAddress: school.stellar_wallet,
          lastMetric: new Date().toISOString().split('T')[0], // Placeholder
          nextDistribution: new Date().toISOString().split('T')[0], // Placeholder
          responsible: school.manager_id || 'N/A', // Placeholder
          installmentsPaid: 0, // Placeholder
          lastPaymentDate: new Date(), // Placeholder
          location: `${school.city}, ${school.state}`,
          communityType: school.type, 
          students: school.student_count,
        }));
        setApprovedSchools(formattedSchools);
      } catch (error) {
        console.error('Error fetching approved schools:', error);
        // Você pode definir um estado de erro aqui para exibir uma mensagem na UI
      }
    };

    fetchApprovedSchools();
  }, []);

  // Mock data for approved schools, simulating an API call
  /*
  const approvedSchools = [
    {
      id: '1',
      name: 'Escola Municipal Fundamental Centro de Ensino',
      state: 'São Paulo',
      city: 'São Paulo',
      donationInstallmentValue: 1000,
      walletAddress: 'GABC...XYZ',
      lastMetric: '2024-07-20',
      nextDistribution: '2024-08-15',
      responsible: 'Maria Silva',
      // Adicionando os campos que faltam
      installmentsPaid: 10,
      lastPaymentDate: new Date('2025-07-15'),
      location: 'São Paulo, Brasil',
      communityType: 'Urbana',
      students: 300
    },
    {
      id: '2',
      name: 'Escola Estadual de Ensino Médio Pasqualini',
      state: 'Rio de Janeiro',
      city: 'Rio de Janeiro',
      donationInstallmentValue: 1500,
      walletAddress: 'GDEF...UVW',
      lastMetric: '2024-07-18',
      nextDistribution: '2024-08-15',
      responsible: 'João Costa',
      // Adicionando os campos que faltam
      installmentsPaid: 8,
      lastPaymentDate: new Date('2024-07-20'),
      location: 'Rio de Janeiro, Brasil',
      communityType: 'Urbana',
      students: 500
    },
    {
      id: '3',
      name: 'Colégio de Aplicação da Universidade Federal',
      state: 'Minas Gerais',
      city: 'Belo Horizonte',
      donationInstallmentValue: 1200,
      walletAddress: 'GHIJ...RST',
      lastMetric: '2024-07-22',
      nextDistribution: '2024-08-20',
      responsible: 'Ana Souza',
      // Adicionando os campos que faltam
      installmentsPaid: 12,
      lastPaymentDate: new Date('2024-07-25'),
      location: 'Belo Horizonte, Brasil',
      communityType: 'Urbana',
      students: 450
    },
  ];
  */

  // Mock data
  const mockData = {
    totalFunds: 2500000,
    totalSchools: 127,
    monthlyDistributions: 89000,
    activeStudents: 8543,
  };

  const recentDistributions = [
    {
      id: 'dist-1',
      schoolId: 'school-1',
      schoolName: 'Escola Quilombola São José',
      amount: 15000,
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 'dist-2',
      schoolId: 'school-2',
      schoolName: 'Creche Indígena Tabajaras',
      amount: 8500,
      date: '2024-01-14',
      status: 'pending'
    },
    {
      id: 'dist-3',
      schoolId: 'school-3',
      schoolName: 'Escola Comunitária Esperança',
      amount: 12000,
      date: '2024-01-13', 
      status: 'completed'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('total_resources')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isWalletConnected ? (
              loading || isXlmPriceLoading ? (
                <p className="text-sm text-muted-foreground">{t('loading_balance')}</p>
              ) : error ? (
                <p className="text-sm text-destructive">{error}</p>
              ) : balance !== null && balanceInBRL !== null ? (
                <>
                  <FiatWithXLM amountBRL={balanceInBRL} className="text-success" />
                  <p className="text-xs text-muted-foreground">{t('current_wallet_balance')} XLM</p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">{t('loading_balance')}</p> // Exibe enquanto busca o saldo
              )
            ) : (
              <p className="text-sm text-muted-foreground">{t('wallet_not_connected')}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('monthly_distributions')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <FiatWithXLM amountBRL={mockData.monthlyDistributions} className="text-primary" />
            <p className="text-xs text-muted-foreground">{t('this_month')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('active_schools')}</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{mockData.totalSchools}</div>
            <p className="text-xs text-muted-foreground">{t('new_schools')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('active_students')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{mockData.activeStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{t('average_attendance')}</p>
          </CardContent>
        </Card>
      </div>

       {/* Donation Dashboard */}
      <div className="mt-6">
        <DonationDashboard schools={approvedSchools} walletBalance={balance} />
      </div>


      {/* Approved Schools List */}
      <div className="mt-6">
        <ApprovedSchoolsList schools={approvedSchools} />
      </div>

      {/* Actions and Distributions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              {t('necessary_actions')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg">
              <Badge className="bg-blue-600 text-white">5</Badge>
              <div className="flex-1">
                <p className="text-sm font-medium">{t('schools_pending_approval')}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate('/approvals')}>{t('view')}</Button>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-destructive/10 rounded-lg">
              <Badge className="bg-red-600 text-white">2</Badge>
              <div className="flex-1">
                <p className="text-sm font-medium">{t('overdue_metrics')}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate('/analytics')}>{t('view')}</Button>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
              <Badge className="bg-green-600 text-white">8</Badge>
              <div className="flex-1">
                <p className="text-sm font-medium">{t('approved_distributions')}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate('/distributions')}>{t('view')}</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-success" />
              {t('recent_distributions')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentDistributions.map((distribution) => (
              <div key={distribution.id} className="flex items-center justify-between py-2">
                <div>
                  <Link 
                    to={`/schools/${distribution.schoolId}`}
                    className="font-medium hover:text-primary transition-colors cursor-pointer"
                  >
                    {distribution.schoolName}
                  </Link>
                  <p className="text-sm text-muted-foreground">{distribution.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-success">R$ {distribution.amount.toLocaleString()}</span>
                  <Badge className={distribution.status === 'completed' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}>
                    {distribution.status === 'completed' ? 'Concluída' : 'Pendente'}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}