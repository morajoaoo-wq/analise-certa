import { 
  LayoutDashboard, 
  FolderKanban, 
  Calendar, 
  FileSearch, 
  Users, 
  Building2, 
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  roles: ('master' | 'admin' | 'user')[];
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', roles: ['master', 'admin', 'user'] },
  { icon: FolderKanban, label: 'Projetos', href: '/projetos', roles: ['admin', 'user'] },
  { icon: FileSearch, label: 'Nova Análise', href: '/analise/nova', roles: ['user'] },
  { icon: Calendar, label: 'Calendário', href: '/calendario', roles: ['admin', 'user'] },
  { icon: Users, label: 'Analistas', href: '/analistas', roles: ['admin'] },
  { icon: Building2, label: 'Prefeituras', href: '/prefeituras', roles: ['master'] },
  { icon: BarChart3, label: 'Relatórios', href: '/relatorios', roles: ['master', 'admin'] },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const filteredItems = navItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'master': return 'Master';
      case 'admin': return 'Secretário';
      case 'user': return 'Analista';
      default: return role;
    }
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-semibold text-sidebar-foreground">UrbanPlan</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-muted-foreground hover:text-foreground"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Quick Action */}
      {user?.role === 'user' && (
        <div className="p-3">
          <NavLink to="/analise/nova">
            <Button 
              variant="gradient" 
              className={cn("w-full justify-start gap-2", collapsed && "justify-center px-0")}
            >
              <Plus className="w-4 h-4" />
              {!collapsed && <span>Nova Análise</span>}
            </Button>
          </NavLink>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {filteredItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-white/20 text-white" 
                  : "text-white/80 hover:bg-white/10 hover:text-white",
                collapsed && "justify-center px-0"
              )}
            >
              <item.icon className={cn("w-5 h-5 shrink-0", isActive && "text-white")} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <NavLink
          to="/configuracoes"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors",
            collapsed && "justify-center px-0"
          )}
        >
          <Settings className="w-5 h-5" />
          {!collapsed && <span>Configurações</span>}
        </NavLink>

        {/* User Info */}
        <div className={cn(
          "flex items-center gap-3 px-3 py-3 rounded-lg bg-white/10",
          collapsed && "justify-center px-2"
        )}>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <span className="text-xs font-medium text-white">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-white/70">{getRoleLabel(user?.role || '')}</p>
            </div>
          )}
        </div>

        <button
          onClick={logout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-300 hover:bg-red-500/20 transition-colors",
            collapsed && "justify-center px-0"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
}
