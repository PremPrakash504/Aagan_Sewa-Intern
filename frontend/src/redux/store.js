import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage for web

import userSlice from "./features/authState";
import { indexSlice } from "./features/indexslice";
// Configuration for redux-persist
// This will persist the user state to localStorage
const persistConfig = {
  key: "root", // Key for localStorage
  storage, // Use localStorage
};

// Wrap the user slice with persistence capabilities
const persistedReducer = persistReducer(persistConfig, userSlice);

// Configure the Redux store
const store = configureStore({
  reducer: {
    user: persistedReducer, // Persisted user authentication state
    [indexSlice.reducerPath]: indexSlice.reducer, // API slice reducer
  },

  // Configure middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions from serialization checks
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(indexSlice.middleware), // Add RTK Query middleware
});

// Create persistor for the store
export const persistor = persistStore(store);
export default store;
