import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SavedMoviesStore } from "@/types/types";

export const useSavedMoviesStore = create<SavedMoviesStore>()(
  persist(
    (set) => ({
      favorites: [],
      addToFavorites: (movie) => {
        set((state) => {
          if (state.favorites.some((m) => m.id === movie.id)) {
            return state;
          }
          return {
            favorites: [...state.favorites, movie],
          };
        });
      },

      removeFromFavorites: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((movie) => movie.id !== id),
        }));
      },
    }),

    {
      name: "saved-movies-storage",
    },
  ),
);
