
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (role: 'teacher' | 'admin' | 'siso') => {
    // In a real app, you'd perform authentication here.
    // For now, we'll just navigate to the dashboard with a query param.
    navigate(`/dashboard?role=${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-800">EduNeuron AI</h1>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Select your role to sign in to the dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-center text-muted-foreground">
            This is a simulated login. In a real application, this would be a secure form.
          </p>
          <Button size="lg" onClick={() => handleLogin('teacher')}>
            Sign in as Teacher
          </Button>
          <Button size="lg" variant="outline" onClick={() => handleLogin('admin')}>
            Sign in as Head Teacher/Admin
          </Button>
          <Button size="lg" variant="outline" onClick={() => handleLogin('siso')}>
            Sign in as SISO
          </Button>
          <div className="text-center mt-4">
            <Link to="/" className="text-sm text-primary hover:underline">
              &larr; Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
