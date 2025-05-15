
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define interfaces for API responses and data
interface LoginResponse {
  token: string;
}

// Book interface that matches both admin and public pages
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

interface SocialMediaData {
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  updatedBy?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface SocialMediaResponse {
  status: string;
  data: SocialMediaData;
}

interface NewsletterResponse {
  status: string;
  message: string;
}

// Create the API slice with endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://yusuff-o2ml.onrender.com/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Login endpoint
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/admin/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    // Social media endpoints
    getSocialMedia: builder.query<SocialMediaResponse, void>({
      query: () => '/admin/social-media',
    }),
    updateSocialMedia: builder.mutation<SocialMediaResponse, SocialMediaData>({
      query: (data) => ({
        url: '/admin/social-media',
        method: 'PUT',
        body: data,
      }),
    }),
    
    // Newsletter subscription endpoint
    subscribeNewsletter: builder.mutation<NewsletterResponse, { email: string }>({
      query: (data) => ({
        url: '/newsletter/subscribe',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { 
  useLoginMutation,
  useGetSocialMediaQuery,
  useUpdateSocialMediaMutation,
  useSubscribeNewsletterMutation,
} = apiSlice;
