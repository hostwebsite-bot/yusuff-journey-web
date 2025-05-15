
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Simple interfaces to avoid complex type inference issues
interface LoginResponse {
  token: string;
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
