import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  aktifSube: null
};

const reducers = {
  _setAktifSube: (state, action) => {
    state.aktifSube = action.payload;
  }
};

const slice = createSlice({
  name: 'genel',
  initialState,
  reducers
});

export const { _setAktifSube } = slice.actions;
export default slice.reducer;
