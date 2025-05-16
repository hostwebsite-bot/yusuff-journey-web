import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from '@/components/ui/sonner';
import { Download, Send, Search, Mail, Trash2, ToggleLeft } from "lucide-react";
import { useGetSubscribersQuery, useToggleSubscriberStatusMutation, useDeleteSubscribersMutation } from '@/services/api/apiSlice';

const Subscribers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<any>([]);
  
  const { data: subscribersData, isLoading, refetch } = useGetSubscribersQuery();
  const [toggleStatus] = useToggleSubscriberStatusMutation();
  const [deleteSubscribers] = useDeleteSubscribersMutation();

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleStatus(id).unwrap();
      toast.success("Subscriber status updated successfully");
      refetch(); // Refresh the subscribers list
    } catch (error) {
      toast.error("Failed to update subscriber status");
    }
  };

  const filteredSubscribers = subscribersData?.data.filter(sub => 
    sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.dateSubscribed.includes(searchTerm)
  ) ?? [];

  const handleSelectAll = () => {
    if (selectedIds.length === filteredSubscribers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredSubscribers.map(sub => sub.id));
    }
  };

  const handleSelectOne = (id: any) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDelete = async (ids: string[]) => {
    if (confirm(`Are you sure you want to delete ${ids.length === 1 ? 'this subscriber' : 'these subscribers'}?`)) {
      try {
        await deleteSubscribers(ids).unwrap();
        setSelectedIds([]);
        toast.success(`${ids.length === 1 ? 'Subscriber' : ids.length + ' subscribers'} deleted successfully`);
      } catch (error) {
        toast.error('Failed to delete subscribers');
      }
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  Loading subscribers...
                </TableCell>
              </TableRow>
            ) : filteredSubscribers.length === 0 ? (
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
                  <TableCell>{subscriber.dateSubscribed}</TableCell>
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
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleToggleStatus(subscriber.id)}
                      className="mr-2"
                    >
                      <ToggleLeft size={16} />
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
