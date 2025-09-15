import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Edit, MapPin, Users, Calendar, Check, X, Wifi, BookOpen, Utensils, Droplets } from 'lucide-react';

export default function SchoolDetailPage() {
  const { id } = useParams();

  // Mock data - replace with actual API call
  const school = {
    id: id || '1',
    name: 'Escola Quilombola São José',
    type: 'escola',
    communityType: 'quilombola',
    location: {
      city: 'Salvador',
      state: 'BA',
      address: 'Rua das Palmeiras, 123',
      zipCode: '40000-000'
    },
    studentsCount: 245,
    managementScore: 87,
    eligibilityScore: 85,
    lastDistribution: {
      amount: 15000,
      date: '2024-01-15',
      purpose: 'Alimentação Escolar'
    },
    manager: {
      name: 'Maria Silva Santos',
      email: 'maria@escola.ba.gov.br',
      phone: '(71) 99999-9999'
    },
    infrastructure: {
      hasKitchen: true,
      hasLibrary: true,
      internetAccess: true,
      safeWater: true
    },
    metrics: {
      attendance: 92,
      retention: 88,
      foodSecurity: 95,
      communityParticipation: 78
    },
    walletAddress: 'GDRXE2BQUC3AZNPVFSCEZ76NJ3WWL25FYFK6RGZGIEKWE4SOOHSUJUJ6',
    createdAt: '2023-08-15',
    lastUpdate: '2024-01-20'
  };

  const getCommunityTypeBadge = (type: string) => {
    switch (type) {
      case 'quilombola': return <Badge className="bg-purple-600 text-white">Quilombola</Badge>;
      case 'indigena': return <Badge className="bg-orange-600 text-white">Indígena</Badge>;
      case 'comunitaria': return <Badge className="bg-blue-600 text-white">Comunitária</Badge>;
      default: return <Badge variant="outline">Indefinido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/schools">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{school.name}</h1>
            <p className="text-muted-foreground">Detalhes completos da escola</p>
          </div>
        </div>
        <Button asChild>
          <Link to={`/schools/${school.id}/edit`}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Link>
        </Button>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Informações Básicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tipo:</span>
              <span className="font-medium">{school.type === 'escola' ? 'Escola' : 'Creche'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Comunidade:</span>
              {getCommunityTypeBadge(school.communityType)}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Estudantes:</span>
              <span className="font-medium">{school.studentsCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Cadastrada em:</span>
              <span className="font-medium">{school.createdAt}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Localização
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">{school.location.address}</p>
              <p className="text-sm text-muted-foreground">
                {school.location.city}/{school.location.state}
              </p>
              <p className="text-sm text-muted-foreground">CEP: {school.location.zipCode}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Última Distribuição
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-2xl font-bold text-success">
                R$ {school.lastDistribution.amount.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">{school.lastDistribution.purpose}</p>
              <p className="text-sm text-muted-foreground">{school.lastDistribution.date}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Métricas de Performance</CardTitle>
            <CardDescription>Indicadores de qualidade e participação</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Frequência Escolar</span>
                <span className="font-bold">{school.metrics.attendance}%</span>
              </div>
              <Progress value={school.metrics.attendance} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Taxa de Retenção</span>
                <span className="font-bold">{school.metrics.retention}%</span>
              </div>
              <Progress value={school.metrics.retention} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Segurança Alimentar</span>
                <span className="font-bold">{school.metrics.foodSecurity}%</span>
              </div>
              <Progress value={school.metrics.foodSecurity} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Participação Comunitária</span>
                <span className="font-bold">{school.metrics.communityParticipation}%</span>
              </div>
              <Progress value={school.metrics.communityParticipation} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Infraestrutura</CardTitle>
            <CardDescription>Recursos e facilidades disponíveis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                <span>Cozinha</span>
              </div>
              {school.infrastructure.hasKitchen ? 
                <Check className="h-5 w-5 text-success" /> : 
                <X className="h-5 w-5 text-destructive" />
              }
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Biblioteca</span>
              </div>
              {school.infrastructure.hasLibrary ? 
                <Check className="h-5 w-5 text-success" /> : 
                <X className="h-5 w-5 text-destructive" />
              }
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                <span>Internet</span>
              </div>
              {school.infrastructure.internetAccess ? 
                <Check className="h-5 w-5 text-success" /> : 
                <X className="h-5 w-5 text-destructive" />
              }
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4" />
                <span>Água Potável</span>
              </div>
              {school.infrastructure.safeWater ? 
                <Check className="h-5 w-5 text-success" /> : 
                <X className="h-5 w-5 text-destructive" />
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Manager and Wallet Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Responsável</CardTitle>
            <CardDescription>Informações do gestor da escola</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">{school.manager.name}</p>
              <p className="text-sm text-muted-foreground">{school.manager.email}</p>
              <p className="text-sm text-muted-foreground">{school.manager.phone}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Carteira Stellar</CardTitle>
            <CardDescription>Endereço para recebimento de recursos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-mono break-all">{school.walletAddress}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}