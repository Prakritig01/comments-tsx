import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the processed comment type
export interface ProcessedComment {
  username: string;
  text: string;
  videoId: string;
  publishedAt: string;
  sentiment: string;
}

// Define the state type, including sentimentDistribution, monthlyDistribution, and keywords
interface LinkState {
  currentUrl: string | null;
  comments: ProcessedComment[];
  sentimentDistribution: {
    agree: number;
    disagree: number;
    neutral: number;
  };
  monthlyDistribution: Record<string, number>;
  keywords: string[];
}

// Initial state with the new fields added
const initialState: LinkState = {
  currentUrl: null,
  comments: [],
  sentimentDistribution: { agree: 0, disagree: 0, neutral: 0 },
  monthlyDistribution: {},
  keywords: [],
};

const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    setCurrentUrl: (state, action: PayloadAction<string | null>) => {
      state.currentUrl = action.payload;
    },
    // Reducer to store processed comments
    setComments: (state, action: PayloadAction<ProcessedComment[]>) => {
      state.comments = action.payload;
    },
    // Reducer to update the sentiment distribution
    setSentimentDistribution: (
      state,
      action: PayloadAction<{ agree: number; disagree: number; neutral: number }>
    ) => {
      state.sentimentDistribution = action.payload;
    },
    // Reducer to update the monthly distribution
    setMonthlyDistribution: (
      state,
      action: PayloadAction<Record<string, number>>
    ) => {
      state.monthlyDistribution = action.payload;
    },
    // Reducer to update the keywords array
    setKeywords: (state, action: PayloadAction<string[]>) => {
      state.keywords = action.payload;
    },
  },
});

// Export actions
export const {
  setCurrentUrl,
  setComments,
  setSentimentDistribution,
  setMonthlyDistribution,
  setKeywords,
} = linkSlice.actions;

// Selectors
export const selectCurrentUrl = (state: { link: LinkState }) =>
  state.link.currentUrl;
export const selectComments = (state: { link: LinkState }) =>
  state.link.comments;
export const selectSentimentDistribution = (state: { link: LinkState }) =>
  state.link.sentimentDistribution;
export const selectMonthlyDistribution = (state: { link: LinkState }) =>
  state.link.monthlyDistribution;
export const selectKeywords = (state: { link: LinkState }) => state.link.keywords;

// Export reducer
export default linkSlice.reducer;
