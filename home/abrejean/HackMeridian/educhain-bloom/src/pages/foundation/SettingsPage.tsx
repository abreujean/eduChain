import React, { useState } from 'react';
// ... existing code ...
import { Badge } from '@/components/ui/badge';
import { Settings, Wallet, Bell, Shield, Save, Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SettingsPage() {
  const { t } = useTranslation();
  const [showWalletKey, setShowWalletKey] = useState(false);
// ... existing code ...
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl