
import React, { useEffect } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Book, Mail, Users, Settings, LogIn, FileText } from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();

  // Check if admin is authenticated
  useEffect(() => {
    const isAdmin = localStorage.getItem('adminAuth') === 'true';
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen bg-white">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-64 bg-navy text-white">
          <div className="flex items-center justify-center h-20 shadow-md">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex flex-col flex-1 py-4">
            <nav className="flex-1">
              <Link to="/admin/dashboard" className="flex items-center px-6 py-3 text-white hover:bg-navy-light">
                <LayoutDashboard size={20} className="mr-3" />
                <span>Dashboard</span>
              </Link>
              <Link to="/admin/books" className="flex items-center px-6 py-3 text-white hover:bg-navy-light">
                <Book size={20} className="mr-3" />
                <span>Books</span>
              </Link>
              <Link to="/admin/blogs" className="flex items-center px-6 py-3 text-white hover:bg-navy-light">
                <FileText size={20} className="mr-3" />
                <span>Blogs</span>
              </Link>
              <Link to="/admin/subscribers" className="flex items-center px-6 py-3 text-white hover:bg-navy-light">
                <Mail size={20} className="mr-3" />
                <span>Subscribers</span>
              </Link>
              <Link to="/admin/newsletter" className="flex items-center px-6 py-3 text-white hover:bg-navy-light">
                <Users size={20} className="mr-3" />
                <span>Newsletter</span>
              </Link>
              <Link to="/admin/settings" className="flex items-center px-6 py-3 text-white hover:bg-navy-light">
                <Settings size={20} className="mr-3" />
                <span>Settings</span>
              </Link>
            </nav>
            <div className="mt-auto px-6 py-4">
              <Button 
                variant="outline" 
                className="w-full border-white text-white hover:bg-navy-light"
                onClick={handleLogout}
              >
                <LogIn size={20} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile sidebar toggle */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-navy text-white h-16 flex items-center justify-between px-4">
          <h1 className="text-lg font-bold">Admin</h1>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-navy-light"
            onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')}
          >
            Menu
          </Button>
        </div>

        {/* Mobile sidebar */}
        <div id="mobile-menu" className="hidden md:hidden fixed inset-0 z-20 bg-navy bg-opacity-95 text-white pt-20">
          <div className="flex flex-col h-full">
            <nav className="flex-1">
              <Link to="/admin/dashboard" className="flex items-center px-6 py-4 text-white hover:bg-navy-light" onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}>
                <LayoutDashboard size={20} className="mr-3" />
                <span>Dashboard</span>
              </Link>
              <Link to="/admin/books" className="flex items-center px-6 py-4 text-white hover:bg-navy-light" onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}>
                <Book size={20} className="mr-3" />
                <span>Books</span>
              </Link>
              <Link to="/admin/blogs" className="flex items-center px-6 py-4 text-white hover:bg-navy-light" onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}>
                <FileText size={20} className="mr-3" />
                <span>Blogs</span>
              </Link>
              <Link to="/admin/subscribers" className="flex items-center px-6 py-4 text-white hover:bg-navy-light" onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}>
                <Mail size={20} className="mr-3" />
                <span>Subscribers</span>
              </Link>
              <Link to="/admin/newsletter" className="flex items-center px-6 py-4 text-white hover:bg-navy-light" onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}>
                <Users size={20} className="mr-3" />
                <span>Newsletter</span>
              </Link>
              <Link to="/admin/settings" className="flex items-center px-6 py-4 text-white hover:bg-navy-light" onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}>
                <Settings size={20} className="mr-3" />
                <span>Settings</span>
              </Link>
            </nav>
            <div className="px-6 py-4 border-t border-navy-light">
              <Button 
                variant="outline" 
                className="w-full border-white text-white hover:bg-navy-light"
                onClick={handleLogout}
              >
                <LogIn size={20} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-gray-50 pt-16 md:pt-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
