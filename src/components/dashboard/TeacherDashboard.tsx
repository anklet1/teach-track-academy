
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { teacherSubmissions as initialSubmissions } from "@/data/mock";
import { toast } from "sonner";
import { Upload } from "lucide-react";

const getBadgeVariant = (status: string) => {
  switch (status) {
    case "Approved": return "success";
    case "Needs Correction": return "warning";
    case "Rejected": return "destructive";
    case "Pending": return "default";
    default: return "secondary";
  }
};

const TeacherDashboard = () => {
  const [term, setTerm] = useState("");
  const [week, setWeek] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [subjects] = useState(['Mathematics', 'English Language', 'Integrated Science', 'Social Studies', 'R.M.E']);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!term || !week || !subject || !file) {
      toast.error("Please fill all fields and select a file.");
      return;
    }

    const newSubmission = {
      id: submissions.length + 1,
      subject,
      week: `Week ${week}`,
      term: `Term ${term}`,
      status: "Pending",
      uploadedOn: new Date().toLocaleDateString("en-GB"),
    };

    setSubmissions([newSubmission, ...submissions]);
    
    toast.success("Lesson note uploaded successfully!");

    setTerm("");
    setWeek("");
    setSubject("");
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card id="submit-note">
          <CardHeader>
            <CardTitle>Submit Lesson Note</CardTitle>
            <CardDescription>Upload your weekly lesson note for review.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="term">Term</Label>
              <Select value={term} onValueChange={setTerm}>
                <SelectTrigger id="term">
                  <SelectValue placeholder="Select Term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Term 1</SelectItem>
                  <SelectItem value="2">Term 2</SelectItem>
                  <SelectItem value="3">Term 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="week">Week</Label>
              <Select value={week} onValueChange={setWeek}>
                <SelectTrigger id="week">
                  <SelectValue placeholder="Select Week" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(15)].map((_, i) => (
                    <SelectItem key={i + 1} value={`${i + 1}`}>Week {i + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">Lesson Note File</Label>
              <Input id="file" type="file" ref={fileInputRef} onChange={handleFileChange} />
            </div>
            <Button className="w-full" onClick={handleSubmit}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Lesson Note
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card id="my-submissions">
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
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>{submission.subject}</TableCell>
                    <TableCell>{submission.week}</TableCell>
                    <TableCell>{submission.term}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(submission.status) as any}>
                        {submission.status}
                      </Badge>
                    </TableCell>
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
