import { useAuth } from '@/contexts/AuthContext';
import { AnalystDashboard } from '@/components/dashboard/AnalystDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { MasterDashboard } from '@/components/dashboard/MasterDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'master':
      return <MasterDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'user':
    default:
      return <AnalystDashboard />;
  }
}
