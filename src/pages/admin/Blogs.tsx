
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from '@/components/ui/sonner';
import { Plus, Edit, Trash2 } from "lucide-react";
import { BlogPost } from '@/services/api/apiSlice';

const Blogs = () => {
  const [open, setOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  
  // Mock blog data that matches the structure on the main blog page
  const [blogs, setBlogs] = useState<BlogPost[]>([
    {
      id: 'financial-habits-students',
      title: 'The Impact of Financial Literacy on Academic Success',
      author: "Dr. Awosanya Yusuff",
      excerpt: "Exploring the often-overlooked connection between understanding personal finance and achieving academic excellence.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      category: "finance",
      date: "May 10, 2025",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      readTime: "8 min read"
    },
    {
      id: 'passion-purpose-education',
      title: '5 Study Techniques That Actually Work, According to Science',
      author: "Dr. Awosanya Yusuff",
      excerpt: "Evidence-based approaches to studying that can dramatically improve retention and understanding of complex material.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      category: "education",
      date: "May 3, 2025",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      readTime: "6 min read"
    }
  ]);

  const [formData, setFormData] = useState<BlogPost>({
    id: "",
    title: "",
    author: "",
    excerpt: "",
    content: "",
    category: "",
    date: "",
    image: "",
    readTime: ""
  });

  const handleOpenDialog = (blog: BlogPost | null = null) => {
    if (blog) {
      setFormData(blog);
      setEditingBlog(blog);
    } else {
      setFormData({
        id: "",
        title: "",
        author: "Dr. Awosanya Yusuff",
        excerpt: "",
        content: "",
        category: "",
        date: new Date().toISOString().split('T')[0],
        image: "",
        readTime: "5 min read"
      });
      setEditingBlog(null);
    }
    setOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBlog) {
      // Update existing blog
      setBlogs(blogs.map(blog => blog.id === editingBlog.id ? formData : blog));
      toast.success(`Blog post "${formData.title}" has been updated`);
    } else {
      // Add new blog with generated ID
      const newBlog = {
        ...formData,
        id: formData.id || formData.title.toLowerCase().replace(/\s+/g, "-"),
        date: formData.date || new Date().toISOString().split('T')[0]
      };
      setBlogs([...blogs, newBlog]);
      toast.success(`Blog post "${formData.title}" has been added`);
    }
    
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(blogs.filter(blog => blog.id !== id));
      toast.success("Blog post has been deleted");
    }
  };

  // Category options that match the main blog page
  const categoryOptions = [
    { id: 'finance', name: 'Financial Literacy' },
    { id: 'education', name: 'Education' },
    { id: 'entrepreneurship', name: 'Entrepreneurship' },
    { id: 'personal', name: 'Personal Development' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
        <Button onClick={() => handleOpenDialog()} className="flex items-center">
          <Plus size={18} className="mr-2" />
          Add New Post
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Read Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell className="font-medium">
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">{blog.title}</TableCell>
                <TableCell>
                  {categoryOptions.find(cat => cat.id === blog.category)?.name || blog.category}
                </TableCell>
                <TableCell>{blog.date}</TableCell>
                <TableCell>{blog.readTime}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(blog)}>
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(blog.id)}>
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{editingBlog ? "Edit Blog Post" : "Add New Blog Post"}</DialogTitle>
            <DialogDescription>
              {editingBlog ? "Update the details of this blog post" : "Fill in the details for the new blog post"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">Title</label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange as any}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="">Select category</option>
                    {categoryOptions.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="author" className="text-sm font-medium">Author</label>
                  <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">Publish Date</label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="id" className="text-sm font-medium">ID/Slug</label>
                  <Input
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="post-slug (auto-generated if empty)"
                    disabled={!!editingBlog}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="readTime" className="text-sm font-medium">Read Time</label>
                  <Input
                    id="readTime"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    placeholder="5 min read"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium">Featured Image URL</label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="/images/blog-image.jpg"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="excerpt" className="text-sm font-medium">Excerpt</label>
                <Input
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">Content</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="flex h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingBlog ? "Save Changes" : "Publish Post"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blogs;
