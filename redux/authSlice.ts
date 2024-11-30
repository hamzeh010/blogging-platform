// redux/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: null | { username: string; email: string };
  token: string | null; // Add token to the state
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null, // Initialize the token as null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; email: string; token: string }>) {
      state.isAuthenticated = true;
      state.user = { username: action.payload.username, email: action.payload.email };
      state.token = action.payload.token; // Store token in Redux state
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null; // Clear the token on logout
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
    },
  },
});
export const isAuth = (state: { auth: AuthState }) => state.auth.isAuthenticated;

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
