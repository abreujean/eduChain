import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Bell, Wallet, LogOut, Settings, User, Languages, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { t, i18n } = useTranslation();
  const { state, connectWallet, logout } = useAuth();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (state.error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000); // Oculta o alerta após 5 segundos
      return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
    }
  }, [state.error]);

  const changeLanguage = (lng: string) => {
  return (
    <header className="h-16 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {showError && (
        <Alert variant="destructive" className="fixed top-20 right-4 w-auto z-50">
          <AlertTitle>{t('error')}</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {/* Wallet Connection */}
          <Button
            variant={state.isWalletConnected ? "secondary" : "outline"}
            size="sm"
            onClick={!state.isWalletConnected ? connectWallet : undefined}
            disabled={state.loading}
            className="hidden sm:flex"
          >
            {state.loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t('loading')}
              </>
            ) : (
              <>
                <Wallet className="h-4 w-4 mr-2" />
                {state.isWalletConnected && state.walletPublicKey
                  ? `${state.walletPublicKey.substring(0, 4)}...${state.walletPublicKey.substring(state.walletPublicKey.length - 4)}`
                  : t('connect_wallet')}
              </>
            )}
          </Button>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <DropdownMenuLabel>
                {t('language')}
              </DropdownMenuLabel>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => i18n.changeLanguage('pt-BR')}>
                {t('pt-BR')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => i18n.changeLanguage('en')}>
                {t('en')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}