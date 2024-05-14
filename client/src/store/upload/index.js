import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { imageUpload } from "@/api/upload";

export const _imageUpload = createAsyncThunk(
  "upload/imageUpload",
  async (fileData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", fileData);
      const response = await imageUpload(formData);
      if (response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  lastUploadedImage: null,
  isLoading: false,
  error: null,
};

const reducers = {};

const extraReducers = (builder) => {
  builder
    .addCase(_imageUpload.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(_imageUpload.fulfilled, (state, action) => {
      state.lastUploadedImage = action.payload;
      state.isLoading = false;
    })
    .addCase(_imageUpload.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
};

const slice = createSlice({
  name: "upload",
  initialState,
  reducers,
  extraReducers,
});

export const {} = slice.actions;
export default slice.reducer;
