
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { allSubmissions as initialSubmissions } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import DashboardLayout from "@/components/layout/DashboardLayout";

const getBadgeVariant = (status: string) => {
  switch (status) {
    case "Approved": return "success";
    case "Needs Correction": return "warning";
    case "Rejected": return "destructive";
    default: return "default";
  }
};

type Submission = (typeof initialSubmissions)[0];

const ReviewNote = () => {
  const { submissionId } = useParams<{ submissionId: string }>();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [feedback, setFeedback] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const savedSubmissions = localStorage.getItem('submissions');
    const allSubmissions = savedSubmissions ? JSON.parse(savedSubmissions) : initialSubmissions;
    setSubmissions(allSubmissions);
    const currentSubmission = allSubmissions.find((s: Submission) => s.id === Number(submissionId));
    if (currentSubmission) {
      setSubmission(currentSubmission);
    } else {
      toast.error("Submission not found.");
      navigate("/dashboard?role=admin");
    }
  }, [submissionId, navigate]);

  const handleStatusUpdate = (newStatus: string) => {
    if (!submission) return;

    if ((newStatus === 'Needs Correction' || newStatus === 'Rejected') && !feedback.trim()) {
      toast.error("Feedback is required for this action.");
      return;
    }

    const updatedSubmissions = submissions.map((sub) =>
      sub.id === submission.id ? { ...sub, status: newStatus } : sub
    );
    
    localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
    toast.success(`Submission status updated to "${newStatus}".`);
    navigate("/dashboard?role=admin");
  };

  if (!submission) {
    return <DashboardLayout><p>Loading submission...</p></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Review Lesson Note</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-sm">
            <p><strong>Teacher:</strong> {submission.teacher}</p>
            <p><strong>Subject:</strong> {submission.subject}</p>
            <p><strong>Class:</strong> {submission.class}</p>
            <p><strong>Week:</strong> {submission.week}</p>
            <div className="flex items-center gap-2"><strong>Status:</strong> <Badge variant={getBadgeVariant(submission.status) as any}>{submission.status}</Badge></div>
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
        </CardContent>
        <CardFooter className="flex-wrap gap-2 justify-end">
           <Button variant="ghost" onClick={() => navigate("/dashboard?role=admin")}>Cancel</Button>
           <Button variant="destructive" onClick={() => handleStatusUpdate('Rejected')}>Reject</Button>
           <Button variant="secondary" onClick={() => handleStatusUpdate('Needs Correction')}>Needs Correction</Button>
           <Button onClick={() => handleStatusUpdate('Approved')}>Approve</Button>
        </CardFooter>
      </Card>
    </DashboardLayout>
  );
};

export default ReviewNote;
