import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Home, 
  Users, 
  UserPlus, 
  CreditCard, 
  Building2, 
  Shield, 
  FileText,
  LogOut,
  Menu
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<any>;
  isHeader?: boolean;
}

const navigation: NavItem[] = [
  { title: 'Analytics', href: '/analytics', icon: BarChart3 },
  { title: 'Dashboard', href: '/dashboard', icon: Home },
  { title: 'MANAGE', href: '', icon: Menu, isHeader: true },
  { title: 'Borrowers', href: '/borrowers', icon: UserPlus },
  { title: 'Members', href: '/members', icon: Users },
  { title: 'Loans', href: '/loans', icon: CreditCard },
  { title: 'Patrol Base', href: '/patrol-base', icon: Building2 },
  { title: 'Users', href: '/users', icon: Shield },
  { title: 'PRINTABLES', href: '', icon: FileText, isHeader: true },
  { title: 'Reports', href: '/reports', icon: FileText },
];

interface SidebarProps {
  className?: string;
}

const SidebarContent: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <div className={cn('pb-12 w-64', className)}>
      <div className="space-y-4 py-4">
        {/* Logo */}
        <div className="px-6 py-2">
          <h2 className="text-2xl font-bold text-sidebar-foreground">CZMPC</h2>
          <p className="text-sm text-sidebar-foreground/80">Lending System</p>
        </div>

        {/* Navigation */}
        <div className="px-3 py-2">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              
              if (item.isHeader) {
                return (
                  <div 
                    key={item.title}
                    className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider mt-6 first:mt-0"
                  >
                    {item.title}
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-sidebar-foreground',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50'
                  )}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.title}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* User Info & Logout */}
        <div className="px-3 mt-auto">
          <div className="bg-sidebar-accent/30 rounded-lg p-3 mb-3">
            <p className="text-sm font-medium text-sidebar-foreground">{user?.username}</p>
            <p className="text-xs text-sidebar-foreground/70">{user?.role}</p>
          </div>
          
          <Button
            onClick={logout}
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

// Desktop Sidebar
export const Sidebar: React.FC = () => {
  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-50 bg-sidebar border-r border-sidebar-border">
      <SidebarContent />
    </div>
  );
};

// Mobile Sidebar
export const MobileSidebar: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-sidebar">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
};