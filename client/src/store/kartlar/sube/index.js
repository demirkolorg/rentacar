import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { subeGetAll } from "@/api/sube";

export const _fetchSubeler = createAsyncThunk(
  "firma/fetchSubeler",
  async (params, { rejectWithValue }) => {
    try {
      const response = await subeGetAll(params);
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
  subeler: [],
  sube: {},
  addSubeModalState: false,
  editSubeModalState: false,
  deleteSubeModalState: false,
  statusSubeModalState: false,
  isLoading: false,
  error: null,
};

const reducers = {
  _setAddSubeModalState: (state, action) => {
    state.addSubeModalState = action.payload;
  },
  _setEditSubeModalState: (state, action) => {
    state.editSubeModalState = action.payload;
  },
  _setDeleteSubeModalState: (state, action) => {
    state.deleteSubeModalState = action.payload;
  },
  _setStatusSubeModalState: (state, action) => {
    state.statusSubeModalState = action.payload;
  },
  _setSubeler: (state, action) => {
    state.subeler = action.payload;
  },
  _setSube: (state, action) => {
    state.sube = action.payload;
  },
};

const extraReducers = (builder) => {
  builder
    .addCase(_fetchSubeler.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(_fetchSubeler.fulfilled, (state, action) => {
      state.subeler = action.payload;
      state.isLoading = false;
    })
    .addCase(_fetchSubeler.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
};

const slice = createSlice({
  name: "sube",
  initialState,
  reducers,
  extraReducers,
});

export const {
  _setAddSubeModalState,
  _setEditSubeModalState,
  _setDeleteSubeModalState,
  _setStatusSubeModalState,
  _setSubeler,
  _setSube,
} = slice.actions;
export default slice.reducer;
