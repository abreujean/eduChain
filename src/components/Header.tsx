import React from 'react';
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
import { Bell, Wallet, LogOut, Settings, User } from 'lucide-react';

export function Header() {
  const { state, logout, connectWallet, disconnectWallet } = useAuth();

  if (!state.user) return null;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleLabel = (role: string) => {
    return role === 'foundation_manager' ? 'Gestão Fundação' : 'Gestão Escolar';
  };

  const isWalletConnected = !!state.user.walletAddress;

  return (
    <header className="h-16 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-8 w-8" />
          <div className="hidden md:block">
            <h2 className="text-lg font-semibold text-foreground">
              {state.user.role === 'foundation_manager' ? 'Painel da Fundação' : 'Painel da Escola'}
            </h2>
            <p className="text-sm text-muted-foreground">
              Bem-vindo(a), {state.user.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Wallet Connection */}
          <Button
            variant={isWalletConnected ? "secondary" : "outline"}
            size="sm"
            onClick={connectWallet}
            className="hidden sm:flex"
          >
            <Wallet className="h-4 w-4 mr-2" />
            {isWalletConnected ? 'Conectada' : 'Conectar Carteira'}
          </Button>

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
                  <AvatarImage src={state.user.avatar} alt={state.user.name} />
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
                  <p className="text-xs leading-none text-muted-foreground">
                    {state.user.email}
                  </p>
                  <Badge variant="secondary" className="w-fit">
                    {getRoleLabel(state.user.role)}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              
              {!isWalletConnected ? (
                <DropdownMenuItem onClick={connectWallet} className="cursor-pointer">
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>Conectar Carteira</span>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={disconnectWallet} className="cursor-pointer">
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>Desconectar Carteira</span>
                </DropdownMenuItem>
              )}
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}