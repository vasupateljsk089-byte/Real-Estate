import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Gender =  'male' | 'female' | 'other';

export interface User {
  id: string;
  email: string;
  username: string;
  profileImage: string | null;
  chatId: string[];
  gender? : Gender;
  phone?:string;
  city?: string;
}
 

export type storedUser = Omit<User, "id">; 

 export interface AuthState {
    authLoading: boolean;
    loading: boolean;
    isAuthenticated: boolean;
    user: User | null;
 }      

const initialState: AuthState = {
  authLoading: true,
  loading: false,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.authLoading = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.authLoading = false;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.authLoading = false
    },
  },
});

export const { setAuthLoading, setLoading, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
