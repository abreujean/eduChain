import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { School, MapPin, Users, Save, Edit, Wallet } from 'lucide-react';

export default function SchoolProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  // Mock school data
  const schoolData = {
    id: 'school-1',
    name: 'Escola Comunitária Esperança',
    type: 'escola',
    communityType: 'comunitaria',
    location: {
      state: 'PE',
      city: 'Recife',
      address: 'Rua das Flores, 123 - Boa Vista',
      coordinates: [-8.0578, -34.8829]
    },
    walletAddress: 'GDRXE2BQUC3AZNPVFSCEZ76NJ3WWL25FYFK6RGZGIEKWE4SOOHSUJUJ6',
    studentsCount: 145,
    eligibilityScore: 78,
    status: 'approved',
    registrationDate: '2023-08-15',
    infrastructure: {
      hasKitchen: true,
      hasLibrary: true,
      internetAccess: true,
      safeWater: false
    },
    description: 'Escola comunitária fundada em 1998, atendendo crianças e adolescentes da comunidade de Boa Vista em Recife. Nosso foco é oferecer educação de qualidade com valores comunitários.',
    principalName: 'Maria da Silva Santos',
    principalEmail: 'maria.santos@escolaesperanca.org.br',
    principalPhone: '(81) 99999-9999'
  };

  const handleSave = () => {
    console.log('Salvando perfil da escola...');
    setIsEditing(false);
    // Here you would make an API call to save the school profile
  };

  const getCommunityTypeBadge = (type: string) => {
    switch (type) {
      case 'quilombola': return <Badge variant="outline" className="text-purple-600 border-purple-600">Quilombola</Badge>;
      case 'indigena': return <Badge variant="outline" className="text-orange-600 border-orange-600">Indígena</Badge>;
      case 'comunitaria': return <Badge variant="outline" className="text-blue-600 border-blue-600">Comunitária</Badge>;
      default: return <Badge variant="outline">Indefinido</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': return <Badge variant="default">Aprovada</Badge>;
      case 'pending': return <Badge variant="secondary">Pendente</Badge>;
      case 'suspended': return <Badge variant="destructive">Suspensa</Badge>;
      default: return <Badge variant="outline">Indefinido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Perfil da Escola</h1>
          <p className="text-muted-foreground">
            Gerencie as informações e configurações da sua escola
          </p>
        </div>
        <Button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          variant={isEditing ? "default" : "outline"}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </>
          )}
        </Button>
      </div>

      {/* School Status */}
      <Card className="bg-gradient-secondary text-secondary-foreground">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary-foreground/10 rounded-full">
                <School className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{schoolData.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  {getCommunityTypeBadge(schoolData.communityType)}
                  {getStatusBadge(schoolData.status)}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-secondary-foreground/80">Score de Elegibilidade</p>
              <p className="text-2xl font-bold">{schoolData.eligibilityScore}/100</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
          <CardDescription>
            Dados principais da escola
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome da Escola</Label>
              <Input 
                id="name" 
                defaultValue={schoolData.name}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="type">Tipo</Label>
              <Select defaultValue={schoolData.type} disabled={!isEditing}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="escola">Escola</SelectItem>
                  <SelectItem value="creche">Creche</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="communityType">Tipo de Comunidade</Label>
              <Select defaultValue={schoolData.communityType} disabled={!isEditing}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comunitaria">Comunitária</SelectItem>
                  <SelectItem value="quilombola">Quilombola</SelectItem>
                  <SelectItem value="indigena">Indígena</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="students">Número de Estudantes</Label>
              <Input 
                id="students" 
                type="number"
                defaultValue={schoolData.studentsCount}
                disabled={!isEditing}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea 
              id="description" 
              defaultValue={schoolData.description}
              disabled={!isEditing}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Localização
          </CardTitle>
          <CardDescription>
            Endereço e localização da escola
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="state">Estado</Label>
              <Input 
                id="state" 
                defaultValue={schoolData.location.state}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="city">Cidade</Label>
              <Input 
                id="city" 
                defaultValue={schoolData.location.city}
                disabled={!isEditing}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="address">Endereço Completo</Label>
            <Input 
              id="address" 
              defaultValue={schoolData.location.address}
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

      {/* Principal Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Responsável
          </CardTitle>
          <CardDescription>
            Informações do diretor ou responsável pela escola
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="principalName">Nome Completo</Label>
              <Input 
                id="principalName" 
                defaultValue={schoolData.principalName}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="principalPhone">Telefone</Label>
              <Input 
                id="principalPhone" 
                defaultValue={schoolData.principalPhone}
                disabled={!isEditing}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="principalEmail">E-mail</Label>
            <Input 
              id="principalEmail" 
              type="email"
              defaultValue={schoolData.principalEmail}
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

      {/* Infrastructure */}
      <Card>
        <CardHeader>
          <CardTitle>Infraestrutura</CardTitle>
          <CardDescription>
            Recursos e instalações disponíveis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="hasKitchen">Cozinha Equipada</Label>
                <p className="text-xs text-muted-foreground">Para preparo de refeições</p>
              </div>
              <Switch 
                id="hasKitchen"
                defaultChecked={schoolData.infrastructure.hasKitchen}
                disabled={!isEditing}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="hasLibrary">Biblioteca</Label>
                <p className="text-xs text-muted-foreground">Espaço para leitura e estudos</p>
              </div>
              <Switch 
                id="hasLibrary"
                defaultChecked={schoolData.infrastructure.hasLibrary}
                disabled={!isEditing}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="internetAccess">Acesso à Internet</Label>
                <p className="text-xs text-muted-foreground">Conexão banda larga</p>
              </div>
              <Switch 
                id="internetAccess"
                defaultChecked={schoolData.infrastructure.internetAccess}
                disabled={!isEditing}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="safeWater">Água Potável</Label>
                <p className="text-xs text-muted-foreground">Acesso a água tratada</p>
              </div>
              <Switch 
                id="safeWater"
                defaultChecked={schoolData.infrastructure.safeWater}
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Carteira Blockchain
          </CardTitle>
          <CardDescription>
            Endereço para recebimento de recursos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="wallet">Endereço da Carteira Stellar</Label>
            <Input 
              id="wallet" 
              defaultValue={schoolData.walletAddress}
              disabled
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Este endereço é usado para receber distribuições de recursos da fundação
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}