// redux/actions/priceActions.ts
import { ThunkAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, AppDispatch } from '../store';
import { fetchPricesStart, fetchPricesSuccess, fetchPricesFailure } from '../reducers/priceReducer';

export const fetchPrices = (symbols: string[]): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch : AppDispatch) => {
    dispatch(fetchPricesStart());
    try {
      const responses = await Promise.all(
        symbols.map(symbol => axios.get(`api/prices?symbol=${symbol}`))
      );
      const prices = responses.map(response => response.data);
      dispatch(fetchPricesSuccess(prices));
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        dispatch(fetchPricesFailure(error.message));
      } else {
        dispatch(fetchPricesFailure('An unexpected error occurred'));
      }
    }
  };
