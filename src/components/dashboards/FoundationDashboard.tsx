import React from 'react';
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

export function FoundationDashboard() {
  const navigate = useNavigate();

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
            <CardTitle className="text-sm font-medium">Total de Recursos</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <FiatWithXLM amountBRL={mockData.totalFunds} className="text-success" />
            <p className="text-xs text-muted-foreground">+12% vs. mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Distribuições Mensais</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <FiatWithXLM amountBRL={mockData.monthlyDistributions} className="text-primary" />
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Escolas Ativas</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{mockData.totalSchools}</div>
            <p className="text-xs text-muted-foreground">+8 novas escolas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estudantes Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{mockData.activeStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% frequência média</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions and Distributions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Ações Necessárias
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg">
              <Badge className="bg-blue-600 text-white">5</Badge>
              <div className="flex-1">
                <p className="text-sm font-medium">Escolas pendentes de aprovação</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate('/approvals')}>Ver</Button>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-destructive/10 rounded-lg">
              <Badge className="bg-red-600 text-white">2</Badge>
              <div className="flex-1">
                <p className="text-sm font-medium">Métricas em atraso</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate('/analytics')}>Ver</Button>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
              <Badge className="bg-green-600 text-white">8</Badge>
              <div className="flex-1">
                <p className="text-sm font-medium">Distribuições aprovadas</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate('/distributions')}>Ver</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-success" />
              Distribuições Recentes
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