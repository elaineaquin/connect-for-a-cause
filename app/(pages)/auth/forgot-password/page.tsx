"use client";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();

  return (
    <Card className="p-8 rounded-lg shadow-lg w-full max-w-md">
      <CardTitle className="text-center mb-6">Forgot Password</CardTitle>
      <CardDescription className="text-center space-y-2">
        <div>Not yet implemented</div>
        <Button onClick={() => router.back()}>Go back</Button>
      </CardDescription>
    </Card>
  );
};

export default LogoutPage;
