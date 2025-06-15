import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Settings = () => {
  const [subjects, setSubjects] = useState(['Mathematics', 'English Language', 'Integrated Science', 'Social Studies', 'R.M.E']);
  const [newSubject, setNewSubject] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState(localStorage.getItem('teacherName') || 'Teacher Name');
  const [email, setEmail] = useState(localStorage.getItem('teacherEmail') || 'teacher@school.com');

  const handleAddSubject = () => {
    const trimmedSubject = newSubject.trim();
    if (!trimmedSubject) {
      toast.error("Please enter a subject name.");
      return;
    }
    if (subjects.map(s => s.toLowerCase()).includes(trimmedSubject.toLowerCase())) {
      toast.error(`Subject "${trimmedSubject}" already exists.`);
      return;
    }
    setSubjects([...subjects, trimmedSubject]);
    setNewSubject('');
    toast.success(`Subject "${trimmedSubject}" added successfully.`);
  };

  const handleSaveChanges = () => {
    localStorage.setItem('teacherName', name);
    localStorage.setItem('teacherEmail', email);
    window.dispatchEvent(new Event("profileUpdated"));
    toast.success("Profile updated successfully!");
  };

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    toast.success("Password updated successfully!");
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <Button onClick={handleUpdatePassword}>Update Password</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subjects</CardTitle>
            <CardDescription>Manage school subjects.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Existing Subjects</Label>
              <div className="flex flex-wrap gap-2">
                {subjects.map(subject => (
                  <Badge key={subject} variant="secondary">{subject}</Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-subject">Add New Subject</Label>
              <div className="flex gap-2">
                <Input
                  id="new-subject"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Creative Arts"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSubject()}
                />
                <Button onClick={handleAddSubject}>Add Subject</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage your notification preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications" className="cursor-pointer">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive emails about submission status and reminders.</p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
             <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="in-app-notifications" className="cursor-pointer">In-app Notifications</Label>
                <p className="text-sm text-muted-foreground">Show notifications within the dashboard.</p>
              </div>
              <Switch id="in-app-notifications" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
