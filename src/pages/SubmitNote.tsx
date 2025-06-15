
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { allSubmissions as initialSubmissions } from "@/data/mock";

const SubmitNote = () => {
  const [subject, setSubject] = useState("");
  const [classValue, setClassValue] = useState("");
  const [week, setWeek] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !classValue || !week) {
      toast.error("Please fill all fields.");
      return;
    }
    const newSubmission = {
      id: Date.now(),
      teacher: 'Current Teacher', // This should be dynamic based on logged in user
      subject,
      class: classValue,
      week: parseInt(week, 10),
      date: new Date().toISOString().split('T')[0],
      status: "Pending",
    };

    const savedSubmissions = localStorage.getItem('submissions');
    const submissions = savedSubmissions ? JSON.parse(savedSubmissions) : initialSubmissions;
    
    submissions.push(newSubmission);
    localStorage.setItem('submissions', JSON.stringify(submissions));

    toast.success("Lesson note submitted successfully!");
    // clear form
    setSubject("");
    setClassValue("");
    setWeek("");
  };
  
  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Submit a Lesson Note</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="e.g. Mathematics" value={subject} onChange={e => setSubject(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select onValueChange={setClassValue} value={classValue}>
                <SelectTrigger id="class">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JSS 1">JSS 1</SelectItem>
                  <SelectItem value="JSS 2">JSS 2</SelectItem>
                  <SelectItem value="JSS 3">JSS 3</SelectItem>
                  <SelectItem value="SSS 1">SSS 1</SelectItem>
                  <SelectItem value="SSS 2">SSS 2</SelectItem>
                  <SelectItem value="SSS 3">SSS 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="week">Week</Label>
              <Input id="week" type="number" placeholder="e.g. 5" value={week} onChange={e => setWeek(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">Lesson Note File</Label>
              <Input id="file" type="file" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default SubmitNote;
