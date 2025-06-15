
import { allSubmissions, stats } from "@/data/mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StatsCard from "./StatsCard";
import { FolderCheck, Hourglass, AlertCircle, Users } from 'lucide-react';

const getBadgeVariant = (status: string) => {
  switch (status) {
    case "Approved": return "success";
    case "Needs Correction": return "warning";
    case "Rejected": return "destructive";
    default: return "default";
  }
};

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Teachers" value={stats.totalSubmissions} icon={Users} description="Active teachers in the system" />
        <StatsCard title="Pending Review" value={stats.pendingReview} icon={Hourglass} description="Notes waiting for feedback" />
        <StatsCard title="Corrections Requested" value={stats.correctionsRequested} icon={AlertCircle} description="Notes sent back to teachers" />
        <StatsCard title="Approved This Week" value={15} icon={FolderCheck} description="Notes approved in Week 6" />
      </div>
      <Card>
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
              {allSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.teacher}</TableCell>
                  <TableCell>{submission.subject}</TableCell>
                  <TableCell>{submission.class}</TableCell>
                  <TableCell>{submission.week}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(submission.status) as any}>{submission.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Review</Button>
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

export default AdminDashboard;
