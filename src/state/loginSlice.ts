import { createSlice } from "@reduxjs/toolkit";

export interface userState {
  user: boolean;
}

const initialState: userState = {
  user: true,
};

export const userSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state) => {
      state.user = true;
    },
    logout: (state) => {
      state.user = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
