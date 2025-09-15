import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { FileText, Download, TrendingUp, Users, Utensils, BookOpen, Calendar, Target } from 'lucide-react';

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [selectedReport, setSelectedReport] = useState('performance');

  // Mock data for charts
  const monthlyMetrics = [
    { month: 'Jul', attendance: 82, meals: 3200, students: 140 },
    { month: 'Ago', attendance: 85, meals: 3350, students: 142 },
    { month: 'Set', attendance: 78, meals: 3180, students: 138 },
    { month: 'Out', attendance: 87, meals: 3480, students: 145 },
    { month: 'Nov', attendance: 89, meals: 3520, students: 148 },
    { month: 'Dez', attendance: 91, meals: 3680, students: 150 },
    { month: 'Jan', attendance: 87, meals: 3400, students: 145 }
  ];

  const performanceBySubject = [
    { subject: 'Português', score: 8.2, improvement: 15 },
    { subject: 'Matemática', score: 7.8, improvement: 22 },
    { subject: 'Ciências', score: 8.5, improvement: 8 },
    { subject: 'História', score: 8.0, improvement: 12 },
    { subject: 'Geografia', score: 7.9, improvement: 18 }
  ];

  const resourceAllocation = [
    { category: 'Alimentação', value: 60, color: '#10b981' },
    { category: 'Materiais', value: 25, color: '#3b82f6' },
    { category: 'Capacitação', value: 15, color: '#f59e0b' }
  ];

  const attendanceByGrade = [
    { grade: '1º Ano', attendance: 92, students: 25 },
    { grade: '2º Ano', attendance: 89, students: 28 },
    { grade: '3º Ano', attendance: 87, students: 30 },
    { grade: '4º Ano', attendance: 85, students: 32 },
    { grade: '5º Ano', attendance: 88, students: 30 }
  ];

  const keyMetrics = {
    averageAttendance: 87.4,
    improvementRate: 15.2,
    mealsPerDay: 145,
    teacherTrainingHours: 248,
    parentParticipation: 78,
    eligibilityScore: 85
  };

  const handleExportReport = (format: 'pdf' | 'excel') => {
    console.log(`Exportando relatório em ${format.toUpperCase()}`);
    // Here you would implement the actual export functionality
    alert(`Relatório exportado em ${format.toUpperCase()}!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Relatórios e Analytics</h1>
          <p className="text-muted-foreground">
            Análises detalhadas do desempenho e impacto da escola
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => handleExportReport('excel')}>
            <Download className="h-4 w-4 mr-2" />
            Excel
          </Button>
          <Button onClick={() => handleExportReport('pdf')}>
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>

      {/* Report Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Configurações do Relatório
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="last-6-months">Últimos 6 meses</SelectItem>
                <SelectItem value="last-year">Último ano</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedReport} onValueChange={setSelectedReport}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Tipo de Relatório" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="performance">Desempenho Geral</SelectItem>
                <SelectItem value="attendance">Frequência Escolar</SelectItem>
                <SelectItem value="nutrition">Programa Alimentar</SelectItem>
                <SelectItem value="resources">Uso de Recursos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Frequência Média</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {keyMetrics.averageAttendance}%
            </div>
            <p className="text-xs text-muted-foreground">
              +2.3% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score Elegibilidade</CardTitle>
            <Target className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {keyMetrics.eligibilityScore}
            </div>
            <p className="text-xs text-muted-foreground">
              +5 pontos
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refeições/Dia</CardTitle>
            <Utensils className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {keyMetrics.mealsPerDay}
            </div>
            <p className="text-xs text-muted-foreground">
              100% dos estudantes
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacitação</CardTitle>
            <BookOpen className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {keyMetrics.teacherTrainingHours}h
            </div>
            <p className="text-xs text-muted-foreground">
              Este ano
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participação</CardTitle>
            <TrendingUp className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {keyMetrics.parentParticipation}%
            </div>
            <p className="text-xs text-muted-foreground">
              Pais e comunidade
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Melhoria</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">
              +{keyMetrics.improvementRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              Desempenho geral
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Evolução Mensal
            </CardTitle>
            <CardDescription>
              Frequência e refeições servidas ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Frequência (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="meals" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Refeições"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-secondary" />
              Desempenho por Disciplina
            </CardTitle>
            <CardDescription>
              Notas médias e melhoria por matéria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceBySubject}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    name === 'score' ? `${value}/10` : `+${value}%`,
                    name === 'score' ? 'Nota Média' : 'Melhoria'
                  ]}
                />
                <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              Frequência por Série
            </CardTitle>
            <CardDescription>
              Taxa de frequência dividida por ano escolar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceByGrade.map((grade) => (
                <div key={grade.grade} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{grade.grade}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {grade.students} alunos
                      </span>
                      <Badge variant={grade.attendance >= 85 ? "default" : "secondary"}>
                        {grade.attendance}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={grade.attendance} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-success" />
              Distribuição de Recursos
            </CardTitle>
            <CardDescription>
              Como os recursos são utilizados na escola
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={resourceAllocation}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ category, value }) => `${category}: ${value}%`}
                >
                  {resourceAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Report */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Executivo</CardTitle>
          <CardDescription>
            Principais insights e recomendações baseadas nos dados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-success">Pontos Fortes</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Frequência escolar acima da meta (87.4% vs 85%)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  100% dos estudantes recebem alimentação diariamente
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Score de elegibilidade em crescimento (+5 pontos)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Alta participação da comunidade (78%)
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-warning">Áreas de Melhoria</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  Frequência do 4º ano abaixo da média (85%)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  Desempenho em Matemática pode melhorar (7.8/10)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  Necessidade de mais horas de capacitação docente
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  Infraestrutura da biblioteca precisa de atenção
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}