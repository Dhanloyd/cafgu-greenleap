import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar, MobileSidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Bell, Settings } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top Navigation */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-4">
            <MobileSidebar />
            <h1 className="text-xl font-semibold text-foreground">CAFGU Lending System</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;