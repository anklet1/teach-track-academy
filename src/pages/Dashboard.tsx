
import { useLocation } from "react-router-dom";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import TeacherDashboard from "@/components/dashboard/TeacherDashboard";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Dashboard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get('role') || 'teacher';

  return (
    <DashboardLayout>
      {role === 'admin' ? <AdminDashboard /> : <TeacherDashboard />}
    </DashboardLayout>
  );
};

export default Dashboard;
