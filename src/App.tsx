import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthLayout from "@/components/AuthLayout";
import DashboardLayout from "@/components/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import Analytics from "@/pages/Analytics";
import Borrowers from "@/pages/Borrowers";
import Members from "@/pages/Members";
import Loans from "@/pages/Loans";
import PatrolBase from "@/pages/PatrolBase";
import Users from "@/pages/Users";
import Reports from "@/pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Authentication */}
            <Route path="/auth" element={<AuthLayout />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
            <Route path="/analytics" element={<DashboardLayout><Analytics /></DashboardLayout>} />
            <Route path="/borrowers" element={<DashboardLayout><Borrowers /></DashboardLayout>} />
            <Route path="/members" element={<DashboardLayout><Members /></DashboardLayout>} />
            <Route path="/loans" element={<DashboardLayout><Loans /></DashboardLayout>} />
            <Route path="/patrol-base" element={<DashboardLayout><PatrolBase /></DashboardLayout>} />
            <Route path="/users" element={<DashboardLayout><Users /></DashboardLayout>} />
            <Route path="/reports" element={<DashboardLayout><Reports /></DashboardLayout>} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
