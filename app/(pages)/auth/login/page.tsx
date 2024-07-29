import { Card, CardContent, CardTitle } from "@/components/ui/card";
import LoginForm from "./form";

export default function LoginPage() {
  return (
    <Card className="p-8 rounded-lg shadow-lg w-full max-w-md">
      <CardTitle className="text-center mb-6">Welcome Back</CardTitle>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
