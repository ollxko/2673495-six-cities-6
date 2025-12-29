import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSortOption, setAuthorizationStatus } from './action';
import { SortOption } from '../components/sorting-options';
import {
  fetchOffersAction,
  fetchOfferByIdAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
  loginAction,
  checkAuthAction,
} from './api-actions';
import { Offer, DetailedOffer } from '../types/offer';
import { Review } from '../types/review';
import { getToken, saveToken, dropToken } from '../services/token';

const initialState: {
  city: string;
  offers: Offer[];
  sortOption: SortOption;
  isLoading: boolean;
  currentOffer: DetailedOffer | null;
  isOfferLoading: boolean;
  nearbyOffers: Offer[];
  comments: Review[];
  authorizationStatus: 'AUTH' | 'NO_AUTH';
  token: string | null;
} = {
  city: 'Paris',
  offers: [],
  sortOption: 'Popular',
  isLoading: false,
  currentOffer: null,
  isOfferLoading: false,
  nearbyOffers: [],
  comments: [],
  token: getToken(),
  authorizationStatus: getToken() ? 'AUTH' : 'NO_AUTH',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSortOption, (state, action) => {
      state.sortOption = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
      if (action.payload === 'NO_AUTH') {
        state.token = null;
        dropToken();
      }
    })
    .addCase(fetchOffersAction.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchOfferByIdAction.pending, (state) => {
      state.isOfferLoading = true;
    })
    .addCase(fetchOfferByIdAction.fulfilled, (state, action) => {
      state.currentOffer = action.payload;
      state.isOfferLoading = false;
    })
    .addCase(fetchOfferByIdAction.rejected, (state) => {
      state.isOfferLoading = false;
    })
    .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(fetchNearbyOffersAction.rejected, (state) => {
      state.nearbyOffers = [];
    })
    .addCase(fetchCommentsAction.fulfilled, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(fetchCommentsAction.rejected, (state) => {
      state.comments = [];
    })
    .addCase(checkAuthAction.fulfilled, (state) => {
      state.authorizationStatus = 'AUTH';
    })
    .addCase(checkAuthAction.rejected, (state) => {
      state.authorizationStatus = 'NO_AUTH';
      state.token = null;
      dropToken();
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      state.authorizationStatus = 'AUTH';
      state.token = action.payload.token;
      saveToken(action.payload.token);
    })
    .addCase(loginAction.rejected, (state) => {
      state.authorizationStatus = 'NO_AUTH';
      state.token = null;
      dropToken();
    });
});
