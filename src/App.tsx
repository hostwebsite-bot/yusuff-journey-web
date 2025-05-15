
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Book from "./pages/Book";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Daytopia from "./pages/Daytopia";
import Vacua from "./pages/Vacua";
import Blog from "./pages/Blog";
import Books from "./pages/Books";
import NotFound from "./pages/NotFound";
import BookDetail from "./pages/BookDetail";
import BlogPost from "./pages/BlogPost";

// Admin routes
import Login from "./pages/admin/Login";
import ForgotPassword from "./pages/admin/ForgotPassword";
import VerifyOTP from "./pages/admin/VerifyOTP";
import ChangePassword from "./pages/admin/ChangePassword";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminBooks from "./pages/admin/Books";
import AdminBlogs from "./pages/admin/Blogs";
import Subscribers from "./pages/admin/Subscribers";
import Newsletter from "./pages/admin/Newsletter";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/book" element={<Book />} />
          <Route path="/about" element={<About />} />
          <Route path="/daytopia" element={<Daytopia />} />
          <Route path="/vacua" element={<Vacua />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:blogId" element={<BlogPost />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:bookId" element={<BookDetail />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin routes - not visible in navigation */}
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/verify-otp" element={<VerifyOTP />} />
          <Route path="/admin/change-password" element={<ChangePassword />} />
          
          {/* Protected admin routes - require authentication */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="books" element={<AdminBooks />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="subscribers" element={<Subscribers />} />
            <Route path="newsletter" element={<Newsletter />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
