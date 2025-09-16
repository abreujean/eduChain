import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Settings, Wallet, Bell, Shield, Save, Eye, EyeOff } from 'lucide-react';

export default function SettingsPage() {
  const { t } = useTranslation();
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
        <h1 className="text-3xl font-bold">{t('settings_title')}</h1>
        <p className="text-muted-foreground">
          {t('settings_description')}
        </p>
      </div>

      {/* Foundation Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {t('foundation_info_title')}
          </CardTitle>
          <CardDescription>
            {t('foundation_info_description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">{t('foundation_name_label')}</Label>
              <Input id="name" defaultValue={foundationData.name} />
            </div>
            <div>
              <Label htmlFor="website">{t('website_label')}</Label>
              <Input id="website" defaultValue={foundationData.website} />
            </div>
            <div>
              <Label htmlFor="email">{t('main_email_label')}</Label>
              <Input id="email" type="email" defaultValue={foundationData.email} />
            </div>
            <div>
              <Label htmlFor="phone">{t('phone_label')}</Label>
              <Input id="phone" defaultValue={foundationData.phone} />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">{t('description_label')}</Label>
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
            {t('blockchain_config_title')}
          </CardTitle>
          <CardDescription>
            {t('blockchain_config_description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="wallet">{t('main_wallet_address_label')}</Label>
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
              <Label htmlFor="funds">{t('available_funds_label')}</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="funds" 
                  value={`R$ ${foundationData.totalFunds.toLocaleString()}`}
                  readOnly
                />
                <Badge variant="outline" className="text-success border-success">
                  {t('status_active')}
                </Badge>
              </div>
            </div>
            <div>
              <Label htmlFor="network">{t('stellar_network_label')}</Label>
              <div className="flex items-center gap-2">
                <Input id="network" value="Mainnet" readOnly />
                <Badge variant="default">{t('status_connected')}</Badge>
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
            {t('distribution_rules_title')}
          </CardTitle>
          <CardDescription>
            {t('distribution_rules_description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minScore">{t('min_eligibility_score_label')}</Label>
              <Input 
                id="minScore" 
                type="number" 
                defaultValue={foundationData.minEligibilityScore}
                min="0" 
                max="100"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {t('min_score_description')}
              </p>
            </div>
            <div>
              <Label htmlFor="maxAmount">{t('max_amount_per_distribution_label')}</Label>
              <Input 
                id="maxAmount" 
                type="number" 
                defaultValue={foundationData.maxDistributionAmount}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {t('max_amount_description')}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Label>{t('automatic_approval_label')}</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{t('auto_approval_rule1_title')}</p>
                  <p className="text-xs text-muted-foreground">{t('auto_approval_rule1_description')}</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{t('auto_approval_rule2_title')}</p>
                  <p className="text-xs text-muted-foreground">{t('auto_approval_rule2_description')}</p>
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
            {t('notifications_title')}
          </CardTitle>
          <CardDescription>
            {t('notifications_description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{t('notification_new_schools_title')}</p>
                <p className="text-xs text-muted-foreground">{t('notification_new_schools_description')}</p>
              </div>
              <Switch 
                checked={notifications.newSchools}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, newSchools: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{t('notification_distributions_title')}</p>
                <p className="text-xs text-muted-foreground">{t('notification_distributions_description')}</p>
              </div>
              <Switch 
                checked={notifications.distributions}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, distributions: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{t('notification_metrics_title')}</p>
                <p className="text-xs text-muted-foreground">{t('notification_metrics_description')}</p>
              </div>
              <Switch 
                checked={notifications.metrics}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, metrics: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{t('notification_critical_alerts_title')}</p>
                <p className="text-xs text-muted-foreground">{t('notification_critical_alerts_description')}</p>
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
          {t('save_settings_button')}
        </Button>
      </div>
    </div>
  );
}