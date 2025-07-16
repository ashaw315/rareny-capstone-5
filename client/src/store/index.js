import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import listingsSlice from './slices/listingsSlice';
import uiSlice from './slices/uiSlice';
import userSlice from './slices/userSlice';
import forumSlice from './slices/forumSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    listings: listingsSlice,
    ui: uiSlice,
    users: userSlice,
    forums: forumSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;