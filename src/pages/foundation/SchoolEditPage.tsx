import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SchoolEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data - replace with actual API call
  const [formData, setFormData] = useState({
    name: 'Escola Quilombola São José',
    type: 'escola',
    communityType: 'quilombola',
    city: 'Salvador',
    state: 'BA',
    address: 'Rua das Palmeiras, 123',
    zipCode: '40000-000',
    studentsCount: 245,
    managerName: 'Maria Silva Santos',
    managerEmail: 'maria@escola.ba.gov.br',
    managerPhone: '(71) 99999-9999',
    hasKitchen: true,
    hasLibrary: true,
    internetAccess: true,
    safeWater: true,
    walletAddress: 'GDRXE2BQUC3AZNPVFSCEZ76NJ3WWL25FYFK6RGZGIEKWE4SOOHSUJUJ6'
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Salvando dados da escola:', formData);
    // Here you would make an API call to save the data
    
    toast({
      title: "Escola atualizada",
      description: "Os dados foram salvos com sucesso.",
    });
    
    navigate(`/schools/${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/schools/${id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Editar Escola</h1>
            <p className="text-muted-foreground">Atualize as informações da escola</p>
          </div>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Salvar
        </Button>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
            <CardDescription>Dados gerais da instituição</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Escola</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="escola">Escola</SelectItem>
                    <SelectItem value="creche">Creche</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="communityType">Tipo de Comunidade</Label>
                <Select value={formData.communityType} onValueChange={(value) => handleInputChange('communityType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quilombola">Quilombola</SelectItem>
                    <SelectItem value="indigena">Indígena</SelectItem>
                    <SelectItem value="comunitaria">Comunitária</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="studentsCount">Número de Estudantes</Label>
              <Input
                id="studentsCount"
                type="number"
                value={formData.studentsCount}
                onChange={(e) => handleInputChange('studentsCount', parseInt(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle>Localização</CardTitle>
            <CardDescription>Endereço e informações de localização</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="zipCode">CEP</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Manager */}
        <Card>
          <CardHeader>
            <CardTitle>Responsável</CardTitle>
            <CardDescription>Dados do gestor da escola</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="managerName">Nome</Label>
              <Input
                id="managerName"
                value={formData.managerName}
                onChange={(e) => handleInputChange('managerName', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="managerEmail">Email</Label>
              <Input
                id="managerEmail"
                type="email"
                value={formData.managerEmail}
                onChange={(e) => handleInputChange('managerEmail', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="managerPhone">Telefone</Label>
              <Input
                id="managerPhone"
                value={formData.managerPhone}
                onChange={(e) => handleInputChange('managerPhone', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Infrastructure */}
        <Card>
          <CardHeader>
            <CardTitle>Infraestrutura</CardTitle>
            <CardDescription>Recursos disponíveis na escola</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="hasKitchen">Cozinha</Label>
              <Switch
                id="hasKitchen"
                checked={formData.hasKitchen}
                onCheckedChange={(checked) => handleInputChange('hasKitchen', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="hasLibrary">Biblioteca</Label>
              <Switch
                id="hasLibrary"
                checked={formData.hasLibrary}
                onCheckedChange={(checked) => handleInputChange('hasLibrary', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="internetAccess">Acesso à Internet</Label>
              <Switch
                id="internetAccess"
                checked={formData.internetAccess}
                onCheckedChange={(checked) => handleInputChange('internetAccess', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="safeWater">Água Potável</Label>
              <Switch
                id="safeWater"
                checked={formData.safeWater}
                onCheckedChange={(checked) => handleInputChange('safeWater', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Wallet */}
      <Card>
        <CardHeader>
          <CardTitle>Carteira Stellar</CardTitle>
          <CardDescription>Endereço para recebimento de recursos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="walletAddress">Endereço da Carteira</Label>
            <Input
              id="walletAddress"
              value={formData.walletAddress}
              onChange={(e) => handleInputChange('walletAddress', e.target.value)}
              className="font-mono"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}