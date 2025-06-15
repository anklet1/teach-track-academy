
import { Link, useLocation } from 'react-router-dom';
import { Home, Upload, CheckSquare, BarChart, Settings, BookOpen, LogOut, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

const commonLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const teacherLinks = [
  { href: '/submit-note', label: 'Submit Note', icon: Upload },
  { href: '/my-submissions', label: 'My Submissions', icon: CheckSquare },
];

const adminLinks = [
  { href: '/dashboard', label: 'Review Notes', icon: CheckSquare },
  { href: '/reports', label: 'Reports', icon: BarChart },
];

const sisoLinks = [
  { href: '/dashboard', label: 'Monitor Teachers', icon: Monitor },
  { href: '/reports', label: 'Reports', icon: BarChart },
];

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get('role') || 'teacher';
  
  let currentLinks;
  if (role === 'admin') {
    currentLinks = adminLinks;
  } else if (role === 'siso') {
    currentLinks = sisoLinks;
  } else {
    currentLinks = teacherLinks;
  }
  const links = [...commonLinks.slice(0, 1), ...currentLinks, ...commonLinks.slice(1)];


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
            {links.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <li key={link.label}>
                  <Link 
                    to={{ pathname: link.href, search: location.search }} 
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 transition-colors",
                      isActive && "bg-gray-700"
                    )}
                  >
                    <link.icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
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
