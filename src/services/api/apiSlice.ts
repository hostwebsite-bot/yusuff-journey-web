import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface RecentSubscriber {
  email: string;
  date: string;
}

interface RecentSubscribersResponse {
  status: string;
  data: RecentSubscriber[];
}

export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  publishDate: string;
  readTime: string;
  status: 'draft' | 'published';
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://yusuff-i94b.onrender.com/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // Add global configuration for auto-refetching
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  tagTypes: ['AdminBlogs', 'PublicBlogs', 'Books', 'SocialMedia', 'Newsletter', 'Subscribers', 'Stats'],
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (credentials) => ({
        url: '/admin/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getSocialMedia: builder.query<any, void>({
      query: () => '/admin/social-media',
      providesTags: ['SocialMedia']
    }),
    updateSocialMedia: builder.mutation<any, any>({
      query: (data) => ({
        url: '/admin/social-media',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['SocialMedia']
    }),
    subscribeNewsletter: builder.mutation<any, any>({
      query: (data) => ({
        url: '/newsletter/subscribe',
        method: 'POST',
        body: data,
      }),
    }),
    getSubscribers: builder.query<any, void>({
      query: () => '/newsletter/subscribers',
      providesTags: ['Subscribers']
    }),
    toggleSubscriberStatus: builder.mutation<any, any>({
      query: (id) => ({
        url: `/newsletter/subscribers/${id}/toggle-status`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Subscribers']
    }),
    getNewsletterStats: builder.query<any, void>({
      query: () => '/newsletter/stats',
      providesTags: ['Stats']
    }),
    changePassword: builder.mutation<{ status: string; message: string }, any>({
      query: (credentials) => ({
        url: '/admin/change-password',
        method: 'PATCH',
        body: credentials,
      }),
    }),
    getBlogs: builder.query<any, void>({
      query: () => '/blogs',
      providesTags: ['PublicBlogs']
    }),
    createBlog: builder.mutation<any, any>({
      query: (formData) => ({
        url: '/blogs',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['AdminBlogs', 'PublicBlogs']
    }),
    updateBlog: builder.mutation<any, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/blogs/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['AdminBlogs', 'PublicBlogs']
    }),
    // Get blogs for admin dashboard
    getAdminBlogs: builder.query<any, void>({
      query: () => '/blogs/admin',
      providesTags: ['AdminBlogs']
    }),
    // Get public blogs with pagination and filtering
    getPublicBlogs: builder.query<any, { page?: number; limit?: number; category?: string }>({
      query: (params) => ({
        url: '/blogs/public',
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...(params.category && params.category !== 'all' && { category: params.category }),
        },
      }),
    }),
    // Delete blog post
    deleteBlogPost: builder.mutation<{ status: string; message: string }, string>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
      // Invalidate relevant queries after deletion
      invalidatesTags: ['AdminBlogs', 'PublicBlogs'],
    }),
    getPublicBlogPost: builder.query<any, string>({
      query: (id) => `/blogs/public/${id}`,
    }),
    createBook: builder.mutation<any, any>({
      query: (formData) => ({
        url: '/books',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Books']
    }),
    getAdminBooks: builder.query<any, void>({
      query: () => '/admin/books',
    }),
    getPublicBooks: builder.query<any, void>({
      query: () => '/books',
      providesTags: ['Books']
    }),
    getBookDetail: builder.query<any, string>({
      query: (id) => `/books/${id}`,
      transformResponse: (response: any) => response.data,
    }),
    getBookById: builder.query<any, string>({
      query: (id) => `/books/${id}`,
      transformResponse: (response: { status: string; data: any }) => response.data,
    }),
    getRecentSubscribers: builder.query<RecentSubscribersResponse, void>({
      query: () => '/newsletter/recent-subscribers',
      providesTags: ['Subscribers'],
    }),
    deleteSubscribers: builder.mutation<{ status: string; message: string }, string[]>({
      query: (ids) => ({
        url: '/newsletter/subscribers',
        method: 'DELETE',
        body: { ids }
      }),
      invalidatesTags: ['Subscribers'],
    }),
    updateProfilePicture: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/admin/profile-picture',
        method: 'PUT',
        body: formData,
      }),
    }),
  }),
});

export const { 
  useLoginMutation,
  useGetSocialMediaQuery,
  useUpdateSocialMediaMutation,
  useSubscribeNewsletterMutation,
  useGetSubscribersQuery,
  useToggleSubscriberStatusMutation,
  useGetNewsletterStatsQuery,
  useChangePasswordMutation,
  useGetBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  
  useGetAdminBlogsQuery,
  useGetPublicBlogsQuery,
  useDeleteBlogPostMutation,
  useGetPublicBlogPostQuery,
  useCreateBookMutation,
  useGetAdminBooksQuery,
  useGetPublicBooksQuery,
  useGetBookDetailQuery,
  useGetBookByIdQuery,
  useGetRecentSubscribersQuery,
  useDeleteSubscribersMutation,
  useUpdateProfilePictureMutation,
} = apiSlice;
