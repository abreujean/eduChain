import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FiatWithXLM } from '@/components/common/FiatWithXLM';
import { DollarSign, Send, CheckCircle, Clock, XCircle, Eye, Plus } from 'lucide-react';

export default function DistributionsPage() {
  const navigate = useNavigate();
  const [selectedSchool, setSelectedSchool] = useState('');
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [notes, setNotes] = useState('');

  // Mock data - distribution history
  const distributions = [
    {
      id: 'dist-1',
      schoolId: 'school-1',
      schoolName: 'Escola Quilombola São José',
      amount: 15000,
      currency: 'BRL',
      purpose: 'alimentacao',
      distributionDate: '2024-01-15',
      status: 'completed',
      transactionHash: '0xabc123...',
      eligibilityScore: 85
    },
    {
      id: 'dist-2',
      schoolId: 'school-2',
      schoolName: 'Creche Indígena Tabajaras',
      amount: 8500,
      currency: 'BRL',
      purpose: 'infraestrutura',
      distributionDate: '2024-01-14',
      status: 'pending',
      transactionHash: null,
      eligibilityScore: 72
    },
    {
      id: 'dist-3',
      schoolId: 'school-3',
      schoolName: 'Escola Comunitária Esperança',
      amount: 12000,
      currency: 'BRL',
      purpose: 'capacitacao',
      distributionDate: '2024-01-13',
      status: 'completed',
      transactionHash: '0xdef456...',
      eligibilityScore: 91
    },
    {
      id: 'dist-4',
      schoolId: 'school-4',
      schoolName: 'Creche Vila Nova',
      amount: 6000,
      currency: 'BRL',
      purpose: 'alimentacao',
      distributionDate: '2024-01-12',
      status: 'failed',
      transactionHash: null,
      eligibilityScore: 58
    }
  ];

  // Mock schools for dropdown
  const availableSchools = [
    'Escola Quilombola São José',
    'Creche Indígena Tabajaras',
    'Escola Comunitária Esperança',
    'Creche Vila Nova',
    'Escola Aldeia Sagrada'
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-green-600 text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Concluída
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-blue-600 text-white">
            <Clock className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-red-600 text-white">
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

  const handleExecuteDistribution = () => {
    console.log('Executando distribuição:', { selectedSchool, amount, purpose, notes });
    // Here you would make an API call to execute the distribution
    
    // Reset form
    setSelectedSchool('');
    setAmount('');
    setPurpose('');
    setNotes('');
  };

  const totalDistributed = distributions
    .filter(d => d.status === 'completed')
    .reduce((sum, d) => sum + d.amount, 0);

  const pendingAmount = distributions
    .filter(d => d.status === 'pending')
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Distribuições de Recursos</h1>
          <p className="text-muted-foreground">
            Gerencie e execute distribuições para as escolas da rede
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Distribuição
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Executar Distribuição</DialogTitle>
              <DialogDescription>
                Envie recursos para uma escola da rede EduChain
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="school">Escola Destinatária</Label>
                <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma escola" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSchools.map((school) => (
                      <SelectItem key={school} value={school}>
                        {school}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="amount">Valor (R$)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="purpose">Finalidade</Label>
                <Select value={purpose} onValueChange={setPurpose}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a finalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alimentacao">Alimentação Escolar</SelectItem>
                    <SelectItem value="capacitacao">Capacitação de Professores</SelectItem>
                    <SelectItem value="infraestrutura">Infraestrutura</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  placeholder="Adicione observações sobre esta distribuição..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                onClick={handleExecuteDistribution}
                disabled={!selectedSchool || !amount || !purpose}
              >
                <Send className="h-4 w-4 mr-2" />
                Executar Distribuição
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Distribuído</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <FiatWithXLM amountBRL={totalDistributed} className="text-success" />
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <FiatWithXLM amountBRL={pendingAmount} className="text-warning" />
            <p className="text-xs text-muted-foreground">Aguardando processamento</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Escolas Atendidas</CardTitle>
            <CheckCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {new Set(distributions.filter(d => d.status === 'completed').map(d => d.schoolName)).size}
            </div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>
      </div>

      {/* Distributions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Distribuições</CardTitle>
          <CardDescription>
            Visualize todas as distribuições realizadas e seu status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Escola</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Finalidade</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {distributions.map((distribution) => (
                  <TableRow key={distribution.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{distribution.schoolName}</p>
                        {distribution.transactionHash && (
                          <p className="text-xs text-muted-foreground">
                            {distribution.transactionHash}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-success">
                        R$ {distribution.amount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      {getPurposeBadge(distribution.purpose)}
                    </TableCell>
                    <TableCell>{distribution.distributionDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{distribution.eligibilityScore}/100</Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(distribution.status)}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/schools/${distribution.schoolId}`)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Ver
                      </Button>
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