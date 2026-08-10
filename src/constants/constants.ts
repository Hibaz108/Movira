import { Search, Heart, Bookmark } from "lucide-react";

export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Trending", path: "/trending" },
  { name: "Discover", path: "/discover" },
  { name: "Genres", path: "/genres" },
] as const;

export const ACTION_LINKS = [
  { name: "Search", path: "/search", icon: Search },
  { name: "Favorites", path: "/favorites", icon: Heart },
  { name: "Watchlist", path: "/watchlist", icon: Bookmark },
] as const;

export const API_KEY = import.meta.env.VITE_API_KEY;
export const BASE_URL = "https://api.themoviedb.org/3";
