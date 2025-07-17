import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '../theme';

// Import your reducers
import authReducer from '../store/slices/authSlice';
import listingsReducer from '../store/slices/listingsSlice';
import userReducer from '../store/slices/userSlice';
import forumReducer from '../store/slices/forumSlice';
import uiReducer from '../store/slices/uiSlice';

// Custom render function that includes providers
function render(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        auth: authReducer,
        listings: listingsReducer,
        user: userReducer,
        forum: forumReducer,
        ui: uiReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// Create test store helper
export function createTestStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      auth: authReducer,
      listings: listingsReducer,
      user: userReducer,
      forum: forumReducer,
      ui: uiReducer,
    },
    preloadedState,
  });
}

// Mock user data
export const mockUser = {
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  name: 'Test User',
  bio: 'Test bio',
  profile_image: null,
};

// Mock listings data
export const mockListing = {
  id: 1,
  title: 'Test Listing',
  description: 'Test description',
  price: 100,
  image: 'test-image.jpg',
  user_id: 1,
  user: mockUser,
};

// Mock forum data
export const mockForum = {
  id: 1,
  name: 'Test Forum',
  subforums_length: 2,
};

export const mockSubforum = {
  id: 1,
  name: 'Test Subforum',
  forum_id: 1,
  forum: 'Test Forum',
  forum_posts: [],
};

// Re-export everything
export * from '@testing-library/react';
export { render };