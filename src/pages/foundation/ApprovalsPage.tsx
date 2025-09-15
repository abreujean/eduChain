import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Eye, MapPin, Users, FileText, AlertCircle } from 'lucide-react';

export default function ApprovalsPage() {
  const [selectedSchool, setSelectedSchool] = useState<any>(null);
  const [reviewComment, setReviewComment] = useState('');
  const [schoolStatuses, setSchoolStatuses] = useState<{[key: string]: string}>({});

  // Mock data - schools pending approval
  const pendingSchools = [
    {
      id: 'pending-1',
      name: 'Escola Quilombola Nova Esperança',
      type: 'escola',
      communityType: 'quilombola',
      location: { city: 'Cachoeira', state: 'BA', address: 'Rua das Flores, 123' },
      studentsCount: 145,
      manager: {
        name: 'Maria José Santos',
        email: 'maria.santos@escola.gov.br',
        phone: '(75) 99999-9999'
      },
      infrastructure: {
        hasKitchen: true,
        hasLibrary: false,
        internetAccess: true,
        safeWater: true
      },
      submittedAt: '2024-01-10',
      documents: [
        'Registro da escola',
        'Comprovante de endereço',
        'Lista de alunos',
        'Certidão de regularidade'
      ]
    },
    {
      id: 'pending-2',
      name: 'Creche Indígena Yawanawá',
      type: 'creche',
      communityType: 'indigena',
      location: { city: 'Tarauacá', state: 'AC', address: 'Aldeia Yawanawá' },
      studentsCount: 78,
      manager: {
        name: 'Cacique João Yawanawá',
        email: 'joao@yawanawa.org.br',
        phone: '(68) 98888-8888'
      },
      infrastructure: {
        hasKitchen: true,
        hasLibrary: true,
        internetAccess: false,
        safeWater: true
      },
      submittedAt: '2024-01-08',
      documents: [
        'Ata da assembleia',
        'Registro FUNAI',
        'Lista de crianças',
        'Plano pedagógico'
      ]
    },
    {
      id: 'pending-3',
      name: 'Escola Comunitária Amanhecer',
      type: 'escola',
      communityType: 'comunitaria',
      location: { city: 'São Luís', state: 'MA', address: 'Av. Principal, 456' },
      studentsCount: 198,
      manager: {
        name: 'Pedro Lima Costa',
        email: 'pedro@amanhecer.org',
        phone: '(98) 97777-7777'
      },
      infrastructure: {
        hasKitchen: true,
        hasLibrary: true,
        internetAccess: true,
        safeWater: false
      },
      submittedAt: '2024-01-05',
      documents: [
        'Estatuto social',
        'CNPJ ativo',
        'Registro municipal',
        'Projeto pedagógico'
      ]
    }
  ];

  const getCommunityTypeBadge = (type: string) => {
    switch (type) {
      case 'quilombola': return <Badge variant="outline" className="text-purple-600 border-purple-600">Quilombola</Badge>;
      case 'indigena': return <Badge variant="outline" className="text-orange-600 border-orange-600">Indígena</Badge>;
      case 'comunitaria': return <Badge variant="outline" className="text-blue-600 border-blue-600">Comunitária</Badge>;
      default: return <Badge variant="outline">Indefinido</Badge>;
    }
  };

  const handleApprove = (schoolId: string) => {
    console.log('Aprovando escola:', schoolId, 'Comentário:', reviewComment);
    setSchoolStatuses(prev => ({ ...prev, [schoolId]: 'approved' }));
    setReviewComment('');
    setSelectedSchool(null);
  };

  const handleReject = (schoolId: string) => {
    console.log('Rejeitando escola:', schoolId, 'Comentário:', reviewComment);
    setSchoolStatuses(prev => ({ ...prev, [schoolId]: 'rejected' }));
    setReviewComment('');
    setSelectedSchool(null);
  };

  const getStatusBadgeForSchool = (schoolId: string) => {
    const currentStatus = schoolStatuses[schoolId] || 'pending';
    switch (currentStatus) {
      case 'approved':
        return <Badge className="bg-green-600 text-white cursor-pointer">Aprovado</Badge>;
      case 'rejected':
        return <Badge className="bg-red-600 text-white cursor-pointer">Rejeitado</Badge>;
      case 'pending':
      default:
        return <Badge className="bg-blue-600 text-white cursor-pointer">Pendente</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Aprovações Pendentes</h1>
        <p className="text-muted-foreground">
          Revise e aprove novos cadastros de escolas e creches
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{pendingSchools.length}</div>
            <p className="text-xs text-muted-foreground">Aguardando análise</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Este Mês</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">12</div>
            <p className="text-xs text-muted-foreground">Escolas aprovadas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">3.2</div>
            <p className="text-xs text-muted-foreground">Dias para aprovação</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals List */}
      <div className="space-y-4">
        {pendingSchools.map((school) => (
          <Card key={school.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {school.name}
                    {getCommunityTypeBadge(school.communityType)}
                  </CardTitle>
                  <CardDescription>
                    Enviado em {school.submittedAt} • {school.type === 'escola' ? 'Escola' : 'Creche'}
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <div onClick={() => setSelectedSchool(school)}>
                      {getStatusBadgeForSchool(school.id)}
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Revisar Cadastro</DialogTitle>
                      <DialogDescription>
                        Analisar solicitação de cadastro de {selectedSchool?.name}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="comment">Comentários da Revisão</Label>
                        <Textarea
                          id="comment"
                          placeholder="Adicione comentários sobre a aprovação ou rejeição..."
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <DialogFooter className="gap-2">
                      <Button 
                        variant="destructive"
                        onClick={() => selectedSchool && handleReject(selectedSchool.id)}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Rejeitar
                      </Button>
                      <Button 
                        onClick={() => selectedSchool && handleApprove(selectedSchool.id)}
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Aprovar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <h4 className="font-medium mb-2">Localização</h4>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {school.location.city}/{school.location.state}
                  </div>
                  <p className="text-sm text-muted-foreground">{school.location.address}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Responsável</h4>
                  <p className="text-sm">{school.manager.name}</p>
                  <p className="text-xs text-muted-foreground">{school.manager.email}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Informações</h4>
                  <div className="flex items-center gap-1 text-sm">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    {school.studentsCount} estudantes
                  </div>
                </div>
              </div>

              {/* Infrastructure Status */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Infraestrutura</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={school.infrastructure.hasKitchen ? "default" : "destructive"}>
                    Cozinha: {school.infrastructure.hasKitchen ? 'Sim' : 'Não'}
                  </Badge>
                  <Badge variant={school.infrastructure.hasLibrary ? "default" : "destructive"}>
                    Biblioteca: {school.infrastructure.hasLibrary ? 'Sim' : 'Não'}
                  </Badge>
                  <Badge variant={school.infrastructure.internetAccess ? "default" : "destructive"}>
                    Internet: {school.infrastructure.internetAccess ? 'Sim' : 'Não'}
                  </Badge>
                  <Badge variant={school.infrastructure.safeWater ? "default" : "destructive"}>
                    Água Potável: {school.infrastructure.safeWater ? 'Sim' : 'Não'}
                  </Badge>
                </div>
              </div>

              {/* Documents */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Documentos ({school.documents.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {school.documents.map((doc, index) => (
                    <Badge key={index} variant="outline">
                      <FileText className="h-3 w-3 mr-1" />
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}