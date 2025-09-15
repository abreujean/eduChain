import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { Dashboard } from "@/components/Dashboard";
import { RoleRoute } from "@/components/RoleRoute";
import LoginPage from "@/components/LoginPage";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

// Foundation Manager Pages
import SchoolsPage from "./pages/foundation/SchoolsPage";
import SchoolCreatePage from "./pages/foundation/SchoolCreatePage";
import SchoolDetailPage from "./pages/foundation/SchoolDetailPage";
import SchoolEditPage from "./pages/foundation/SchoolEditPage";
import ApprovalsPage from "./pages/foundation/ApprovalsPage";
import DistributionsPage from "./pages/foundation/DistributionsPage";
import AnalyticsPage from "./pages/foundation/AnalyticsPage";
import SettingsPage from "./pages/foundation/SettingsPage";

// School Manager Pages
import SchoolProfilePage from "./pages/school/SchoolProfilePage";
import MetricsPage from "./pages/school/MetricsPage";
import ResourcesPage from "./pages/school/ResourcesPage";
import TeachersPage from "./pages/school/TeachersPage";
import ReportsPage from "./pages/school/ReportsPage";

const queryClient = new QueryClient();

function AppContent() {
  const { state } = useAuth();
  
  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-surface">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!state.isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Foundation Manager Routes */}
        <Route path="/schools" element={
          <RoleRoute allowedRoles={['foundation_manager']}>
            <SchoolsPage />
          </RoleRoute>
        } />
        <Route path="/schools/new" element={
          <RoleRoute allowedRoles={['foundation_manager']}>
            <SchoolCreatePage />
          </RoleRoute>
        } />
        <Route path="/schools/:id" element={
          <RoleRoute allowedRoles={['foundation_manager']}>
            <SchoolDetailPage />
          </RoleRoute>
        } />
        <Route path="/schools/:id/edit" element={
          <RoleRoute allowedRoles={['foundation_manager']}>
            <SchoolEditPage />
          </RoleRoute>
        } />
        <Route path="/approvals" element={
          <RoleRoute allowedRoles={['foundation_manager']}>
            <ApprovalsPage />
          </RoleRoute>
        } />
        <Route path="/distributions" element={
          <RoleRoute allowedRoles={['foundation_manager']}>
            <DistributionsPage />
          </RoleRoute>
        } />
        <Route path="/analytics" element={
          <RoleRoute allowedRoles={['foundation_manager']}>
            <AnalyticsPage />
          </RoleRoute>
        } />
        <Route path="/settings" element={
          <RoleRoute allowedRoles={['foundation_manager']}>
            <SettingsPage />
          </RoleRoute>
        } />
        
        {/* School Manager Routes */}
        <Route path="/school-profile" element={
          <RoleRoute allowedRoles={['school_manager']}>
            <SchoolProfilePage />
          </RoleRoute>
        } />
        <Route path="/metrics" element={
          <RoleRoute allowedRoles={['school_manager']}>
            <MetricsPage />
          </RoleRoute>
        } />
        <Route path="/resources" element={
          <RoleRoute allowedRoles={['school_manager']}>
            <ResourcesPage />
          </RoleRoute>
        } />
        <Route path="/teachers" element={
          <RoleRoute allowedRoles={['school_manager']}>
            <TeachersPage />
          </RoleRoute>
        } />
        <Route path="/reports" element={
          <RoleRoute allowedRoles={['school_manager']}>
            <ReportsPage />
          </RoleRoute>
        } />
        
        {/* Special routes */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;