import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  School, 
  CheckCircle, 
  DollarSign, 
  BarChart3, 
  Settings,
  GraduationCap,
  FileText,
  TrendingUp,
  Users,
  Home
} from 'lucide-react';

export function AppSidebar() {
  const { t } = useTranslation();
  const { state: authState } = useAuth();
  const { state: sidebarState } = useSidebar();
  const collapsed = sidebarState === 'collapsed';
  const location = useLocation();

  const foundationItems = [
    { title: t('menu_dashboard'), url: '/dashboard', icon: LayoutDashboard },
    { title: t('menu_schools'), url: '/schools', icon: School },
    { title: t('menu_approvals'), url: '/approvals', icon: CheckCircle },
    { title: t('menu_distributions'), url: '/distributions', icon: DollarSign },
    { title: t('menu_analytics'), url: '/analytics', icon: BarChart3 },
    { title: t('menu_settings'), url: '/settings', icon: Settings },
  ];

  const schoolItems = [
    { title: t('menu_dashboard'), url: '/dashboard', icon: Home },
    { title: t('menu_my_school'), url: '/school-profile', icon: School },
    { title: t('menu_metrics'), url: '/metrics', icon: TrendingUp },
    { title: t('menu_resources'), url: '/resources', icon: DollarSign },
    { title: t('menu_teachers'), url: '/teachers', icon: Users },
    { title: t('menu_reports'), url: '/reports', icon: FileText },
  ];
  
  if (!authState.user) return null;

  const items = authState.user.role === 'foundation_manager' ? foundationItems : schoolItems;
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-primary/10 text-primary font-medium border-r-2 border-primary' : 'hover:bg-muted/50 transition-smooth';

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-gradient-surface border-r border-border/50">
        
        {/* Logo Section */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg flex-shrink-0">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold educhain-brand">EduChain</h1>
                <p className="text-xs text-muted-foreground">{t('menu_foundation_subtitle')}</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? 'sr-only' : ''}>
            {authState.user.role === 'foundation_manager' ? t('menu_foundation_management') : t('menu_school_management')}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Badge */}
        {!collapsed && (
          <div className="p-4 mt-auto">
            <div className="bg-success/10 border border-success/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
                <span className="text-xs font-medium text-success">{t('menu_system_online')}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t('menu_stellar_connected')}
              </p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}