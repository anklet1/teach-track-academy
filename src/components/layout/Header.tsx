
import { useEffect, useState } from 'react';
import { Bell, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get('role') || 'teacher';
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    const updateProfileData = () => {
      if (role === 'admin') {
        setUserName('Head Teacher');
        setUserEmail('admin@school.com');
        setProfilePic('');
      } else {
        setUserName(localStorage.getItem('teacherName') || 'Teacher');
        setUserEmail(localStorage.getItem('teacherEmail') || 'teacher@school.com');
        setProfilePic(localStorage.getItem('profilePic') || '');
      }
    };

    updateProfileData();

    window.addEventListener('profileUpdated', updateProfileData);

    return () => {
      window.removeEventListener('profileUpdated', updateProfileData);
    };
  }, [role]);

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b sticky top-0 z-10">
      <div className="flex items-center gap-4">
         <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-semibold capitalize">{role}'s Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={profilePic} alt={userName} />
              <AvatarFallback>
                {userName ? userName.split(' ').filter(n => n).map(n => n[0]).join('').toUpperCase() : <User className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm capitalize">{userName}</p>
              <p className="text-xs text-muted-foreground">{userEmail}</p>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
