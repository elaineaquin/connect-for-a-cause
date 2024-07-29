import { Card, CardContent, CardTitle } from "@/components/ui/card";
import RegisterForm from "./form";

export default function RegisterPage() {
  return (
    <Card className="p-8 rounded-lg shadow-lg w-full max-w-md">
      <CardTitle className="text-center mb-6">Register</CardTitle>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
