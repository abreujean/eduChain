import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Importe o hook
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
  const { t } = useTranslation(); // Inicialize o hook
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
          <h1 className="text-3xl font-bold">{t('distributions_title')}</h1>
          <p className="text-muted-foreground">
            {t('distributions_subtitle')}
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {t('distributions_new_distribution_button')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('distributions_execute_distribution_title')}</DialogTitle>
              <DialogDescription>
                {t('distributions_execute_distribution_description')}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="school">{t('distributions_recipient_school_label')}</Label>
                <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('distributions_select_school_placeholder')} />
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
                <Label htmlFor="amount">{t('distributions_amount_label')}</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="purpose">{t('distributions_purpose_label')}</Label>
                <Select value={purpose} onValueChange={setPurpose}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('distributions_select_purpose_placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alimentacao">{t('distributions_purpose_food')}</SelectItem>
                    <SelectItem value="capacitacao">{t('distributions_purpose_training')}</SelectItem>
                    <SelectItem value="infraestrutura">{t('distributions_purpose_infrastructure')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="notes">{t('distributions_notes_label')}</Label>
                <Textarea
                  id="notes"
                  placeholder={t('distributions_notes_placeholder')}
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
                {t('distributions_execute_distribution_button')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('distributions_total_distributed_card_title')}</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <FiatWithXLM amountBRL={totalDistributed} className="text-success" />
            <p className="text-xs text-muted-foreground">{t('distributions_this_month')}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('distributions_pending_card_title')}</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <FiatWithXLM amountBRL={pendingAmount} className="text-warning" />
            <p className="text-xs text-muted-foreground">{t('distributions_pending_card_subtitle')}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('distributions_schools_served_card_title')}</CardTitle>
            <CheckCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {new Set(distributions.filter(d => d.status === 'completed').map(d => d.schoolName)).size}
            </div>
            <p className="text-xs text-muted-foreground">{t('distributions_this_month')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Distributions Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('distributions_history_table_title')}</CardTitle>
          <CardDescription>
            {t('distributions_history_table_subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('table_header_school')}</TableHead>
                  <TableHead>{t('table_header_amount')}</TableHead>
                  <TableHead>{t('table_header_purpose')}</TableHead>
                  <TableHead>{t('table_header_date')}</TableHead>
                  <TableHead>{t('table_header_score')}</TableHead>
                  <TableHead>{t('table_header_status')}</TableHead>
                  <TableHead>{t('table_header_actions')}</TableHead>
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
                        {t('view_button')}
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