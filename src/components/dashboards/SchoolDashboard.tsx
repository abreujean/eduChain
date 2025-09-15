import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  School, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Calendar,
  BookOpen,
  Utensils,
  Trophy,
  AlertTriangle
} from 'lucide-react';

export function SchoolDashboard() {
  // Mock data - replace with actual API calls
  const schoolData = {
    name: 'Escola Comunitária Esperança',
    type: 'escola',
    communityType: 'comunitaria',
    eligibilityScore: 78,
    studentsCount: 145,
    totalReceived: 45000,
    lastDistribution: {
      amount: 12000,
      date: '2024-01-10',
      purpose: 'alimentacao'
    }
  };

  const currentMetrics = {
    studentsEnrolled: 145,
    dailyAttendanceAvg: 87,
    mealsServed: 3480,
    foodSecurityIndex: 0.85,
    teacherTrainingHours: 24,
    managementScore: 0.78,
    communityParticipation: 0.92
  };

  const upcomingDeadlines = [
    { type: 'Métricas Mensais', date: '2024-01-31', description: 'Envio das métricas de Janeiro' },
    { type: 'Relatório Trimestral', date: '2024-02-15', description: 'Relatório de impacto Q4 2023' },
    { type: 'Capacitação', date: '2024-02-05', description: 'Workshop de Gestão Escolar' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-secondary rounded-xl p-6 text-secondary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{schoolData.name}</h1>
            <p className="text-secondary-foreground/90">
              Transformando vidas através da educação de qualidade
            </p>
            <div className="flex items-center gap-4 mt-3">
              <Badge variant="outline" className="text-secondary-foreground border-secondary-foreground/30">
                {schoolData.studentsCount} estudantes
              </Badge>
              <Badge variant="outline" className="text-secondary-foreground border-secondary-foreground/30">
                Score: {schoolData.eligibilityScore}/100
              </Badge>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-sm text-secondary-foreground/80">Última Distribuição</p>
              <p className="font-semibold text-xl">R$ {schoolData.lastDistribution.amount.toLocaleString()}</p>
              <p className="text-sm">{schoolData.lastDistribution.date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Eligibility Score */}
      <Card className="impact-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-accent" />
            Score de Elegibilidade
          </CardTitle>
          <CardDescription>
            Seu desempenho atual e áreas de melhoria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-accent">{schoolData.eligibilityScore}/100</span>
                <Badge variant={schoolData.eligibilityScore >= 80 ? 'default' : schoolData.eligibilityScore >= 60 ? 'secondary' : 'destructive'}>
                  {schoolData.eligibilityScore >= 80 ? 'Excelente' : schoolData.eligibilityScore >= 60 ? 'Bom' : 'Precisa Melhorar'}
                </Badge>
              </div>
              <Progress value={schoolData.eligibilityScore} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">
                +5 pontos em relação ao mês anterior
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Frequência Média</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {currentMetrics.dailyAttendanceAvg}%
            </div>
            <p className="text-xs text-muted-foreground">
              Meta: 85% (Atingida!)
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refeições Servidas</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {currentMetrics.mealsServed.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Este mês
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacitação Docente</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {currentMetrics.teacherTrainingHours}h
            </div>
            <p className="text-xs text-muted-foreground">
              Horas de treinamento
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recebido</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              R$ {schoolData.totalReceived.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Desde o cadastro
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Metrics Details and Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Métricas Detalhadas
            </CardTitle>
            <CardDescription>
              Indicadores de desempenho atual
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Segurança Alimentar</span>
              <span className="font-bold text-success">{Math.round(currentMetrics.foodSecurityIndex * 100)}%</span>
            </div>
            <Progress value={currentMetrics.foodSecurityIndex * 100} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Gestão Escolar</span>
              <span className="font-bold text-secondary">{Math.round(currentMetrics.managementScore * 100)}%</span>
            </div>
            <Progress value={currentMetrics.managementScore * 100} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Participação Comunitária</span>
              <span className="font-bold text-accent">{Math.round(currentMetrics.communityParticipation * 100)}%</span>
            </div>
            <Progress value={currentMetrics.communityParticipation * 100} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-warning" />
              Próximos Prazos
            </CardTitle>
            <CardDescription>
              Atividades e entregas importantes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{deadline.type}</p>
                  <p className="text-xs text-muted-foreground">{deadline.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{deadline.date}</p>
                  <Button size="sm" variant="outline" className="mt-1" onClick={() => window.location.href = '/metrics'}>
                    Ver
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Tarefas mais comuns do seu dia a dia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="hero" className="h-20 flex-col" onClick={() => window.location.href = '/metrics'}>
              <BookOpen className="h-6 w-6 mb-2" />
              Registrar Métricas
            </Button>
            <Button variant="secondary" className="h-20 flex-col" onClick={() => window.location.href = '/teachers'}>
              <Users className="h-6 w-6 mb-2" />
              Gerenciar Professores
            </Button>
            <Button variant="outline" className="h-20 flex-col" onClick={() => window.location.href = '/reports'}>
              <TrendingUp className="h-6 w-6 mb-2" />
              Ver Relatórios
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}