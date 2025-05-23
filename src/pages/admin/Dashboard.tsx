import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Users, FileText, Eye, ArrowUp, ArrowDown, Mail } from "lucide-react";
import { useGetDashboardStatsQuery, useGetRecentSubscribersQuery } from '@/services/api/apiSlice';

const Dashboard = () => {
  const { data: dashboardData, isLoading: isLoadingStats } = useGetDashboardStatsQuery();
  const { data: recentSubscribersData, isLoading: isLoadingSubscribers } = useGetRecentSubscribersQuery();

  const stats = [
    { 
      title: "Total Books", 
      value: dashboardData?.data.totalBooks.count || 0, 
      icon: <Book className="h-8 w-8 text-navy" />,
      change: dashboardData?.data.totalBooks.change || "0% from last month",
      status: "neutral"
    },
    { 
      title: "Blog Posts", 
      value: dashboardData?.data.blogPosts.count || 0, 
      icon: <FileText className="h-8 w-8 text-navy" />, 
      change: dashboardData?.data.blogPosts.change || "0% from last month",
      status: "increase"
    },
    { 
      title: "Newsletter Subscribers", 
      value: dashboardData?.data.newsletterSubscribers.count || 0, 
      icon: <Mail className="h-8 w-8 text-navy" />, 
      change: dashboardData?.data.newsletterSubscribers.change || "0% from last month",
      status: "increase"
    },
    { 
      title: "Website Visitors", 
      value: dashboardData?.data.websiteVisitors.count || 0, 
      icon: <Eye className="h-8 w-8 text-navy" />, 
      change: dashboardData?.data.websiteVisitors.change || "0% from last month",
      status: "decrease"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isLoadingStats ? (
          Array(4).fill(0).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="h-20 flex items-center justify-center">
                  <div className="animate-pulse bg-gray-200 h-4 w-24 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                <div className="flex items-center text-sm mt-1">
                  {stat.status === "increase" && <ArrowUp className="mr-1 h-4 w-4 text-green-500" />}
                  {stat.status === "decrease" && <ArrowDown className="mr-1 h-4 w-4 text-red-500" />}
                  <span className={
                    stat.status === "increase" 
                      ? "text-green-500" 
                      : stat.status === "decrease" 
                        ? "text-red-500" 
                        : "text-gray-500"
                  }>
                    {stat.change > 0 && '+'}{stat.change}% from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Recent Activity and Subscribers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest website changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                <div>
                  <p className="text-sm font-medium">New blog post published</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                <div>
                  <p className="text-sm font-medium">Newsletter sent to subscribers</p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                <div>
                  <p className="text-sm font-medium">Book information updated</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Subscribers</CardTitle>
            <CardDescription>Latest newsletter sign-ups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoadingSubscribers ? (
                <p>Loading subscribers...</p>
              ) : recentSubscribersData?.data.slice(0, 5).map((subscriber, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{subscriber.email}</p>
                    <p className="text-xs text-gray-500">{new Date(subscriber.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
