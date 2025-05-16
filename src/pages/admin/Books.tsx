import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from '@/components/ui/sonner';
import { Plus, Edit, Trash2 } from "lucide-react";
import { useGetAdminBooksQuery, useCreateBookMutation } from '@/services/api/apiSlice';

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
  isbn?: string;
  pages?: number;
  rating?: number;
  globalReaders?: string;
  publicationYear?: string;
  amazonLink?: string;
}

const Books = () => {
  const { data: booksData, isLoading } = useGetAdminBooksQuery();
  const [createBook, { isLoading: isCreating }] = useCreateBookMutation();
  const [open, setOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  
  const [formData, setFormData] = useState<any>({
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
    categories: [],
    isbn: "",
    pages: 0,
    rating: 0,
    globalReaders: "",
    publicationYear: new Date().getFullYear().toString(),
    amazonLink: "",
  });

  const [categoryInput, setCategoryInput] = useState("");

  const handleOpenDialog = (book: Book | null = null) => {
    if (book) {
      setFormData(book);
      setEditingBook(book);
    } else {
      setFormData({
        title: "",
        shortTitle: "",
        subtitle: "",
        author: "",
        description: "",
        price: 0,
        published: "",
        image: "",
        featured: false,
        categories: [],
        isbn: "",
        pages: 0,
        rating: 0,
        globalReaders: "",
        publicationYear: new Date().getFullYear().toString(),
        amazonLink: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create FormData object
    const submitFormData = new FormData();
    
    // Add all text fields
    Object.keys(formData).forEach(key => {
      if (key !== 'image' && formData[key] !== undefined) {
        if (key === 'categories') {
          submitFormData.append(key, JSON.stringify(formData[key]));
        } else {
          submitFormData.append(key, formData[key].toString());
        }
      }
    });
    
    // Handle image file if it's a File object
    if (formData.image instanceof File) {
      submitFormData.append('image', formData.image);
    }
    
    try {
      if (editingBook) {
        // Update existing book
        // setBooks(books.map(book => book.id === editingBook.id ? formData : book));
        toast.success(`Book "${formData.title}" has been updated`);
      } else {
        // Create new book
        const response = await createBook(submitFormData).unwrap();
        toast.success(`Book "${response.data.title}" has been added`);
      }
      setOpen(false);
    } catch (error: any) {
      console.log(error)
      toast.error(error.data?.message || 'Something went wrong');
    }
  };

  // Update image handling
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      // setBooks(books.filter(book => book.id !== id));
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  Loading books...
                </TableCell>
              </TableRow>
            ) : booksData?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No books found
                </TableCell>
              </TableRow>
            ) : (
              booksData?.data.map((book) => (
                <TableRow key={book._id}>
                  <TableCell className="font-medium">
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>${book.price.toFixed(2)}</TableCell>
                  <TableCell>{new Date(book.published).toLocaleDateString()}</TableCell>
                  <TableCell>{book.featured ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleOpenDialog(book)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(book._id)}
                      disabled={isLoading}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingBook ? "Edit Book" : "Add New Book"}</DialogTitle>
            <DialogDescription>
              {editingBook ? "Update the details of this book" : "Fill in the details for the new book"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="amazonLink" className="text-sm font-medium">Amazon Link</label>
                  <Input
                    id="amazonLink"
                    name="amazonLink"
                    value={formData.amazonLink}
                    onChange={handleChange}
                    placeholder="https://amazon.com/your-book"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="image" className="text-sm font-medium">Book Cover</label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="flex-1"
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <img 
                        src={formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="isbn" className="text-sm font-medium">ISBN</label>
                  <Input
                    id="isbn"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    placeholder="978-0987654321"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="pages" className="text-sm font-medium">Number of Pages</label>
                  <Input
                    id="pages"
                    name="pages"
                    type="number"
                    value={formData.pages}
                    onChange={handleChange}
                    min="1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="rating" className="text-sm font-medium">Rating</label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="globalReaders" className="text-sm font-medium">Global Readers</label>
                  <Input
                    id="globalReaders"
                    name="globalReaders"
                    value={formData.globalReaders}
                    onChange={handleChange}
                    placeholder="Global readers"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="publicationYear" className="text-sm font-medium">Publication Year</label>
                  <Input
                    id="publicationYear"
                    name="publicationYear"
                    value={formData.publicationYear}
                    onChange={handleChange}
                  />
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
            
            <DialogFooter className="sticky bottom-0 bg-white pt-2 pb-4">
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
