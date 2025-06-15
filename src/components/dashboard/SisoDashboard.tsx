import { useState, useMemo, useEffect } from "react";
import { allSubmissions as initialSubmissions, stats } from "@/data/mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StatsCard from "./StatsCard";
import TeacherReportChart from "./TeacherReportChart";
import { FolderCheck, Hourglass, AlertCircle, Users, FileText, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedWeek, setSelectedWeek] = useState('All Weeks');

  useEffect(() => {
    // In a real app, this might not be needed if SISO doesn't modify data
    localStorage.setItem('submissions', JSON.stringify(submissions));
  }, [submissions]);

  const classes = useMemo(() => ['All Classes', ...new Set(submissions.map(s => s.class))], [submissions]);
  const weeks = useMemo(() => {
      const weekSet = new Set(submissions.map(s => s.week.toString()));
      const weekArray = Array.from(weekSet).sort((a, b) => parseInt(a) - parseInt(b));
      return ['All Weeks', ...weekArray];
  }, [submissions]);

  const filteredAndSortedSubmissions = useMemo(() => {
    let filteredSubmissions = [...submissions];
    
    if (selectedClass !== 'All Classes') {
      filteredSubmissions = filteredSubmissions.filter(s => s.class === selectedClass);
    }

    if (selectedWeek !== 'All Weeks') {
      filteredSubmissions = filteredSubmissions.filter(s => s.week === parseInt(selectedWeek, 10));
    }

    const sortableItems = [...filteredSubmissions];
    sortableItems.sort((a, b) => {
      if (sortDirection === 'ascending') {
        return a.week - b.week;
      } else {
        return b.week - a.week;
      }
    });
    return sortableItems;
  }, [submissions, sortDirection, selectedClass, selectedWeek]);

  const toggleSort = () => {
    setSortDirection(prev => prev === 'ascending' ? 'descending' : 'ascending');
  };

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
  
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [reportContent, setReportContent] = useState("");

  const handleSendReport = () => {
    if (!reportContent.trim()) {
      toast.error("Report content cannot be empty.");
      return;
    }
    // In a real app, this would send the report to a server/backend.
    console.log("Sending report:", reportContent);
    toast.success("Report has been sent to the Headteacher.");
    setReportContent("");
    setIsReportDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">SISO Monitoring Dashboard</h2>
        <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Report to Headteacher
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Write Report</DialogTitle>
              <DialogDescription>
                Compose your report for the headteacher here. Click send when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="report-content">
                  Report
                </Label>
                <Textarea
                  id="report-content"
                  value={reportContent}
                  onChange={(e) => setReportContent(e.target.value)}
                  placeholder="Type your report here..."
                  className="min-h-[150px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleSendReport}>Send Report</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
          <div className="flex justify-between items-center">
            <CardTitle>Recent Lesson Note Submissions</CardTitle>
            <div className="flex items-center gap-2">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a week" />
                </SelectTrigger>
                <SelectContent>
                  {weeks.map(w => <SelectItem key={w} value={w}>{w}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Class</TableHead>
                <TableHead className="px-0">
                  <Button variant="ghost" onClick={toggleSort}>
                    Week
                    {sortDirection === 'ascending' 
                      ? <ArrowUp className="ml-2 h-4 w-4" /> 
                      : <ArrowDown className="ml-2 h-4 w-4" />}
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedSubmissions.map((submission) => (
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
