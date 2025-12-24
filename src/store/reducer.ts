import {createReducer} from '@reduxjs/toolkit';
import { OffersType } from '../mocks/offers';
import { changeCity, fillOffers } from './action';

const initialState : {
  city: string;
  offers: OffersType[];
} = {city: 'Paris', offers: []};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    });
});

