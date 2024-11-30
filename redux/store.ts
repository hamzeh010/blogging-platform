import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Define the RootState type by inferring the return type of store.getState
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
