
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from '@/components/ui/sonner';
import { Plus, Edit, Trash2, Eye } from "lucide-react";

const Blogs = () => {
  const [open, setOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  
  // Mock blog data
  const [blogs, setBlogs] = useState([
    {
      id: "top-10-study-tips",
      title: "Top 10 Study Tips for Students",
      author: "Dr. Awosanya Yusuff",
      excerpt: "Effective strategies to improve your study habits and academic performance.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      category: "Education",
      date: "2023-04-15",
      image: "/placeholder.svg"
    },
    {
      id: "finding-purpose",
      title: "Finding Your Purpose in Life",
      author: "Dr. Awosanya Yusuff",
      excerpt: "A guide to discovering your passion and living a more fulfilling life.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      category: "Personal Development",
      date: "2023-03-22",
      image: "/placeholder.svg"
    }
  ]);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    author: "",
    excerpt: "",
    content: "",
    category: "",
    date: "",
    image: ""
  });

  const handleOpenDialog = (blog = null) => {
    if (blog) {
      setFormData(blog);
      setEditingBlog(blog);
    } else {
      setFormData({
        id: "",
        title: "",
        author: "",
        excerpt: "",
        content: "",
        category: "",
        date: new Date().toISOString().split('T')[0],
        image: ""
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
                <TableCell>{blog.category}</TableCell>
                <TableCell>{blog.date}</TableCell>
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
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
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
                  <label htmlFor="image" className="text-sm font-medium">Featured Image URL</label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="/images/blog-image.jpg"
                  />
                </div>
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
