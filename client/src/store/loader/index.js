import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false
};

const reducers = {
  _setLoading: (state, action) => {
    state.loading = action.payload;
  }
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers
});

export const { _setLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
