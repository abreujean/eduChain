import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, GraduationCap, Heart, Users } from 'lucide-react';

const LoginPage = () => {
  const { t } = useTranslation();
  const { state, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState<'foundation' | 'school'>('foundation');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  const handleQuickLogin = (type: 'foundation' | 'school') => {
    const credentials = type === 'foundation' 
      ? { email: 'fundacao@educhain.org', password: 'demo123' }
      : { email: 'escola@educhain.org', password: 'demo123' };
    
    setEmail(credentials.email);
    setPassword(credentials.password);
    login(credentials);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center justify-center gap-12">
        
        {/* Hero Section */}
        <div className="hidden lg:flex flex-col text-white max-w-lg">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold">{t('hero_title')}</h1>
            </div>
            <p className="text-xl text-white/90 mb-8">
              {t('hero_subtitle')}
            </p>
            
            {/* Hero Image */}
            <div className="rounded-xl overflow-hidden shadow-glow mb-6">
              <img 
                src="https://images.unsplash.com/photo-1544717824-d4bb8e24d5dc?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={t('hero_image_alt')}
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="p-2 bg-success rounded-lg">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">{t('hero_impact_title')}</h3>
                <p className="text-white/80 text-sm">{t('hero_impact_description')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="p-2 bg-secondary rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">{t('hero_management_title')}</h3>
                <p className="text-white/80 text-sm">{t('hero_management_description')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <Card className="w-full max-w-md shadow-accent">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl educhain-brand">{t('login_title')}</CardTitle>
            <CardDescription>
              {t('login_description')}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {state.error && (
              <Alert>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            {/* Quick Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleQuickLogin('foundation')}
                disabled={state.loading}
                className="text-sm"
              >
                {t('login_demo_foundation')}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickLogin('school')}
                disabled={state.loading}
                className="text-sm"
              >
                {t('login_demo_school')}
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">
                  {t('login_manual_login')}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('login_email_label')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('login_email_placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t('login_password_label')}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('login_password_placeholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                variant="hero"
                disabled={state.loading}
              >
                {state.loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t('login_submit_button')}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              <p>{t('login_test_credentials')}</p>
              <p><strong>{t('login_test_foundation')}</strong> fundacao@educhain.org / demo123</p>
              <p><strong>{t('login_test_school')}</strong> escola@educhain.org / demo123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;