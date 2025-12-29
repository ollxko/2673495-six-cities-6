import axios, { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer, DetailedOffer } from '../types/offer';
import { AuthInfo, LoginData } from '../types/auth';
import { Review } from '../types/review';

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  {
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>('/offers');
  return data;
});

export const fetchOfferByIdAction = createAsyncThunk<
  DetailedOffer,
  string,
  {
    extra: AxiosInstance;
    rejectValue: string;
  }
>('data/fetchOfferById', async (offerId, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.get<DetailedOffer>(`/offers/${offerId}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return rejectWithValue('Offer not found');
      }
    }
    return rejectWithValue('Unknown error');
  }
});

export const fetchNearbyOffersAction = createAsyncThunk<
  Offer[],
  string,
  {
    extra: AxiosInstance;
  }
>('data/fetchNearbyOffers', async (offerId, { extra: api }) => {
  const { data } = await api.get<Offer[]>(`/offers/${offerId}/nearby`);
  return data;
});

export const fetchCommentsAction = createAsyncThunk<
  Review[],
  string,
  {
    extra: AxiosInstance;
  }
>('data/fetchComments', async (offerId, { extra: api }) => {
  const { data } = await api.get<Review[]>(`/comments/${offerId}`);
  return data;
});

export type CommentData = {
  comment: string;
  rating: number;
};

export const postCommentAction = createAsyncThunk<
  Review,
  { offerId: string; commentData: CommentData },
  {
    extra: AxiosInstance;
  }
>('data/postComment', async ({ offerId, commentData }, { extra: api }) => {
  const { data } = await api.post<Review>(`/comments/${offerId}`, commentData);
  return data;
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  await api.get('/login');
});

export const loginAction = createAsyncThunk<
  AuthInfo,
  LoginData,
  {
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { extra: api }) => {
  const { data } = await api.post<AuthInfo>('/login', { email, password });
  return data;
});
