import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pozisyonGetAll } from '@/api/kartlar/pozisyon';

export const _fetchPozisyonlar = createAsyncThunk(
  'firma/fetchPozisyonlar',
  async ({ data, params }, { rejectWithValue }) => {
    try {
      const response = await pozisyonGetAll(data, params);
      if (response.data.success) {
        return response.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  pozisyonlar: [],
  pozisyon: {},
  addPozisyonModalState: false,
  editPozisyonModalState: false,
  deletePozisyonModalState: false,
  statusPozisyonModalState: false,
  isLoading: false,
  error: null
};

const reducers = {
  _setAddPozisyonModalState: (state, action) => {
    state.addPozisyonModalState = action.payload;
  },
  _setEditPozisyonModalState: (state, action) => {
    state.editPozisyonModalState = action.payload;
  },
  _setDeletePozisyonModalState: (state, action) => {
    state.deletePozisyonModalState = action.payload;
  },
  _setStatusPozisyonModalState: (state, action) => {
    state.statusPozisyonModalState = action.payload;
  },
  _setPozisyonlar: (state, action) => {
    state.pozisyonlar = action.payload;
  },
  _setPozisyon: (state, action) => {
    state.pozisyon = action.payload;
  }
};

const extraReducers = builder => {
  builder
    .addCase(_fetchPozisyonlar.pending, state => {
      state.isLoading = true;
    })
    .addCase(_fetchPozisyonlar.fulfilled, (state, action) => {
      state.pozisyonlar = action.payload;
      state.isLoading = false;
    })
    .addCase(_fetchPozisyonlar.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
};

const slice = createSlice({
  name: 'pozisyon',
  initialState,
  reducers,
  extraReducers
});

export const {
  _setAddPozisyonModalState,
  _setEditPozisyonModalState,
  _setDeletePozisyonModalState,
  _setStatusPozisyonModalState,
  _setPozisyonlar,
  _setPozisyon
} = slice.actions;
export default slice.reducer;
