
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { teacherSubmissions } from "@/data/mock";

const getBadgeVariant = (status: string) => {
  switch (status) {
    case "Approved": return "success";
    case "Needs Correction": return "warning";
    case "Rejected": return "destructive";
    default: return "default";
  }
};

const TeacherDashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Submit Lesson Note</CardTitle>
            <CardDescription>Upload your weekly lesson note for review.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="term">Term</Label>
              <Select>
                <SelectTrigger id="term"><SelectValue placeholder="Select Term" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Term 1</SelectItem>
                  <SelectItem value="2">Term 2</SelectItem>
                  <SelectItem value="3">Term 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="week">Week</Label>
              <Select>
                <SelectTrigger id="week"><SelectValue placeholder="Select Week" /></SelectTrigger>
                <SelectContent>
                  {[...Array(15)].map((_, i) => (
                    <SelectItem key={i + 1} value={`${i + 1}`}>Week {i + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select>
                <SelectTrigger id="subject"><SelectValue placeholder="Select Subject" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="maths">Mathematics</SelectItem>
                  <SelectItem value="english">English Language</SelectItem>
                  <SelectItem value="science">Integrated Science</SelectItem>
                  <SelectItem value="social">Social Studies</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="file">Lesson Note File</Label>
                <Input id="file" type="file" />
            </div>
            <Button className="w-full">Upload Lesson Note</Button>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>My Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Week</TableHead>
                  <TableHead>Term</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Uploaded On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teacherSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>{submission.subject}</TableCell>
                    <TableCell>{submission.week}</TableCell>
                    <TableCell>{submission.term}</TableCell>
                    <TableCell><Badge variant={getBadgeVariant(submission.status) as any}>{submission.status}</Badge></TableCell>
                    <TableCell>{submission.uploadedOn}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
