import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Bell } from "lucide-react";
import React from "react";

const NotificationSettings = () => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle>Notification Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          className="w-full text-left flex items-center justify-start border border-gray-200"
          variant="ghost"
          size="lg"
        >
          <Mail className="me-2 h-5 w-5" /> Email Notifications
        </Button>
        <Button
          className="w-full text-left flex items-center justify-start border border-gray-200"
          variant="ghost"
          size="lg"
        >
          <Bell className="me-2 h-5 w-5" /> New Collaboration Request
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
