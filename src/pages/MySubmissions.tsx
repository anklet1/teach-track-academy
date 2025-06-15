import { useState, useEffect, useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { allSubmissions as initialSubmissions } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
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

const MySubmissions = () => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');
    const [selectedClass, setSelectedClass] = useState('All Classes');
    const [selectedWeek, setSelectedWeek] = useState('All Weeks');

    useEffect(() => {
        const savedSubmissions = localStorage.getItem('submissions');
        const allSubmissions = savedSubmissions ? JSON.parse(savedSubmissions) : initialSubmissions;
        // In a real app, you'd filter by logged-in teacher
        // For now, we show all submissions
        setSubmissions(allSubmissions);
    }, []);

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


  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>My Submissions</CardTitle>
            <div className="flex gap-2">
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
              {filteredAndSortedSubmissions.length > 0 ? filteredAndSortedSubmissions.map((submission) => (
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
