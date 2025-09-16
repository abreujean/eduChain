import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // Importe o hook
import { useAuth } from '@/contexts/AuthContext';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Bell, Wallet, LogOut, Settings, User, Languages } from 'lucide-react'; // Adicione o ícone Languages
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { state, logout, connectWallet, disconnectWallet } = useAuth();
  const { t, i18n } = useTranslation(); // Inicialize o hook
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        navigate('/dashboard'); // ou a rota que desejar
      }, 5000); // 5 segundos
      return () => clearTimeout(timer);
    }
  }, [state.error, navigate]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  console.log('Wallet Public Key:', state.walletPublicKey);


  if (!state.user) return null;

  const getInitials = (name: string) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleLabel = (role: string) => {
    // return role === 'foundation_manager' ? 'Gestão Fundação' : 'Gestão Escolar';
    return role === 'foundation_manager' ? t('foundation_management') : t('school_management');
  };

  return (
    <header className="h-16 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {showError && (
        <Alert variant="destructive">
          <AlertTitle>{t('error')}</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-8 w-8" />
          <div className="hidden md:block">
            <h2 className="text-lg font-semibold text-foreground">
              {state.user.role === 'foundation_manager' ? t('foundation_dashboard') : t('school_dashboard')}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t('welcome', { name: state.user.name })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Wallet Connection */}
          <Button
            variant={state.isWalletConnected ? "secondary" : "outline"}
            size="sm"
            onClick={!state.isWalletConnected ? connectWallet : undefined}
            className="hidden sm:flex"
          >
            <Wallet className="h-4 w-4 mr-2" />
            {state.isWalletConnected && state.walletPublicKey && typeof state.walletPublicKey.address === 'string'
              ? `${state.walletPublicKey.address.substring(0, 4)}...${state.walletPublicKey.address.substring(state.walletPublicKey.address.length - 4)}`
              : t('connect_wallet')}
          </Button>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Languages className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => changeLanguage('pt')}>{t('portuguese')}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('en')}>{t('english')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="outline" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  {/*<AvatarImage src={state.user.avatar} alt={state.user.name} />*/}
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    {getInitials(state.user.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent className="w-64" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm font-medium leading-none">{state.user.name}</p>
                  {/*<p className="text-xs leading-none text-muted-foreground">
                    {state.user.email}
                  </p>*/}
                  <Badge variant="secondary" className="w-fit">
                    {getRoleLabel(state.user.role)}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>{t('profile')}</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>{t('settings')}</span>
              </DropdownMenuItem>
              
              {!state.isWalletConnected ? (
                <DropdownMenuItem onClick={connectWallet} className="cursor-pointer">
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>{t('connect_wallet')}</span>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={disconnectWallet} className="cursor-pointer">
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>{t('disconnect_wallet')}</span>
                </DropdownMenuItem>
              )}
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t('logout')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}