
import { Link, useLocation } from 'react-router-dom';
import { Home, Upload, CheckSquare, BarChart, Settings, BookOpen, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const commonLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '#', label: 'Settings', icon: Settings },
];

const teacherLinks = [
  { href: '#', label: 'Submit Note', icon: Upload },
  { href: '#', label: 'My Submissions', icon: CheckSquare },
];

const adminLinks = [
  { href: '#', label: 'Review Notes', icon: CheckSquare },
  { href: '#', label: 'Reports', icon: BarChart },
];

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get('role') || 'teacher';
  const links = role === 'admin' ? [...commonLinks.slice(0, 1), ...adminLinks, ...commonLinks.slice(1)] : [...commonLinks.slice(0, 1), ...teacherLinks, ...commonLinks.slice(1)];

  return (
    <>
      <aside className={cn(
        "fixed md:relative z-20 h-full bg-gray-800 text-white w-64 flex-shrink-0 transition-transform transform",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0"
      )}>
        <div className="p-4 flex items-center gap-2 border-b border-gray-700">
          <BookOpen className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold">TMS</h1>
        </div>
        <nav className="p-4 flex flex-col h-[calc(100%-120px)]">
            <ul className="space-y-2 flex-grow">
            {links.map((link) => (
              <li key={link.label}>
                <Link to={`${link.href}${location.search}`} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 transition-colors">
                  <link.icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
           <Link to="/login" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 transition-colors mt-auto">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </Link>
        </nav>
      </aside>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-10 md:hidden" onClick={onClose}></div>}
    </>
  );
};

export default Sidebar;
