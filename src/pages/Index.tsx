
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, CheckCircle, BarChart2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="p-4 px-8 flex justify-between items-center bg-white border-b">
        <div className="flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold text-gray-800">TMS</h1>
        </div>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Streamline Lesson Note Management
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A modern platform for teachers to submit lesson notes and for school authorities to track, vet, and provide feedback efficiently.
          </p>
          <Link to="/login">
            <Button size="lg" className="text-lg px-8 py-6">Get Started</Button>
          </Link>
        </div>
      </main>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800">Key Features</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 border rounded-lg">
              <CheckCircle className="w-12 h-12 text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-2">Easy Submission</h4>
              <p className="text-muted-foreground">Teachers can upload their weekly lesson notes in just a few clicks.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border rounded-lg">
              <BookOpen className="w-12 h-12 text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-2">Efficient Vetting</h4>
              <p className="text-muted-foreground">Admins can review submissions, provide feedback, and approve notes seamlessly.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border rounded-lg">
              <BarChart2 className="w-12 h-12 text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-2">Insightful Dashboards</h4>
              <p className="text-muted-foreground">Get real-time statistics on submission rates and performance.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; {new Date().getFullYear()} Teacher Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
