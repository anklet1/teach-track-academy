
import { useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { allSubmissions } from "@/data/mock";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Reports = () => {
  const [selectedClass, setSelectedClass] = useState('All Classes');

  const classes = useMemo(() => ['All Classes', ...new Set(allSubmissions.map(s => s.class))], []);

  const filteredSubmissions = useMemo(() => {
    if (selectedClass === 'All Classes') {
      return allSubmissions;
    }
    return allSubmissions.filter(submission => submission.class === selectedClass);
  }, [selectedClass]);

  const statusData = useMemo(() => {
    const statusCounts = filteredSubmissions.reduce((acc, submission) => {
      acc[submission.status] = (acc[submission.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  }, [filteredSubmissions]);

  const teacherData = useMemo(() => {
    const teacherCounts = filteredSubmissions.reduce((acc, submission) => {
      acc[submission.teacher] = (acc[submission.teacher] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(teacherCounts)
      .map(([name, submissions]) => ({ name, submissions }))
      .sort((a, b) => b.submissions - a.submissions);
  }, [filteredSubmissions]);

  const COLORS = {
    'Approved': '#10B981',
    'Needs Correction': '#F59E0B',
    'Rejected': '#EF4444',
    'Pending': '#6B7280',
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Reports</h1>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a class" />
          </SelectTrigger>
          <SelectContent>
            {classes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Submissions by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                    if (percent === 0) return null;
                    return (
                      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                >
                  {statusData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#cccccc'} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, name as string]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Submissions by Teacher</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teacherData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="submissions" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
