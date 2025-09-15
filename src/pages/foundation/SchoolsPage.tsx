import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Plus, MapPin, Users, Star } from 'lucide-react';

export default function SchoolsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock data
  const schools = [
    {
      id: 'school-1',
      name: 'Escola Quilombola São José',
      type: 'escola',
      communityType: 'quilombola',
      location: { city: 'Salvador', state: 'BA' },
      studentsCount: 156,
      eligibilityScore: 85,
      status: 'approved',
      manager: 'Carlos Santos'
    },
    {
      id: 'school-2', 
      name: 'Creche Indígena Tabajaras',
      type: 'creche',
      communityType: 'indigena', 
      location: { city: 'Manaus', state: 'AM' },
      studentsCount: 78,
      eligibilityScore: 72,
      status: 'approved',
      manager: 'Maria Silva'
    },
    {
      id: 'school-3',
      name: 'Escola Comunitária Esperança',
      type: 'escola',
      communityType: 'comunitaria',
      location: { city: 'Recife', state: 'PE' },
      studentsCount: 234,
      eligibilityScore: 91,
      status: 'approved', 
      manager: 'João Oliveira'
    },
    {
      id: 'school-4',
      name: 'Creche Vila Nova',
      type: 'creche',
      communityType: 'comunitaria',
      location: { city: 'Fortaleza', state: 'CE' },
      studentsCount: 45,
      eligibilityScore: 58,
      status: 'pending',
      manager: 'Ana Costa'
    },
    {
      id: 'school-5',
      name: 'Escola Aldeia Sagrada',
      type: 'escola', 
      communityType: 'indigena',
      location: { city: 'Campo Grande', state: 'MS' },
      studentsCount: 89,
      eligibilityScore: 67,
      status: 'suspended',
      manager: 'Pedro Almeida'
    }
  ];

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || school.status === statusFilter;
    const matchesType = typeFilter === 'all' || school.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': return <Badge variant="default">Aprovada</Badge>;
      case 'pending': return <Badge variant="secondary">Pendente</Badge>;
      case 'suspended': return <Badge variant="destructive">Suspensa</Badge>;
      default: return <Badge variant="outline">Indefinido</Badge>;
    }
  };

  const getCommunityTypeBadge = (type: string) => {
    switch (type) {
      case 'quilombola': return <Badge variant="outline" className="text-purple-600 border-purple-600">Quilombola</Badge>;
      case 'indigena': return <Badge variant="outline" className="text-orange-600 border-orange-600">Indígena</Badge>;
      case 'comunitaria': return <Badge variant="outline" className="text-blue-600 border-blue-600">Comunitária</Badge>;
      default: return <Badge variant="outline">Indefinido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Escolas Cadastradas</h1>
          <p className="text-muted-foreground">
            Gerencie todas as escolas e creches da rede EduChain
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Escola
        </Button>
      </div>

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
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, cidade ou gestor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="approved">Aprovadas</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="suspended">Suspensas</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="escola">Escolas</SelectItem>
                <SelectItem value="creche">Creches</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Schools Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Escolas ({filteredSchools.length})</CardTitle>
          <CardDescription>
            Visualize e gerencie todas as instituições cadastradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Comunidade</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Estudantes</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchools.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{school.name}</p>
                        <p className="text-sm text-muted-foreground">{school.manager}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {school.type === 'escola' ? 'Escola' : 'Creche'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getCommunityTypeBadge(school.communityType)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{school.location.city}/{school.location.state}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span>{school.studentsCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-accent" />
                        <span className="font-medium">{school.eligibilityScore}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(school.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Ver
                        </Button>
                        <Button variant="outline" size="sm">
                          Editar
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