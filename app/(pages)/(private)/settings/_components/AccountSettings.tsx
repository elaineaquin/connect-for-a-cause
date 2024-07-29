import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, Lock } from "lucide-react";
import React from "react";

const AccountSettings = () => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Login & Security</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          className="w-full text-left flex items-center justify-start border border-gray-200"
          variant="ghost"
          size="lg"
        >
          <Lock className="me-2 h-5 w-5" /> Change Password
        </Button>
        <Button
          className="w-full text-left flex items-center justify-start border border-gray-200"
          variant="ghost"
          size="lg"
        >
          <Activity className="me-2 h-5 w-5" /> Activity Logs
        </Button>
      </CardContent>
    </Card>
  );
};

export default AccountSettings;
