import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from '@/components/ui/sonner';
import { Send, Users } from "lucide-react";
import { useGetNewsletterStatsQuery } from '@/services/api/apiSlice';

const Newsletter = () => {
  const [formData, setFormData] = useState({
    subject: "",
    previewText: "",
    content: "",
    sendToAll: true,
  });

  const { data: stats, isLoading: isLoadingStats } = useGetNewsletterStatsQuery();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      sendToAll: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the newsletter
    toast.success(`Newsletter "${formData.subject}" has been queued for delivery to ${formData.sendToAll ? stats?.data.totalSubscribers : stats?.data.activeSubscribers} recipients`);
    
    // Reset form
    setFormData({
      subject: "",
      previewText: "",
      content: "",
      sendToAll: true,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Newsletter</h1>
        <p className="text-gray-600">Compose and send a newsletter to your subscribers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Newsletter Content</CardTitle>
              <CardDescription>
                Create the content for your newsletter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject Line</label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter an attention-grabbing subject line"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="previewText" className="text-sm font-medium">Preview Text</label>
                  <Input
                    id="previewText"
                    name="previewText"
                    value={formData.previewText}
                    onChange={handleChange}
                    placeholder="Brief preview text that appears in email clients"
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
                    placeholder="Write your newsletter content here..."
                    className="flex h-72 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sendToAll" 
                    checked={formData.sendToAll}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor="sendToAll"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Send to all subscribers (including inactive)
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto"
                >
                  <Send size={18} className="mr-2" />
                  Send Newsletter
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Subscriber Stats</CardTitle>
              <CardDescription>
                Your audience overview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users size={20} className="mr-2 text-navy" />
                    <span className="text-sm">Total Subscribers</span>
                  </div>
                  <span className="font-bold">{stats?.data.totalSubscribers ?? '-'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users size={20} className="mr-2 text-green-600" />
                    <span className="text-sm">Active Subscribers</span>
                  </div>
                  <span className="font-bold">{stats?.data.activeSubscribers ?? '-'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users size={20} className="mr-2 text-gray-400" />
                    <span className="text-sm">Inactive Subscribers</span>
                  </div>
                  <span className="font-bold">{stats?.data.inactiveSubscribers ?? '-'}</span>
                </div>
                
                <div className="h-1 w-full bg-gray-200 rounded overflow-hidden mt-4">
                  <div 
                    className="h-1 bg-green-500" 
                    style={{ 
                      width: stats?.data.activeRate ?? '0%'
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 text-right">
                  {isLoadingStats ? 'Loading...' : `${stats?.data.activeRate ?? '0%'} active rate`}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Newsletter Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Use clear, compelling subject lines</li>
                <li>Keep content concise and valuable</li>
                <li>Include a clear call-to-action</li>
                <li>Personalize when possible</li>
                <li>Test your emails before sending</li>
                <li>Optimize for mobile devices</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
