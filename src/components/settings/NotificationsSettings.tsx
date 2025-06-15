
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const NotificationsSettings = () => {
  return (
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
  );
};

export default NotificationsSettings;
