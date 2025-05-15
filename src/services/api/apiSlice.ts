
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

interface NewsletterSubscribeResponse {
  status: string;
  message: string;
}

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
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/admin/login',
        method: 'POST',
        body: credentials,
      }),
    }),
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
    subscribeNewsletter: builder.mutation<NewsletterSubscribeResponse, { email: string }>({
      query: (data) => ({
        url: '/newsletter/subscribe',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { 
  useLoginMutation,
  useGetSocialMediaQuery,
  useUpdateSocialMediaMutation,
  useSubscribeNewsletterMutation,
} = apiSlice;
