import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for listings
export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/listings');
      
      if (!response.ok) {
        return rejectWithValue('Failed to fetch listings');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const createListing = createAsyncThunk(
  'listings/createListing',
  async (listingData, { rejectWithValue }) => {
    try {
      const response = await fetch('/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listingData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.errors || 'Failed to create listing');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const deleteListing = createAsyncThunk(
  'listings/deleteListing',
  async (listingId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/listings/${listingId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        return rejectWithValue('Failed to delete listing');
      }
      
      return listingId;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

const initialState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  search: '',
  sortBy: 'Sort By',
  priceValue: [0, 10000],
  sqFootValue: [0, 10000],
  selectedListing: null,
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.filteredItems = filterAndSortListings(state);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.filteredItems = filterAndSortListings(state);
    },
    setPriceValue: (state, action) => {
      state.priceValue = action.payload;
      state.filteredItems = filterAndSortListings(state);
    },
    setSqFootValue: (state, action) => {
      state.sqFootValue = action.payload;
      state.filteredItems = filterAndSortListings(state);
    },
    setSelectedListing: (state, action) => {
      state.selectedListing = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch listings cases
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = filterAndSortListings(state);
        state.error = null;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create listing cases
      .addCase(createListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.filteredItems = filterAndSortListings(state);
        state.error = null;
      })
      .addCase(createListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete listing cases
      .addCase(deleteListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        state.filteredItems = filterAndSortListings(state);
        state.error = null;
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Helper function to filter and sort listings
function filterAndSortListings(state) {
  let filtered = state.items.filter((listing) => {
    const searchMatch = state.search === "" || 
      listing.title?.toLowerCase().includes(state.search.toLowerCase()) ||
      listing.nyc_borough?.toLowerCase().includes(state.search.toLowerCase());
    
    const priceMatch = listing.price >= state.priceValue[0] && listing.price <= state.priceValue[1];
    const sqFootMatch = listing.sq_footage >= state.sqFootValue[0] && listing.sq_footage <= state.sqFootValue[1];
    
    return searchMatch && priceMatch && sqFootMatch;
  });

  // Sort the filtered results
  if (state.sortBy === "Price High") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === "Price Low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === "Sq Ft High") {
    filtered.sort((a, b) => b.sq_footage - a.sq_footage);
  } else if (state.sortBy === "Sq Ft Low") {
    filtered.sort((a, b) => a.sq_footage - b.sq_footage);
  }

  return filtered;
}

export const { 
  setSearch, 
  setSortBy, 
  setPriceValue, 
  setSqFootValue, 
  setSelectedListing, 
  clearError 
} = listingsSlice.actions;

export default listingsSlice.reducer;