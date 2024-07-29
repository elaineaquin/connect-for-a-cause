import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CheckCircle, Edit2 } from "lucide-react";
import React from "react";

const CollaborationSettings = () => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle>Collaboration Settings</CardTitle>
        <CardDescription>Manage your collaboration preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-row items-center justify-between rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5" />
            <Label className="text-base">
              Automatically accept collaboration requests from trusted partners
            </Label>
          </div>
          <Switch />
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <Edit2 className="h-5 w-5" />
            <Label className="text-base">
              Allow collaborators to edit project details
            </Label>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );
};

export default CollaborationSettings;
