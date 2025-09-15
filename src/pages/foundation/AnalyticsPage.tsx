import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FiatWithXLM } from '@/components/common/FiatWithXLM';
import { TrendingUp, Users, School, DollarSign, Heart, BookOpen, Utensils, Award } from 'lucide-react';

export default function AnalyticsPage() {
  // Mock data for charts
  const distributionsByMonth = [
    { month: 'Jul', amount: 45000, schools: 8 },
    { month: 'Ago', amount: 52000, schools: 12 },
    { month: 'Set', amount: 48000, schools: 10 },
    { month: 'Out', amount: 67000, schools: 15 },
    { month: 'Nov', amount: 71000, schools: 18 },
    { month: 'Dez', amount: 89000, schools: 22 },
    { month: 'Jan', amount: 95000, schools: 25 }
  ];

  const schoolsByType = [
    { name: 'Escolas', value: 78, color: '#3b82f6' },
    { name: 'Creches', value: 49, color: '#10b981' }
  ];

  const communityTypes = [
    { name: 'Comunitárias', value: 65, color: '#6366f1' },
    { name: 'Quilombolas', value: 38, color: '#8b5cf6' },
    { name: 'Indígenas', value: 24, color: '#f59e0b' }
  ];

  const eligibilityScores = [
    { range: '0-20', count: 2 },
    { range: '21-40', count: 8 },
    { range: '41-60', count: 23 },
    { range: '61-80', count: 45 },
    { range: '81-100', count: 49 }
  ];

  const impactMetrics = {
    totalStudents: 8543,
    avgAttendanceImprovement: 23,
    mealsServedMonthly: 45780,
    teachersTrained: 234,
    communitiesReached: 45,
    avgEligibilityScore: 73.2
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics de Impacto</h1>
        <p className="text-muted-foreground">
          Métricas detalhadas e análise do impacto social da EduChain Foundation
        </p>
      </div>

      {/* Key Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estudantes Impactados</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {impactMetrics.totalStudents.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +15% vs. mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Melhoria na Frequência</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              +{impactMetrics.avgAttendanceImprovement}%
            </div>
            <p className="text-xs text-muted-foreground">
              Média das escolas
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refeições/Mês</CardTitle>
            <Utensils className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {impactMetrics.mealsServedMonthly.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Em todas as escolas
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score Médio</CardTitle>
            <Award className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {impactMetrics.avgEligibilityScore}
            </div>
            <p className="text-xs text-muted-foreground">
              Elegibilidade geral
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-success" />
              Distribuições por Mês
            </CardTitle>
            <CardDescription>
              Evolução das distribuições de recursos ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={distributionsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [
                    `R$ ${value.toLocaleString()}`, 
                    'Valor BRL'
                  ]}
                  labelFormatter={(label) => `Mês: ${label}`}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const value = payload[0].value;
                      return (
                        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-medium">{`${label}`}</p>
                          <FiatWithXLM amountBRL={value} />
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <School className="h-5 w-5 text-primary" />
              Distribuição por Tipo
            </CardTitle>
            <CardDescription>
              Proporção entre escolas e creches na rede
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={schoolsByType}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {schoolsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-destructive" />
              Comunidades Atendidas
            </CardTitle>
            <CardDescription>
              Distribuição por tipo de comunidade
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={communityTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {communityTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              Distribuição de Scores
            </CardTitle>
            <CardDescription>
              Faixas de pontuação de elegibilidade das escolas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={eligibilityScores}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`${value} escolas`, 'Quantidade']}
                />
                <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Impact Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-secondary" />
            Resumo de Impacto Social
          </CardTitle>
          <CardDescription>
            Principais conquistas e resultados da fundação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Professores Capacitados</span>
                <span className="font-bold text-secondary">{impactMetrics.teachersTrained}</span>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground">Meta anual: 300 professores (78%)</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Comunidades Alcançadas</span>
                <span className="font-bold text-accent">{impactMetrics.communitiesReached}</span>
              </div>
              <Progress value={90} className="h-2" />
              <p className="text-xs text-muted-foreground">Meta anual: 50 comunidades (90%)</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Taxa de Retenção</span>
                <span className="font-bold text-success">92%</span>
              </div>
              <Progress value={92} className="h-2" />
              <p className="text-xs text-muted-foreground">Alunos que permanecem na escola</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}