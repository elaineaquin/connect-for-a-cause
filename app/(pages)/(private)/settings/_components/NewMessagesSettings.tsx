import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Pen } from "lucide-react";
import React from "react";

const NewMessagesSettings = () => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle>Collaboration Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-row items-center justify-between rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <Bell className="h-5 w-5" />
            <Label className="text-base">Enable Push Notifications</Label>
          </div>
          <Switch />
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <Pen className="h-5 w-5" />
            <Label className="text-base">
              Allow Collaborators to edit project details
            </Label>
          </div>
          <Switch />
        </div>
      </CardContent>{" "}
    </Card>
  );
};

export default NewMessagesSettings;
