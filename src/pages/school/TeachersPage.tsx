import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Users, Plus, Edit, Trash2, BookOpen, GraduationCap, Award } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  qualification: string;
  experience: number;
  trainingHours: number;
  status: 'active' | 'inactive';
  hireDate: string;
}

interface TeacherForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  qualification: string;
  experience: number;
}

export default function TeachersPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<TeacherForm>();

  // Mock teachers data
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: '1',
      name: 'Maria José Silva',
      email: 'maria.silva@escolaesperanca.org.br',
      phone: '(81) 99999-1111',
      subject: 'Português',
      qualification: 'Licenciatura em Letras',
      experience: 8,
      trainingHours: 120,
      status: 'active',
      hireDate: '2020-03-15'
    },
    {
      id: '2',
      name: 'João Santos Oliveira',
      email: 'joao.oliveira@escolaesperanca.org.br',
      phone: '(81) 99999-2222',
      subject: 'Matemática',
      qualification: 'Licenciatura em Matemática',
      experience: 12,
      trainingHours: 95,
      status: 'active',
      hireDate: '2018-08-20'
    },
    {
      id: '3',
      name: 'Ana Paula Costa',
      email: 'ana.costa@escolaesperanca.org.br',
      phone: '(81) 99999-3333',
      subject: 'Ciências',
      qualification: 'Licenciatura em Biologia',
      experience: 5,
      trainingHours: 80,
      status: 'active',
      hireDate: '2021-02-10'
    },
    {
      id: '4',
      name: 'Carlos Alberto Lima',
      email: 'carlos.lima@escolaesperanca.org.br',
      phone: '(81) 99999-4444',
      subject: 'História',
      qualification: 'Licenciatura em História',
      experience: 15,
      trainingHours: 150,
      status: 'inactive',
      hireDate: '2016-01-12'
    }
  ]);

  const onSubmit = (data: TeacherForm) => {
    if (editingTeacher) {
      // Update existing teacher
      setTeachers(prev => prev.map(teacher => 
        teacher.id === editingTeacher.id 
          ? { 
              ...teacher, 
              ...data,
              trainingHours: editingTeacher.trainingHours // Keep existing training hours
            }
          : teacher
      ));
      setEditingTeacher(null);
    } else {
      // Add new teacher
      const newTeacher: Teacher = {
        ...data,
        id: Date.now().toString(),
        trainingHours: 0,
        status: 'active',
        hireDate: new Date().toISOString().split('T')[0]
      };
      setTeachers(prev => [...prev, newTeacher]);
    }
    
    reset();
    setIsAddDialogOpen(false);
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    reset({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      subject: teacher.subject,
      qualification: teacher.qualification,
      experience: teacher.experience
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (teacherId: string) => {
    if (confirm('Tem certeza que deseja remover este professor?')) {
      setTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge variant="default">Ativo</Badge>
    ) : (
      <Badge variant="secondary">Inativo</Badge>
    );
  };

  const activeTeachers = teachers.filter(t => t.status === 'active');
  const totalTrainingHours = activeTeachers.reduce((sum, t) => sum + t.trainingHours, 0);
  const avgExperience = activeTeachers.reduce((sum, t) => sum + t.experience, 0) / activeTeachers.length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Professores</h1>
          <p className="text-muted-foreground">
            Cadastre e gerencie o corpo docente da escola
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingTeacher(null); reset(); }}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Professor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTeacher ? 'Editar Professor' : 'Cadastrar Professor'}
              </DialogTitle>
              <DialogDescription>
                {editingTeacher 
                  ? 'Atualize as informações do professor'
                  : 'Adicione um novo professor ao quadro docente'
                }
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Nome é obrigatório' })}
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', { 
                      required: 'E-mail é obrigatório',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'E-mail inválido'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    {...register('phone', { required: 'Telefone é obrigatório' })}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject">Disciplina Principal</Label>
                  <Select {...register('subject', { required: 'Disciplina é obrigatória' })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a disciplina" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Português">Português</SelectItem>
                      <SelectItem value="Matemática">Matemática</SelectItem>
                      <SelectItem value="Ciências">Ciências</SelectItem>
                      <SelectItem value="História">História</SelectItem>
                      <SelectItem value="Geografia">Geografia</SelectItem>
                      <SelectItem value="Artes">Artes</SelectItem>
                      <SelectItem value="Educação Física">Educação Física</SelectItem>
                      <SelectItem value="Inglês">Inglês</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.subject && (
                    <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="experience">Anos de Experiência</Label>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    {...register('experience', { 
                      required: 'Experiência é obrigatória',
                      min: { value: 0, message: 'Não pode ser negativo' }
                    })}
                  />
                  {errors.experience && (
                    <p className="text-sm text-destructive mt-1">{errors.experience.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="qualification">Qualificação</Label>
                <Input
                  id="qualification"
                  placeholder="Ex: Licenciatura em Matemática"
                  {...register('qualification', { required: 'Qualificação é obrigatória' })}
                />
                {errors.qualification && (
                  <p className="text-sm text-destructive mt-1">{errors.qualification.message}</p>
                )}
              </div>

              <DialogFooter>
                <Button type="submit">
                  {editingTeacher ? 'Atualizar' : 'Cadastrar'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Professores Ativos</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {activeTeachers.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {teachers.length - activeTeachers.length} inativos
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas de Capacitação</CardTitle>
            <BookOpen className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {totalTrainingHours}
            </div>
            <p className="text-xs text-muted-foreground">
              Total acumulado
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Experiência Média</CardTitle>
            <GraduationCap className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {Math.round(avgExperience * 10) / 10}
            </div>
            <p className="text-xs text-muted-foreground">
              Anos de experiência
            </p>
          </CardContent>
        </Card>

        <Card className="impact-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meta Capacitação</CardTitle>
            <Award className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {Math.round((totalTrainingHours / (activeTeachers.length * 40)) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              40h/professor/ano
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Teachers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Professores</CardTitle>
          <CardDescription>
            Corpo docente atual da escola ({teachers.length} professores)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Disciplina</TableHead>
                  <TableHead>Qualificação</TableHead>
                  <TableHead>Experiência</TableHead>
                  <TableHead>Capacitação</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{teacher.name}</p>
                        <p className="text-sm text-muted-foreground">{teacher.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{teacher.subject}</Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {teacher.qualification}
                    </TableCell>
                    <TableCell>{teacher.experience} anos</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3 text-muted-foreground" />
                        <span>{teacher.trainingHours}h</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(teacher.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(teacher)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Editar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(teacher.id)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Remover
                        </Button>
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