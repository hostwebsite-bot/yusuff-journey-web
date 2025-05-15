
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from '@/components/ui/sonner';
import { Download, Send, Search, Mail, Trash2 } from "lucide-react";

const Subscribers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock subscribers data
  const [subscribers, setSubscribers] = useState([
    { id: 1, email: "john.doe@example.com", date: "2023-05-10", status: "active" },
    { id: 2, email: "jane.smith@example.com", date: "2023-05-09", status: "active" },
    { id: 3, email: "robert.johnson@example.com", date: "2023-05-09", status: "active" },
    { id: 4, email: "lisa.brown@example.com", date: "2023-05-08", status: "inactive" },
    { id: 5, email: "michael.davis@example.com", date: "2023-05-07", status: "active" },
    { id: 6, email: "sarah.wilson@example.com", date: "2023-05-06", status: "active" },
    { id: 7, email: "david.miller@example.com", date: "2023-05-05", status: "inactive" },
    { id: 8, email: "emma.jones@example.com", date: "2023-05-04", status: "active" },
    { id: 9, email: "james.taylor@example.com", date: "2023-05-03", status: "active" },
    { id: 10, email: "sophia.anderson@example.com", date: "2023-05-02", status: "active" },
  ]);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelectAll = () => {
    if (selectedIds.length === filteredSubscribers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredSubscribers.map(sub => sub.id));
    }
  };

  const handleSelectOne = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDelete = (ids: number[]) => {
    if (confirm(`Are you sure you want to delete ${ids.length === 1 ? 'this subscriber' : 'these subscribers'}?`)) {
      setSubscribers(subscribers.filter(sub => !ids.includes(sub.id)));
      setSelectedIds([]);
      toast.success(`${ids.length === 1 ? 'Subscriber' : ids.length + ' subscribers'} deleted successfully`);
    }
  };

  const handleExport = () => {
    // In a real app, this would generate a CSV file
    toast.success("Subscribers exported to CSV");
  };

  const handleSendNewsletter = () => {
    // In a real app, this would navigate to the newsletter creation page
    window.location.href = '/admin/newsletter';
  };

  // Filter subscribers based on search term
  const filteredSubscribers = searchTerm
    ? subscribers.filter(sub => 
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.date.includes(searchTerm)
      )
    : subscribers;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscribers</h1>
        <p className="text-gray-600">Manage your newsletter subscribers</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search subscribers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button onClick={handleExport} variant="outline" className="flex-1 md:flex-none">
            <Download size={18} className="mr-2" />
            Export
          </Button>
          <Button onClick={handleSendNewsletter} className="flex-1 md:flex-none">
            <Send size={18} className="mr-2" />
            Send Newsletter
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={selectedIds.length === filteredSubscribers.length && filteredSubscribers.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date Subscribed</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscribers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  No subscribers found
                </TableCell>
              </TableRow>
            ) : (
              filteredSubscribers.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedIds.includes(subscriber.id)}
                      onCheckedChange={() => handleSelectOne(subscriber.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium flex items-center">
                    <Mail size={16} className="mr-2 text-gray-400" />
                    {subscriber.email}
                  </TableCell>
                  <TableCell>{subscriber.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      subscriber.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {subscriber.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleDelete([subscriber.id])}>
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t">
          <div className="text-sm text-gray-700">
            {selectedIds.length} {selectedIds.length === 1 ? 'item' : 'items'} selected
          </div>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => handleDelete(selectedIds)}
          >
            Delete Selected
          </Button>
        </div>
      )}
    </div>
  );
};

export default Subscribers;
