
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from '@/components/ui/sonner';
import { Plus, Edit, Trash2 } from "lucide-react";

const Books = () => {
  const [open, setOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  
  // Mock book data
  const [books, setBooks] = useState([
    {
      id: "jbgs",
      title: "Just Be Great Somehow",
      subtitle: "A Journey to Excellence",
      author: "Dr. Awosanya Yusuff",
      description: "A comprehensive roadmap that bridges the gap between academic excellence and real-world success.",
      price: 29.99,
      published: "2022-06-15",
      image: "/placeholder.svg"
    },
    {
      id: "vacua",
      title: "Vacua",
      subtitle: "The Power of Empty Spaces",
      author: "Dr. Awosanya Yusuff",
      description: "An exploration of how embracing emptiness can lead to profound personal growth and creativity.",
      price: 24.99,
      published: "2023-03-22",
      image: "/placeholder.svg"
    }
  ]);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    subtitle: "",
    author: "",
    description: "",
    price: 0,
    published: "",
    image: ""
  });

  const handleOpenDialog = (book = null) => {
    if (book) {
      setFormData(book);
      setEditingBook(book);
    } else {
      setFormData({
        id: "",
        title: "",
        subtitle: "",
        author: "",
        description: "",
        price: 0,
        published: "",
        image: ""
      });
      setEditingBook(null);
    }
    setOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
        <DialogContent className="sm:max-w-[600px]">
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
                  <label htmlFor="subtitle" className="text-sm font-medium">Subtitle</label>
                  <Input
                    id="subtitle"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
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
              </div>
              <div className="grid grid-cols-2 gap-4">
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
              </div>
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
