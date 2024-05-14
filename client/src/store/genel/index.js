import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onayModalState: false,
  onayDurumu: false,
  onayFonksiyonu: null,
};

const reducers = {
  _setOnayModalState: (state, action) => {
    state.onayModalState = action.payload;
  },
  _setOnayDurumu: (state, action) => {
    state.onayDurumu = action.payload;
  },
  _setOnayFonksiyonu: (state, action) => {
    state.onayFonksiyonu = action.payload;
  },
};

const loaderSlice = createSlice({
  name: "genel",
  initialState,
  reducers,
});

export const { _setOnayModalState, _setOnayDurumu, _setOnayFonksiyonu } =
  loaderSlice.actions;
export default loaderSlice.reducer;
