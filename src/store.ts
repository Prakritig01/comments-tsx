import { configureStore } from "@reduxjs/toolkit";
import linkReducer from "./slices/linkSlice";

const store = configureStore({
  reducer: {
    link: linkReducer,
  },
});

// ✅ Export types for better TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
