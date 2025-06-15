
import { useLocation } from "react-router-dom";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import TeacherDashboard from "@/components/dashboard/TeacherDashboard";
import SisoDashboard from "@/components/dashboard/SisoDashboard";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Dashboard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get('role') || 'teacher';

  const renderDashboard = () => {
    switch (role) {
      case 'admin':
        return <AdminDashboard />;
      case 'siso':
        return <SisoDashboard />;
      default:
        return <TeacherDashboard />;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default Dashboard;
