"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/store/use-auth";
import { useEffect } from "react";

const LogoutPage = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <Card className="p-8 rounded-lg shadow-lg w-full max-w-md">
      <CardTitle className="text-center mb-6">Logging out</CardTitle>
      <CardDescription className="text-center space-y-2">
        Thank you for using our app
      </CardDescription>
    </Card>
  );
};

export default LogoutPage;
