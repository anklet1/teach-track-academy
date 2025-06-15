
import { useState, useMemo } from "react";
import { allSubmissions as initialSubmissions, stats } from "@/data/mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StatsCard from "./StatsCard";
import TeacherReportChart from "./TeacherReportChart";
import { FolderCheck, Hourglass, AlertCircle, Users } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [feedback, setFeedback] = useState("");

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

  const handleReviewClick = (submission: Submission) => {
    setSelectedSubmission(submission);
    setFeedback("");
  };

  const handleStatusUpdate = (newStatus: string) => {
    if (!selectedSubmission) return;

    if ((newStatus === 'Needs Correction' || newStatus === 'Rejected') && !feedback.trim()) {
      toast.error("Feedback is required for this action.");
      return;
    }

    setSubmissions(
      submissions.map((sub) =>
        sub.id === selectedSubmission.id ? { ...sub, status: newStatus } : sub
      )
    );
    
    console.log(`Status for submission ${selectedSubmission.id} updated to ${newStatus}. Feedback: ${feedback}`);
    toast.success(`Submission status updated to "${newStatus}".`);
    setSelectedSubmission(null);
  };

  return (
    <div className="space-y-6">
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
                <TableHead>Actions</TableHead>
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
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleReviewClick(submission)}>Review</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedSubmission && (
        <Dialog open={!!selectedSubmission} onOpenChange={(isOpen) => !isOpen && setSelectedSubmission(null)}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Review Lesson Note</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2 text-sm">
                <p><strong>Teacher:</strong> {selectedSubmission.teacher}</p>
                <p><strong>Subject:</strong> {selectedSubmission.subject}</p>
                <p><strong>Class:</strong> {selectedSubmission.class}</p>
                <p><strong>Week:</strong> {selectedSubmission.week}</p>
                <div className="flex items-center gap-2"><strong>Status:</strong> <Badge variant={getBadgeVariant(selectedSubmission.status) as any}>{selectedSubmission.status}</Badge></div>
                <div className="flex items-center gap-1"><strong>File:</strong> <Button variant="link" className="p-0 h-auto text-sm">Download Lesson Note</Button></div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback</Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide feedback for the teacher. Required for 'Needs Correction' or 'Rejected'."
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter className="flex-wrap gap-2 sm:justify-end">
               <Button variant="ghost" onClick={() => setSelectedSubmission(null)}>Cancel</Button>
               <Button variant="destructive" onClick={() => handleStatusUpdate('Rejected')}>Reject</Button>
               <Button variant="secondary" onClick={() => handleStatusUpdate('Needs Correction')}>Needs Correction</Button>
               <Button onClick={() => handleStatusUpdate('Approved')}>Approve</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminDashboard;
