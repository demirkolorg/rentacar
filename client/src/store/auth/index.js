import { createSlice } from "@reduxjs/toolkit";
import { initialCurrentUserJWT } from "../../helper/initialCurrentUser";

const initialToken = () => {
  const item = window.localStorage.getItem("token");
  return item ? item : null;
};

const initialUser = async () => {
  const token = window.localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const response = await initialCurrentUserJWT(token);
  return response ? response : null;
};

const initialState = {
  token: initialToken(),
  user: null,
};

const reducers = {
  _setCurrentUser: (state, action) => {
    state.user = action.payload;
  },
  _login: (state, action) => {
    localStorage.setItem("token", action.payload);
    state.token = action.payload;
  },
  _logout: (state) => {
    localStorage.removeItem("token");
    state.token = null;
    state.user = null;
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers,
});

export const { _logout, _login, _setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
