
import { useState, useEffect, useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { allSubmissions as initialSubmissions } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";

const getBadgeVariant = (status: string) => {
  switch (status) {
    case "Approved": return "success";
    case "Needs Correction": return "warning";
    case "Rejected": return "destructive";
    default: return "default";
  }
};

type Submission = (typeof initialSubmissions)[0];

const MySubmissions = () => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');

    useEffect(() => {
        const savedSubmissions = localStorage.getItem('submissions');
        const allSubmissions = savedSubmissions ? JSON.parse(savedSubmissions) : initialSubmissions;
        // In a real app, you'd filter by logged-in teacher
        // For now, we show all submissions
        setSubmissions(allSubmissions);
    }, []);

    const sortedSubmissions = useMemo(() => {
      const sortableItems = [...submissions];
      sortableItems.sort((a, b) => {
        if (sortDirection === 'ascending') {
          return a.week - b.week;
        } else {
          return b.week - a.week;
        }
      });
      return sortableItems;
    }, [submissions, sortDirection]);

    const toggleSort = () => {
      setSortDirection(prev => prev === 'ascending' ? 'descending' : 'ascending');
    };


  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>My Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
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
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedSubmissions.length > 0 ? sortedSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.subject}</TableCell>
                  <TableCell>{submission.class}</TableCell>
                  <TableCell>{submission.week}</TableCell>
                  <TableCell>{submission.uploadedOn}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(submission.status) as any}>{submission.status}</Badge>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No submissions yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default MySubmissions;
