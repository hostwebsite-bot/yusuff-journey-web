
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from '@/components/ui/sonner';
import { Plus, Edit, Trash2 } from "lucide-react";

// Book interface to match with the public pages
interface Book {
  id: string;
  title: string;
  shortTitle?: string;
  subtitle: string;
  author: string;
  description: string;
  price: number;
  published: string;
  image: string;
  featured?: boolean;
  categories?: string[];
}

const Books = () => {
  const [open, setOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  
  // Mock book data aligned with public book pages
  const [books, setBooks] = useState<Book[]>([
    {
      id: "jbgs",
      title: "The Journey to Becoming a Great Student",
      shortTitle: "#JBGS",
      subtitle: "A Journey to Excellence",
      author: "Dr. Awosanya Yusuff",
      description: "A comprehensive roadmap that bridges the gap between academic excellence and real-world success.",
      price: 24.99,
      published: "2022-06-15",
      image: "/lovable-uploads/ac1830de-9ab7-4ac8-b7e3-93b41071cb14.png",
      featured: true,
      categories: ["Academic Excellence", "Financial Literacy", "Personal Development"]
    },
    {
      id: "vacua",
      title: "Vacua",
      shortTitle: "Vacua",
      subtitle: "The Power of Empty Spaces",
      author: "Dr. Awosanya Yusuff",
      description: "An exploration of how embracing emptiness can lead to profound personal growth and creativity.",
      price: 24.99,
      published: "2023-03-22",
      image: "/placeholder.svg",
      featured: false,
      categories: ["Personal Development", "Philosophy"]
    },
    {
      id: "financial-wisdom",
      title: "Financial Wisdom for Young Professionals",
      shortTitle: "Financial Wisdom",
      subtitle: "Essential Money Management",
      author: "Dr. Awosanya Yusuff",
      description: "Essential financial knowledge for young adults entering the professional world.",
      price: 22.99,
      published: "2024-01-15",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      featured: false,
      categories: ["Finance", "Career Development", "Investing"]
    }
  ]);

  const [formData, setFormData] = useState<Book>({
    id: "",
    title: "",
    shortTitle: "",
    subtitle: "",
    author: "",
    description: "",
    price: 0,
    published: "",
    image: "",
    featured: false,
    categories: []
  });

  const [categoryInput, setCategoryInput] = useState("");

  const handleOpenDialog = (book: Book | null = null) => {
    if (book) {
      setFormData(book);
      setEditingBook(book);
    } else {
      setFormData({
        id: "",
        title: "",
        shortTitle: "",
        subtitle: "",
        author: "",
        description: "",
        price: 0,
        published: "",
        image: "",
        featured: false,
        categories: []
      });
      setEditingBook(null);
    }
    setCategoryInput("");
    setOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : 
              name === "price" ? parseFloat(value) : 
              value
    }));
  };

  const handleAddCategory = () => {
    if (categoryInput.trim() && !formData.categories?.includes(categoryInput.trim())) {
      setFormData(prev => ({
        ...prev,
        categories: [...(prev.categories || []), categoryInput.trim()]
      }));
      setCategoryInput("");
    }
  };

  const handleRemoveCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories?.filter(c => c !== category) || []
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate shortTitle if not provided
    if (!formData.shortTitle && formData.title) {
      formData.shortTitle = formData.title.split(' ').slice(0, 2).join(' ');
    }

    if (editingBook) {
      // Update existing book
      setBooks(books.map(book => book.id === editingBook.id ? formData : book));
      toast.success(`Book "${formData.title}" has been updated`);
    } else {
      // Add new book with generated ID
      const newBook = {
        ...formData,
        id: formData.id || formData.title.toLowerCase().replace(/\s+/g, "-"),
      };
      setBooks([...books, newBook]);
      toast.success(`Book "${formData.title}" has been added`);
    }
    
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter(book => book.id !== id));
      toast.success("Book has been deleted");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Books Management</h1>
        <Button onClick={() => handleOpenDialog()} className="flex items-center">
          <Plus size={18} className="mr-2" />
          Add New Book
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>${book.price.toFixed(2)}</TableCell>
                <TableCell>{book.published}</TableCell>
                <TableCell>{book.featured ? "Yes" : "No"}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(book)}>
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(book.id)}>
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
            <DialogTitle>{editingBook ? "Edit Book" : "Add New Book"}</DialogTitle>
            <DialogDescription>
              {editingBook ? "Update the details of this book" : "Fill in the details for the new book"}
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
                  <label htmlFor="shortTitle" className="text-sm font-medium">Short Title</label>
                  <Input
                    id="shortTitle"
                    name="shortTitle"
                    value={formData.shortTitle || ""}
                    onChange={handleChange}
                    placeholder="Short title or nickname"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="subtitle" className="text-sm font-medium">Subtitle</label>
                  <Input
                    id="subtitle"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    required
                  />
                </div>
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
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium">Price ($)</label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="published" className="text-sm font-medium">Published Date</label>
                  <Input
                    id="published"
                    name="published"
                    type="date"
                    value={formData.published}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="id" className="text-sm font-medium">ID/Slug</label>
                  <Input
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="book-slug (auto-generated if empty)"
                    disabled={!!editingBook}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="image" className="text-sm font-medium">Image URL</label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="/images/book-cover.jpg"
                  />
                </div>
                <div className="space-y-2 flex items-end">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="featured" 
                      name="featured"
                      checked={formData.featured || false}
                      onCheckedChange={(checked) => {
                        setFormData(prev => ({
                          ...prev,
                          featured: checked === true
                        }));
                      }}
                    />
                    <label htmlFor="featured" className="text-sm font-medium">Featured Book</label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="h-20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Categories</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.categories?.map((category, index) => (
                    <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                      <span className="text-sm">{category}</span>
                      <button 
                        type="button"
                        onClick={() => handleRemoveCategory(category)}
                        className="ml-2 text-gray-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input 
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    placeholder="Add a category"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleAddCategory}
                    disabled={!categoryInput.trim()}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingBook ? "Save Changes" : "Add Book"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Books;
