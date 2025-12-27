import {createReducer} from '@reduxjs/toolkit';
import { OffersType } from '../mocks/offers';
import { changeCity, fillOffers, changeSortOption } from './action';
import { SortOption } from '../components/sorting-options';

const initialState : {
  city: string;
  offers: OffersType[];
  sortOption: SortOption;
} = {
  city: 'Paris',
  offers: [],
  sortOption: 'Popular'
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSortOption, (state, action) => {
      state.sortOption = action.payload;
    });
});
