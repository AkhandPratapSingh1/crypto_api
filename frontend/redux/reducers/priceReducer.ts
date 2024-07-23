// redux/reducers/priceReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PriceState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PriceState = {
  data: [],
  loading: false,
  error: null,
};

const priceSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    fetchPricesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPricesSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchPricesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPricesStart, fetchPricesSuccess, fetchPricesFailure } = priceSlice.actions;

export default priceSlice.reducer;
