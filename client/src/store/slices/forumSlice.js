import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for forums
export const fetchForums = createAsyncThunk(
  'forums/fetchForums',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/forums');
      
      if (!response.ok) {
        return rejectWithValue('Failed to fetch forums');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const fetchSubforums = createAsyncThunk(
  'forums/fetchSubforums',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/subforums');
      
      if (!response.ok) {
        return rejectWithValue('Failed to fetch subforums');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const fetchForumPosts = createAsyncThunk(
  'forums/fetchForumPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/forum_posts');
      
      if (!response.ok) {
        return rejectWithValue('Failed to fetch forum posts');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const createSubforum = createAsyncThunk(
  'forums/createSubforum',
  async (subforumData, { rejectWithValue }) => {
    try {
      const response = await fetch('/subforums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subforumData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.errors || 'Failed to create subforum');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const createForumPost = createAsyncThunk(
  'forums/createForumPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await fetch('/forum_posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.errors || 'Failed to create forum post');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

const initialState = {
  forums: [],
  subforums: [],
  forumPosts: [],
  comments: [],
  selectedForum: null,
  selectedSubforum: null,
  selectedPost: null,
  loading: false,
  error: null,
};

const forumSlice = createSlice({
  name: 'forums',
  initialState,
  reducers: {
    setSelectedForum: (state, action) => {
      state.selectedForum = action.payload;
    },
    setSelectedSubforum: (state, action) => {
      state.selectedSubforum = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch forums cases
      .addCase(fetchForums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForums.fulfilled, (state, action) => {
        state.loading = false;
        state.forums = action.payload;
        state.error = null;
      })
      .addCase(fetchForums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch subforums cases
      .addCase(fetchSubforums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubforums.fulfilled, (state, action) => {
        state.loading = false;
        state.subforums = action.payload;
        state.error = null;
      })
      .addCase(fetchSubforums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch forum posts cases
      .addCase(fetchForumPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForumPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.forumPosts = action.payload;
        state.error = null;
      })
      .addCase(fetchForumPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create subforum cases
      .addCase(createSubforum.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubforum.fulfilled, (state, action) => {
        state.loading = false;
        state.subforums.push(action.payload);
        state.error = null;
      })
      .addCase(createSubforum.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create forum post cases
      .addCase(createForumPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createForumPost.fulfilled, (state, action) => {
        state.loading = false;
        state.forumPosts.push(action.payload);
        state.error = null;
      })
      .addCase(createForumPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  setSelectedForum, 
  setSelectedSubforum, 
  setSelectedPost, 
  clearError, 
  setComments 
} = forumSlice.actions;

export default forumSlice.reducer;