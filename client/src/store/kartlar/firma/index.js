import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firmaGetAll, firmaAdd } from "@/api/firma";

export const _fetchFirmalar = createAsyncThunk(
  "firma/fetchFirmalar",
  async (params, { rejectWithValue }) => {
    try {
      const response = await firmaGetAll(params);
      if (response.data.success) {
        return response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  firmalar: [],
  firma: {},
  addFirmaModalState: false,
  editFirmaModalState: false,
  deleteFirmaModalState: false,
  statusFirmaModalState: false,
  isLoading: false,
  error: null,
};

const reducers = {
  _setAddFirmaModalState: (state, action) => {
    state.addFirmaModalState = action.payload;
  },
  _setEditFirmaModalState: (state, action) => {
    state.editFirmaModalState = action.payload;
  },
  _setDeleteFirmaModalState: (state, action) => {
    state.deleteFirmaModalState = action.payload;
  },
  _setStatusFirmaModalState: (state, action) => {
    state.statusFirmaModalState = action.payload;
  },
  _setFirmalar: (state, action) => {
    state.firmalar = action.payload;
  },
  _setFirma: (state, action) => {
    state.firma = action.payload;
  },
};

const extraReducers = (builder) => {
  builder
    .addCase(_fetchFirmalar.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(_fetchFirmalar.fulfilled, (state, action) => {
      state.firmalar = action.payload;
      state.isLoading = false;
    })
    .addCase(_fetchFirmalar.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
};

const slice = createSlice({
  name: "firma",
  initialState,
  reducers,
  extraReducers,
});

export const {
  _setAddFirmaModalState,
  _setEditFirmaModalState,
  _setDeleteFirmaModalState,
  _setStatusFirmaModalState,
  _setFirmalar,
  _setFirma,
} = slice.actions;
export default slice.reducer;
