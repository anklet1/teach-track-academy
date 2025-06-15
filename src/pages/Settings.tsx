
import { useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";
import ProfileSettings from "@/components/settings/ProfileSettings";
import PasswordSettings from "@/components/settings/PasswordSettings";
import SubjectsSettings from "@/components/settings/SubjectsSettings";
import NotificationsSettings from "@/components/settings/NotificationsSettings";

const Settings = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get('role') || 'teacher';

  const [subjects, setSubjects] = useState(['Mathematics', 'English Language', 'Integrated Science', 'Social Studies', 'R.M.E']);
  const [newSubject, setNewSubject] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState(localStorage.getItem('teacherName') || 'Teacher Name');
  const [email, setEmail] = useState(localStorage.getItem('teacherEmail') || 'teacher@school.com');
  const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePic') || '');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const allowedTypes = ["image/jpeg", "image/png"];

      if (!allowedTypes.includes(file.type)) {
        toast.error("Please select a PNG or JPEG image.");
        e.target.value = ""; // Clear the file input
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setProfilePic(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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

  const handleDeleteSubject = (subjectToDelete: string) => {
    setSubjects(subjects.filter(subject => subject !== subjectToDelete));
    toast.success(`Subject "${subjectToDelete}" removed successfully.`);
  };

  const handleSaveChanges = () => {
    localStorage.setItem('teacherName', name);
    localStorage.setItem('teacherEmail', email);
    localStorage.setItem('profilePic', profilePic);
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
        <ProfileSettings
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          profilePic={profilePic}
          handleImageChange={handleImageChange}
          handleSaveChanges={handleSaveChanges}
        />
        <PasswordSettings
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          handleUpdatePassword={handleUpdatePassword}
        />
        <SubjectsSettings
          role={role}
          subjects={subjects}
          newSubject={newSubject}
          setNewSubject={setNewSubject}
          handleAddSubject={handleAddSubject}
          handleDeleteSubject={handleDeleteSubject}
        />
        <NotificationsSettings />
      </div>
    </DashboardLayout>
  );
};

export default Settings;
