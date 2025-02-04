import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
}

const savedToken = localStorage.getItem("authToken");
const savedUser = localStorage.getItem("user");

const initialState: AuthState = {
  token: savedToken ? savedToken : null,
  user: savedUser ? JSON.parse(savedUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; user: User }>) => {
      console.log("Redux: Login Successful", action.payload);
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      console.log("Redux: User Logged Out");
      state.token = null;
      state.user = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
