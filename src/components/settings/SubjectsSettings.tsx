
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from 'lucide-react';

interface SubjectsSettingsProps {
  role: string;
  subjects: string[];
  newSubject: string;
  setNewSubject: (subject: string) => void;
  handleAddSubject: () => void;
  handleDeleteSubject: (subject: string) => void;
}

const SubjectsSettings = ({
  role,
  subjects,
  newSubject,
  setNewSubject,
  handleAddSubject,
  handleDeleteSubject
}: SubjectsSettingsProps) => {
  return (
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
              <Badge key={subject} variant="secondary" className="group relative pr-7">
                {subject}
                {role === 'teacher' && (
                  <button
                    onClick={() => handleDeleteSubject(subject)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-0.5 transition-opacity opacity-0 group-hover:opacity-100 hover:bg-destructive/20"
                    aria-label={`Remove ${subject}`}
                  >
                    <X className="h-3 w-3 text-destructive" />
                  </button>
                )}
              </Badge>
            ))}
          </div>
        </div>
        {role === 'teacher' && (
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
        )}
      </CardContent>
    </Card>
  );
};

export default SubjectsSettings;
