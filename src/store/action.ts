import {createAction} from '@reduxjs/toolkit';
import { OffersType } from '../mocks/offers';
import { SortOption } from '../components/sorting-options';

export const changeCity = createAction<string>('changeCity');
export const fillOffers = createAction<OffersType[]>('fillOffers');
export const changeSortOption = createAction<SortOption>('changeSortOption');
