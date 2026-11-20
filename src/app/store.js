
import { configureStore } from "@reduxjs/toolkit";

import favoriteReducer from "../features/favoriteSlice";

// Load favorites from LocalStorage
const savedFavorites = localStorage.getItem("favorites");

const initialFavorites = savedFavorites
  ? JSON.parse(savedFavorites)
  : [];

export const store = configureStore({
  reducer: {
    favorites: favoriteReducer
  },

  preloadedState: {
    favorites: initialFavorites
  }
});

// Save Redux state whenever favorites change
store.subscribe(() => {
  const favorites = store.getState().favorites;

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );
});
