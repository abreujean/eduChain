import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Settings, Wallet, Bell, Shield, Save, Eye, EyeOff } from 'lucide-react';

export default function SettingsPage() {
  const [showWalletKey, setShowWalletKey] = useState(false);
  const [notifications, setNotifications] = useState({
    newSchools: true,
    distributions: true,
    metrics: false,
    emergencies: true
  });

  // Mock foundation data
  const foundationData = {
    name: 'EduChain Foundation',
    description: 'Transformando a educação brasileira através da tecnologia blockchain',
    website: 'https://educhain.org.br',
    email: 'contato@educhain.org.br',
    phone: '(11) 99999-9999',
    walletAddress: 'GDRXE2BQUC3AZNPVFSCEZ76NJ3WWL25FYFK6RGZGIEKWE4SOOHSUJUJ6',
    totalFunds: 2500000,
    minEligibilityScore: 60,
    maxDistributionAmount: 50000
  };

  const handleSaveSettings = () => {
    console.log('Salvando configurações...');
    // Here you would make an API call to save the settings
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações da Fundação</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações globais da EduChain Foundation
        </p>
      </div>

      {/* Foundation Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Informações da Fundação
          </CardTitle>
          <CardDescription>
            Dados básicos e informações de contato
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome da Fundação</Label>
              <Input id="name" defaultValue={foundationData.name} />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input id="website" defaultValue={foundationData.website} />
            </div>
            <div>
              <Label htmlFor="email">E-mail Principal</Label>
              <Input id="email" type="email" defaultValue={foundationData.email} />
            </div>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" defaultValue={foundationData.phone} />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea 
              id="description" 
              defaultValue={foundationData.description}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Blockchain Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Configuração Blockchain
          </CardTitle>
          <CardDescription>
            Configurações relacionadas à rede Stellar e carteira
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="wallet">Endereço da Carteira Principal</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="wallet" 
                type={showWalletKey ? "text" : "password"}
                defaultValue={foundationData.walletAddress}
                readOnly
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowWalletKey(!showWalletKey)}
              >
                {showWalletKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="funds">Fundos Disponíveis</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="funds" 
                  value={`R$ ${foundationData.totalFunds.toLocaleString()}`}
                  readOnly
                />
                <Badge variant="outline" className="text-success border-success">
                  Ativo
                </Badge>
              </div>
            </div>
            <div>
              <Label htmlFor="network">Rede Stellar</Label>
              <div className="flex items-center gap-2">
                <Input id="network" value="Mainnet" readOnly />
                <Badge variant="default">Conectado</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distribution Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Regras de Distribuição
          </CardTitle>
          <CardDescription>
            Parâmetros e critérios para aprovação de distribuições
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minScore">Score Mínimo de Elegibilidade</Label>
              <Input 
                id="minScore" 
                type="number" 
                defaultValue={foundationData.minEligibilityScore}
                min="0" 
                max="100"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Pontuação mínima para receber recursos
              </p>
            </div>
            <div>
              <Label htmlFor="maxAmount">Valor Máximo por Distribuição</Label>
              <Input 
                id="maxAmount" 
                type="number" 
                defaultValue={foundationData.maxDistributionAmount}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Limite máximo por transação (R$)
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Aprovação Automática</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Distribuições até R$ 5.000</p>
                  <p className="text-xs text-muted-foreground">Para escolas com score ≥ 80</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Renovações mensais</p>
                  <p className="text-xs text-muted-foreground">Para escolas recorrentes</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificações
          </CardTitle>
          <CardDescription>
            Configure quando receber alertas e notificações
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Novas escolas cadastradas</p>
                <p className="text-xs text-muted-foreground">Receber quando uma escola se cadastrar</p>
              </div>
              <Switch 
                checked={notifications.newSchools}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, newSchools: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Distribuições executadas</p>
                <p className="text-xs text-muted-foreground">Confirmação de transações processadas</p>
              </div>
              <Switch 
                checked={notifications.distributions}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, distributions: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Métricas em atraso</p>
                <p className="text-xs text-muted-foreground">Escolas com métricas pendentes</p>
              </div>
              <Switch 
                checked={notifications.metrics}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, metrics: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Alertas críticos</p>
                <p className="text-xs text-muted-foreground">Problemas que requerem atenção imediata</p>
              </div>
              <Switch 
                checked={notifications.emergencies}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emergencies: checked }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>
          <Save className="h-4 w-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
}