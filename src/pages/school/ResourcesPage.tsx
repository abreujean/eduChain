import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { DollarSign, TrendingUp, Calendar, Eye, Download, Filter, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function ResourcesPage() {
  const [periodFilter, setPeriodFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for distributions received
  const distributions = [
    {
      id: 'dist-1',
      amount: 12000,
      currency: 'BRL',
      purpose: 'alimentacao',
      distributionDate: '2024-01-10',
      status: 'completed',
      transactionHash: '0xabc123def456...',
      eligibilityScoreAtTime: 85,
      description: 'Recursos para alimentação escolar - Janeiro 2024'
    },
    {
      id: 'dist-2',
      amount: 8500,
      currency: 'BRL',
      purpose: 'capacitacao',
      distributionDate: '2023-12-15',
      status: 'completed',
      transactionHash: '0xdef456abc123...',
      eligibilityScoreAtTime: 82,
      description: 'Capacitação de professores - Dezembro 2023'
    },
    {
      id: 'dist-3',
      amount: 15000,
      currency: 'BRL',
      purpose: 'infraestrutura',
      distributionDate: '2023-11-20',
      status: 'completed',
      transactionHash: '0x789xyz456abc...',
      eligibilityScoreAtTime: 78,
      description: 'Melhorias na infraestrutura - Novembro 2023'
    },
    {
      id: 'dist-4',
      amount: 6000,
      currency: 'BRL',
      purpose: 'alimentacao',
      distributionDate: '2023-10-25',
      status: 'completed',
      transactionHash: '0x123abc789def...',
      eligibilityScoreAtTime: 80,
      description: 'Recursos para alimentação escolar - Outubro 2023'
    },
    {
      id: 'dist-5',
      amount: 10000,
      currency: 'BRL',
      purpose: 'infraestrutura',
      distributionDate: '2024-01-25',
      status: 'pending',
      transactionHash: null,
      eligibilityScoreAtTime: 85,
      description: 'Reforma da biblioteca - Janeiro 2024'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="default" className="text-success border-success">
            <CheckCircle className="h-3 w-3 mr-1" />
            Recebido
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="secondary" className="text-warning border-warning">
            <Clock className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Falhou
          </Badge>
        );
      default:
        return <Badge variant="outline">Indefinido</Badge>;
    }
  };

  const getPurposeBadge = (purpose: string) => {
    switch (purpose) {
      case 'alimentacao': return <Badge variant="outline" className="text-green-600 border-green-600">Alimentação</Badge>;
      case 'capacitacao': return <Badge variant="outline" className="text-blue-600 border-blue-600">Capacitação</Badge>;
      case 'infraestrutura': return <Badge variant="outline" className="text-orange-600 border-orange-600">Infraestrutura</Badge>;
      default: return <Badge variant="outline">Outros</Badge>;
    }
  };

  const filteredDistributions = distributions.filter(dist => {
    const matchesPeriod = periodFilter === 'all' || 
      (periodFilter === '2024' && dist.distributionDate.startsWith('2024')) ||
      (periodFilter === '2023' && dist.distributionDate.startsWith('2023'));
    
    const matchesStatus = statusFilter === 'all' || dist.status === statusFilter;
    
    return matchesPeriod && matchesStatus;
  });

  const totalReceived = distributions
    .filter(d => d.status === 'completed')
    .reduce((sum, d) => sum + d.amount, 0);

  const pendingAmount = distributions
    .filter(d => d.status === 'pending')
    .reduce((sum, d) => sum + d.amount, 0);

  const monthlyAverage = totalReceived / 6; // Assuming 6 months of data

  const currentMonth = new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Recursos Recebidos</h1>
        <p className="text-muted-foreground">
          Acompanhe o histórico de recursos recebidos da EduChain Foundation
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recebido</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              R$ {totalReceived.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Desde o cadastro
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Mensal</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              R$ {Math.round(monthlyAverage).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Últimos 6 meses
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendente</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              R$ {pendingAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Aguardando processamento
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Distribuições</CardTitle>
            <Calendar className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {distributions.filter(d => d.status === 'completed').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Concluídas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Progresso do Mês - {currentMonth}
          </CardTitle>
          <CardDescription>
            Recursos recebidos vs. necessidades estimadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Alimentação Escolar</span>
              <span className="font-bold text-success">R$ 12.000 / R$ 15.000</span>
            </div>
            <Progress value={80} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Infraestrutura</span>
              <span className="font-bold text-warning">R$ 0 / R$ 20.000</span>
            </div>
            <Progress value={0} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Capacitação</span>
              <span className="font-bold text-secondary">R$ 0 / R$ 8.000</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os períodos</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="completed">Recebidos</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="failed">Falhou</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Resources History */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Recursos</CardTitle>
          <CardDescription>
            Todas as distribuições recebidas ({filteredDistributions.length} registros)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Finalidade</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Transação</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDistributions.map((distribution) => (
                  <TableRow key={distribution.id}>
                    <TableCell>{distribution.distributionDate}</TableCell>
                    <TableCell>
                      <span className="font-bold text-success">
                        R$ {distribution.amount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      {getPurposeBadge(distribution.purpose)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{distribution.eligibilityScoreAtTime}/100</Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(distribution.status)}
                    </TableCell>
                    <TableCell>
                      {distribution.transactionHash ? (
                        <span className="font-mono text-xs">
                          {distribution.transactionHash.substring(0, 12)}...
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          Ver
                        </Button>
                        {distribution.transactionHash && (
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            Comprovante
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}