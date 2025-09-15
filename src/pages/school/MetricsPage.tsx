import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { useForm } from 'react-hook-form';
import { Calendar, Save, TrendingUp, Users, Utensils, BookOpen, Clock, CheckCircle } from 'lucide-react';

interface MonthlyMetricsForm {
  studentsEnrolled: number;
  dailyAttendanceAvg: number;
  mealsServed: number;
  foodSecurityIndex: number;
  teacherTrainingHours: number;
  managementScore: number;
  communityParticipation: number;
}

export default function MetricsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentMonth] = useState('2024-01');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<MonthlyMetricsForm>();

  // Mock metrics history
  const metricsHistory = [
    {
      id: '1',
      monthYear: '2023-12',
      studentsEnrolled: 145,
      dailyAttendanceAvg: 87,
      mealsServed: 3480,
      foodSecurityIndex: 0.85,
      teacherTrainingHours: 24,
      managementScore: 0.78,
      communityParticipation: 0.92,
      status: 'validated',
      submittedAt: '2024-01-05',
      validatedAt: '2024-01-08'
    },
    {
      id: '2',
      monthYear: '2023-11',
      studentsEnrolled: 142,
      dailyAttendanceAvg: 84,
      mealsServed: 3420,
      foodSecurityIndex: 0.82,
      teacherTrainingHours: 18,
      managementScore: 0.75,
      communityParticipation: 0.88,
      status: 'validated',
      submittedAt: '2023-12-03',
      validatedAt: '2023-12-06'
    },
    {
      id: '3',
      monthYear: '2023-10',
      studentsEnrolled: 138,
      dailyAttendanceAvg: 81,
      mealsServed: 3312,
      foodSecurityIndex: 0.79,
      teacherTrainingHours: 22,
      managementScore: 0.72,
      communityParticipation: 0.85,
      status: 'validated',
      submittedAt: '2023-11-02',
      validatedAt: '2023-11-05'
    }
  ];

  const onSubmit = async (data: MonthlyMetricsForm) => {
    setIsSubmitting(true);
    
    try {
      console.log('Enviando métricas:', { ...data, monthYear: currentMonth });
      // Here you would make an API call to submit the metrics
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Métricas enviadas com sucesso!');
      reset();
    } catch (error) {
      console.error('Erro ao enviar métricas:', error);
      alert('Erro ao enviar métricas. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'validated':
        return (
          <Badge variant="default">
            <CheckCircle className="h-3 w-3 mr-1" />
            Validado
          </Badge>
        );
      case 'submitted':
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Enviado
          </Badge>
        );
      case 'draft':
        return (
          <Badge variant="outline">
            Rascunho
          </Badge>
        );
      default:
        return <Badge variant="outline">Indefinido</Badge>;
    }
  };

  const calculateEligibilityContribution = (value: number, max: number) => {
    return Math.min((value / max) * 100, 100);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Métricas Mensais</h1>
        <p className="text-muted-foreground">
          Registre as métricas obrigatórias para manter a elegibilidade da escola
        </p>
      </div>

      {/* Current Month Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Métricas de Janeiro 2024
          </CardTitle>
          <CardDescription>
            Preencha as informações do mês atual para calcular o score de elegibilidade
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentsEnrolled">Estudantes Matriculados</Label>
                <Input
                  id="studentsEnrolled"
                  type="number"
                  {...register('studentsEnrolled', { 
                    required: 'Campo obrigatório',
                    min: { value: 1, message: 'Deve ter pelo menos 1 estudante' }
                  })}
                />
                {errors.studentsEnrolled && (
                  <p className="text-sm text-destructive mt-1">{errors.studentsEnrolled.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="dailyAttendanceAvg">Frequência Média Diária (%)</Label>
                <Input
                  id="dailyAttendanceAvg"
                  type="number"
                  max="100"
                  min="0"
                  {...register('dailyAttendanceAvg', { 
                    required: 'Campo obrigatório',
                    min: { value: 0, message: 'Mínimo 0%' },
                    max: { value: 100, message: 'Máximo 100%' }
                  })}
                />
                {errors.dailyAttendanceAvg && (
                  <p className="text-sm text-destructive mt-1">{errors.dailyAttendanceAvg.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="mealsServed">Refeições Servidas</Label>
                <Input
                  id="mealsServed"
                  type="number"
                  {...register('mealsServed', { 
                    required: 'Campo obrigatório',
                    min: { value: 0, message: 'Não pode ser negativo' }
                  })}
                />
                {errors.mealsServed && (
                  <p className="text-sm text-destructive mt-1">{errors.mealsServed.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="teacherTrainingHours">Horas de Capacitação Docente</Label>
                <Input
                  id="teacherTrainingHours"
                  type="number"
                  {...register('teacherTrainingHours', { 
                    required: 'Campo obrigatório',
                    min: { value: 0, message: 'Não pode ser negativo' }
                  })}
                />
                {errors.teacherTrainingHours && (
                  <p className="text-sm text-destructive mt-1">{errors.teacherTrainingHours.message}</p>
                )}
              </div>
            </div>

            {/* Advanced Metrics (0-100 scale) */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Índices de Qualidade (0-100)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="foodSecurityIndex">Índice de Segurança Alimentar</Label>
                  <Input
                    id="foodSecurityIndex"
                    type="number"
                    max="100"
                    min="0"
                    {...register('foodSecurityIndex', { 
                      required: 'Campo obrigatório',
                      min: { value: 0, message: 'Mínimo 0' },
                      max: { value: 100, message: 'Máximo 100' }
                    })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Qualidade e regularidade da alimentação
                  </p>
                  {errors.foodSecurityIndex && (
                    <p className="text-sm text-destructive mt-1">{errors.foodSecurityIndex.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="managementScore">Score de Gestão</Label>
                  <Input
                    id="managementScore"
                    type="number"
                    max="100"
                    min="0"
                    {...register('managementScore', { 
                      required: 'Campo obrigatório',
                      min: { value: 0, message: 'Mínimo 0' },
                      max: { value: 100, message: 'Máximo 100' }
                    })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Eficiência administrativa e pedagógica
                  </p>
                  {errors.managementScore && (
                    <p className="text-sm text-destructive mt-1">{errors.managementScore.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="communityParticipation">Participação Comunitária</Label>
                  <Input
                    id="communityParticipation"
                    type="number"
                    max="100"
                    min="0"
                    {...register('communityParticipation', { 
                      required: 'Campo obrigatório',
                      min: { value: 0, message: 'Mínimo 0' },
                      max: { value: 100, message: 'Máximo 100' }
                    })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Envolvimento dos pais e comunidade
                  </p>
                  {errors.communityParticipation && (
                    <p className="text-sm text-destructive mt-1">{errors.communityParticipation.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Enviar Métricas
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Metrics Impact Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Impacto no Score de Elegibilidade
          </CardTitle>
          <CardDescription>
            Como cada métrica contribui para seu score geral
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm">Frequência</span>
              </div>
              <Progress value={87} className="h-2" />
              <p className="text-xs text-muted-foreground">Peso: 25%</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Utensils className="h-4 w-4 text-success" />
                <span className="text-sm">Alimentação</span>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-muted-foreground">Peso: 20%</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-accent" />
                <span className="text-sm">Capacitação</span>
              </div>
              <Progress value={72} className="h-2" />
              <p className="text-xs text-muted-foreground">Peso: 15%</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-secondary" />
                <span className="text-sm">Gestão</span>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground">Peso: 40%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historical Data */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Métricas</CardTitle>
          <CardDescription>
            Métricas enviadas nos últimos meses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mês/Ano</TableHead>
                  <TableHead>Estudantes</TableHead>
                  <TableHead>Frequência</TableHead>
                  <TableHead>Refeições</TableHead>
                  <TableHead>Capacitação</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data Envio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {metricsHistory.map((metric) => (
                  <TableRow key={metric.id}>
                    <TableCell className="font-medium">{metric.monthYear}</TableCell>
                    <TableCell>{metric.studentsEnrolled}</TableCell>
                    <TableCell>{metric.dailyAttendanceAvg}%</TableCell>
                    <TableCell>{metric.mealsServed.toLocaleString()}</TableCell>
                    <TableCell>{metric.teacherTrainingHours}h</TableCell>
                    <TableCell>{getStatusBadge(metric.status)}</TableCell>
                    <TableCell>{metric.submittedAt}</TableCell>
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