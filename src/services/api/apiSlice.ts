import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://yusuff-i94b.onrender.com/api',
    
    // baseUrl: 'http://localhost:3002/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
    }),
    updateSocialMedia: builder.mutation<any, any>({
      query: (data) => ({
        url: '/admin/social-media',
        method: 'PUT',
        body: data,
      }),
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
    }),
    toggleSubscriberStatus: builder.mutation<any, any>({
      query: (id) => ({
        url: `/newsletter/subscribers/${id}/toggle-status`,
        method: 'PATCH',
      }),
    }),
    getNewsletterStats: builder.query<any, void>({
      query: () => '/newsletter/stats',
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
    }),
    createBlog: builder.mutation<any, any>({
      query: (formData) => ({
        url: '/blogs',
        method: 'POST',
        body: formData,
        // Don't set Content-Type header, browser will set it with boundary
        // formData: true,
      }),
    }),
    updateBlog: builder.mutation<any, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/blogs/${id}`,
        method: 'PATCH',
        body: formData,
      }),
    }),
    // Get blogs for admin dashboard
    getAdminBlogs: builder.query<any, void>({
      query: () => '/blogs/admin',
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
      transformResponse: (response: any) => response.data,
    }),
    createBook: builder.mutation<any, any>({
      query: (formData) => ({
        url: '/books',
        method: 'POST',
        body: formData,
       
      }),
    }),
    getAdminBooks: builder.query<any, void>({
      query: () => '/admin/books',
    }),
    getPublicBooks: builder.query<any, void>({
      query: () => '/books',
    }),
    getBookDetail: builder.query<any, string>({
      query: (id) => `/books/${id}`,
      transformResponse: (response: any) => response.data,
    }),
    getBookById: builder.query<any, string>({
      query: (id) => `/books/${id}`,
      transformResponse: (response: { status: string; data: any }) => response.data,
    }),
  }),
  tagTypes: ['AdminBlogs', 'PublicBlogs'],
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
} = apiSlice;
