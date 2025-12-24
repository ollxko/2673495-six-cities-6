import {createAction} from '@reduxjs/toolkit';
import { OffersType } from '../mocks/offers';

export const changeCity = createAction<string>('changeCity');
export const fillOffers = createAction<OffersType[]>('fillOffers');
