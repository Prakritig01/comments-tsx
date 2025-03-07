import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface LinkState {
  currentUrl: string | null;
}

// Initial state with type
const initialState: LinkState = {
  currentUrl: null,
};

// Create the slice
const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    setCurrentUrl: (state, action: PayloadAction<string | null>) => {
      state.currentUrl = action.payload;
    },
  },
});

// Export actions
export const { setCurrentUrl } = linkSlice.actions;

// Selector with proper type
export const selectCurrentUrl = (state: { link: LinkState }) => state.link.currentUrl;

// Export reducer
export default linkSlice.reducer;
