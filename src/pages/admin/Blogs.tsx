import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from '@/components/ui/sonner';
import { Plus, Edit, Trash2, ListOrdered, Hash, CheckSquare } from "lucide-react";
import { 
  
  useGetAdminBlogsQuery, 
  useCreateBlogMutation, 
  useUpdateBlogMutation,
  useDeleteBlogPostMutation 
} from '@/services/api/apiSlice';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';

// Define content block types
type ContentBlockType = 'paragraph' | 'heading' | 'list' | 'numbered' | 'quote';

interface ContentBlock {
  type: ContentBlockType;
  content: string;
  id: string;
}

const Blogs = () => {
  const { data: blogsData, isLoading } = useGetAdminBlogsQuery();
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogPostMutation();

  const [open, setOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([
    { type: 'paragraph', content: '', id: '1' }
  ]);
  
  // Mock blog data that matches the structure on the main blog page
  

  const [formData, setFormData] = useState<any>({
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

  const handleOpenDialog = (blog:any | null = null) => {
    if (blog) {
      setFormData(blog);
      setEditingBlog(blog);
      setContentBlocks(blog.formattedContent ? 
        blog.formattedContent.map((block, index) => ({
          ...block,
          id: index.toString()
        })) as ContentBlock[] : 
        [{ type: 'paragraph', content: blog.content, id: '0' }]
      );
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
      setContentBlocks([
        { type: 'paragraph', content: '', id: '1' }
      ]);
    }
    setOpen(true);
    setActiveTab('basic');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContentBlockChange = (id: string, content: string) => {
    setContentBlocks(prevBlocks => 
      prevBlocks.map(block => 
        block.id === id ? { ...block, content } : block
      )
    );
  };

  const handleContentTypeChange = (id: string, type: ContentBlockType) => {
    setContentBlocks(prevBlocks => 
      prevBlocks.map(block => 
        block.id === id ? { ...block, type } : block
      )
    );
  };

  const addContentBlock = (type: ContentBlockType = 'paragraph') => {
    const newId = Date.now().toString();
    setContentBlocks(prev => [...prev, { type, content: '', id: newId }]);
  };

  const removeContentBlock = (id: string) => {
    if (contentBlocks.length > 1) {
      setContentBlocks(prevBlocks => prevBlocks.filter(block => block.id !== id));
    } else {
      toast.error("You must have at least one content block");
    }
  };
  
  const moveContentBlock = (id: string, direction: 'up' | 'down') => {
    const currentIndex = contentBlocks.findIndex(block => block.id === id);
    if (
      (direction === 'up' && currentIndex === 0) || 
      (direction === 'down' && currentIndex === contentBlocks.length - 1)
    ) {
      return;
    }
    
    const newBlocks = [...contentBlocks];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const temp = newBlocks[currentIndex];
    newBlocks[currentIndex] = newBlocks[targetIndex];
    newBlocks[targetIndex] = temp;
    
    setContentBlocks(newBlocks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create FormData object
    const submitFormData = new FormData();
    
    // Add basic fields
    submitFormData.append('title', formData.title);
    submitFormData.append('author', formData.author);
    submitFormData.append('excerpt', formData.excerpt);
    submitFormData.append('category', formData.category);
    submitFormData.append('date', formData.date);
    submitFormData.append('readTime', formData.readTime);
    
    // Handle image file
    if (formData.image instanceof File) {
      submitFormData.append('image', formData.image);
    } else if (typeof formData.image === 'string' && !formData.image.startsWith('http')) {
      // If it's a base64 string from preview
      const response = await fetch(formData.image);
      const blob = await response.blob();
      submitFormData.append('image', blob, 'image.jpg');
    }
    
    // Add formatted content
    const combinedContent = contentBlocks.map(block => block.content).join('\n\n');
    submitFormData.append('content', combinedContent);
    submitFormData.append('formattedContent', JSON.stringify(
      contentBlocks.map(({ id, ...rest }) => rest)
    ));
    
    try {
      if (editingBlog) {
        await updateBlog({
          id: editingBlog.id,
          formData: submitFormData
        }).unwrap();
        toast.success(`Blog post "${formData.title}" has been updated`);
      } else {
     const response =   await createBlog(submitFormData).unwrap();
     console.log(response)
        toast.success(`Blog post "${formData.title}" has been added`);
      }
      setOpen(false);
    } catch (error: any) {
      console.log(error)
      toast.error(error.data?.message || 'Something went wrong');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL for immediate display
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: previewUrl // Add preview URL
      }));
    }
  };

  // Category options that match the main blog page
  const categoryOptions = [
    { id: 'finance', name: 'Financial Literacy' },
    { id: 'education', name: 'Education' },
    { id: 'entrepreneurship', name: 'Entrepreneurship' },
    { id: 'personal', name: 'Personal Development' }
  ];

  // Preview formatted content
  const renderPreview = () => {
    return (
      <div className="prose max-w-none p-4 bg-gray-50 rounded-md">
        {contentBlocks.map((block, index) => {
          switch (block.type) {
            case 'heading':
              return <h3 key={block.id} className="font-bold text-xl my-4">{block.content}</h3>;
            case 'list':
              return (
                <ul key={block.id} className="list-disc pl-6 my-4">
                  {block.content.split('\n').filter(Boolean).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              );
            case 'numbered':
              return (
                <ol key={block.id} className="list-decimal pl-6 my-4">
                  {block.content.split('\n').filter(Boolean).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              );
            case 'quote':
              return (
                <blockquote key={block.id} className="border-l-4 border-gray-200 pl-4 italic my-4">
                  {block.content}
                </blockquote>
              );
            default:
              return <p key={block.id} className="my-4">{block.content}</p>;
          }
        })}
      </div>
    );
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteBlog(id).unwrap();
        toast.success("Blog post has been deleted");
      } catch (error: any) {
        toast.error(error.data?.message || 'Failed to delete blog post');
      }
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
              <TableHead>Read Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Loading...</TableCell>
              </TableRow>
            ) : blogsData?.data.flatMap(category => 
              category.blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell className="font-medium">
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">{blog.title}</TableCell>
                  <TableCell>{blog.category}</TableCell>
                  <TableCell>{new Date(blog.date).toLocaleDateString()}</TableCell>
                  <TableCell>{blog.readTime}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleOpenDialog(blog)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(blog.id)}
                      disabled={isDeleting}
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
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingBlog ? "Edit Blog Post" : "Add New Blog Post"}</DialogTitle>
            <DialogDescription>
              {editingBlog ? "Update the details of this blog post" : "Fill in the details for the new blog post"}
            </DialogDescription>
          </DialogHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="content">Content Editor</TabsTrigger>
            </TabsList>
            <form onSubmit={handleSubmit}>
              <TabsContent value="basic">
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
                    <label htmlFor="image" className="text-sm font-medium">Featured Image</label>
                    <div className="flex gap-4 items-center">
                      <Input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="flex-1"
                      />
                      {(formData.imagePreview || (typeof formData.image === 'string' && formData.image)) && (
                        <div className="w-20 h-20 relative">
                          <img 
                            src={formData.imagePreview || formData.image} 
                            alt="Preview" 
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      )}
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
                </div>
              </TabsContent>
              
              <TabsContent value="content">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Content Blocks</h3>
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" onClick={() => addContentBlock('paragraph')}>
                        Add Paragraph
                      </Button>
                      <Button type="button" variant="outline" onClick={() => addContentBlock('heading')}>
                        Add Heading
                      </Button>
                      <Button type="button" variant="outline" onClick={() => addContentBlock('list')}>
                        Add List
                      </Button>
                      <Button type="button" variant="outline" onClick={() => addContentBlock('numbered')}>
                        Add Numbered List
                      </Button>
                      <Button type="button" variant="outline" onClick={() => addContentBlock('quote')}>
                        Add Quote
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {contentBlocks.map((block, index) => (
                      <div key={block.id} className="border rounded-md p-4 bg-white">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex gap-2">
                            <select
                              value={block.type}
                              onChange={(e) => handleContentTypeChange(block.id, e.target.value as ContentBlockType)}
                              className="text-sm border border-gray-300 rounded px-2 py-1"
                            >
                              <option value="paragraph">Paragraph</option>
                              <option value="heading">Heading</option>
                              <option value="list">Bullet List</option>
                              <option value="numbered">Numbered List</option>
                              <option value="quote">Quote</option>
                            </select>
                            
                            {block.type === 'heading' && (
                              <div className="flex items-center gap-1">
                                <Hash size={16} className="text-gray-500" />
                                <span className="text-sm text-gray-500">Heading</span>
                              </div>
                            )}
                            
                            {block.type === 'list' && (
                              <div className="flex items-center gap-1">
                                <CheckSquare size={16} className="text-gray-500" />
                                <span className="text-sm text-gray-500">For bullet points, add each item on a new line</span>
                              </div>
                            )}
                            
                            {block.type === 'numbered' && (
                              <div className="flex items-center gap-1">
                                <ListOrdered size={16} className="text-gray-500" />
                                <span className="text-sm text-gray-500">For numbered items, add each item on a new line</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm"
                              onClick={() => moveContentBlock(block.id, 'up')}
                              disabled={index === 0}
                            >
                              ↑
                            </Button>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm"
                              onClick={() => moveContentBlock(block.id, 'down')}
                              disabled={index === contentBlocks.length - 1}
                            >
                              ↓
                            </Button>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeContentBlock(block.id)}
                              disabled={contentBlocks.length === 1}
                            >
                              ×
                            </Button>
                          </div>
                        </div>
                        
                        <Textarea
                          value={block.content}
                          onChange={(e) => handleContentBlockChange(block.id, e.target.value)}
                          placeholder={
                            block.type === 'heading' ? 'Enter heading text...' :
                            block.type === 'list' || block.type === 'numbered' ? 'Enter each item on a new line...' :
                            block.type === 'quote' ? 'Enter quote text...' :
                            'Enter paragraph text...'
                          }
                          className="min-h-[100px]"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium mb-4">Preview</h3>
                    {renderPreview()}
                  </div>
                </div>
              </TabsContent>
              
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingBlog ? "Save Changes" : "Publish Post"}
                </Button>
              </DialogFooter>
            </form>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blogs;
