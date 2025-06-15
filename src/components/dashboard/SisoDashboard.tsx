
import { useState, useMemo, useEffect } from "react";
import { allSubmissions as initialSubmissions, stats } from "@/data/mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StatsCard from "./StatsCard";
import TeacherReportChart from "./TeacherReportChart";
import { FolderCheck, Hourglass, AlertCircle, Users, FileText } from 'lucide-react';
import { toast } from "sonner";

const getBadgeVariant = (status: string) => {
  switch (status) {
    case "Approved": return "success";
    case "Needs Correction": return "warning";
    case "Rejected": return "destructive";
    default: return "default";
  }
};

type Submission = (typeof initialSubmissions)[0];

const SisoDashboard = () => {
  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    try {
      const savedSubmissions = localStorage.getItem('submissions');
      return savedSubmissions ? JSON.parse(savedSubmissions) : initialSubmissions;
    } catch (error) {
      console.error("Error parsing submissions from localStorage", error);
      return initialSubmissions;
    }
  });

  useEffect(() => {
    // In a real app, this might not be needed if SISO doesn't modify data
    localStorage.setItem('submissions', JSON.stringify(submissions));
  }, [submissions]);

  const teacherReports = useMemo(() => {
    const reports: { [teacher: string]: { [status: string]: number } } = {};

    submissions.forEach(submission => {
      if (!reports[submission.teacher]) {
        reports[submission.teacher] = {
          'Approved': 0,
          'Pending': 0,
          'Rejected': 0,
          'Needs Correction': 0,
        };
      }
      if (submission.status in reports[submission.teacher]) {
         reports[submission.teacher][submission.status]++;
      }
    });

    return Object.entries(reports).map(([teacherName, stats]) => ({
      teacherName,
      data: Object.entries(stats).map(([status, count]) => ({ status, count })),
    }));
  }, [submissions]);
  
  const handleGenerateReport = () => {
    toast.success("Report has been generated and sent to the Headteacher.");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">SISO Monitoring Dashboard</h2>
        <Button onClick={handleGenerateReport}>
          <FileText className="mr-2 h-4 w-4" />
          Report to Headteacher
        </Button>
      </div>

      <div id="reports" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Teachers" value={stats.totalSubmissions} icon={Users} description="Active teachers in the system" />
        <StatsCard title="Pending Review" value={stats.pendingReview} icon={Hourglass} description="Notes waiting for feedback" />
        <StatsCard title="Corrections Requested" value={stats.correctionsRequested} icon={AlertCircle} description="Notes sent back to teachers" />
        <StatsCard title="Approved This Week" value={15} icon={FolderCheck} description="Notes approved in Week 6" />
      </div>

      <Card id="teacher-reports">
        <CardHeader>
          <CardTitle>Teacher Submission Reports</CardTitle>
        </CardHeader>
        <CardContent>
           <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {teacherReports.map((report) => (
              <TeacherReportChart
                key={report.teacherName}
                teacherName={report.teacherName}
                data={report.data}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card id="review-notes">
        <CardHeader>
          <CardTitle>Recent Lesson Note Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Week</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.teacher}</TableCell>
                  <TableCell>{submission.subject}</TableCell>
                  <TableCell>{submission.class}</TableCell>
                  <TableCell>{submission.week}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(submission.status) as any}>{submission.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SisoDashboard;
