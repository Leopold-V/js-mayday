import { createSlice } from '@reduxjs/toolkit';
import { updateUser } from '../actions/user.actions';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: true,
    error: '',
  },
  reducers: {
    loadUser: (state, action: any) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    noUser: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: {
    [updateUser.pending]: (state: any) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state: any, action) => {
      console.log(action.payload);
      state.loading = false;
      const user = state.user;
      user.username = action.payload.username
      user.email = action.payload.email
      user.bio = action.payload.bio
      user.location = action.payload.location
      user.website_url = action.payload.website_url
      user.dev_profile = action.payload.dev_profile
    },
    [updateUser.rejected]: (state: any, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loadUser, noUser } = userSlice.actions;

export default userSlice.reducer;
