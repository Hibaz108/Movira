export type ThemeStore = {
  theme: "dark" | "light";
  toggleTheme: () => void;
};

export type Genre = {
  id: number;
  name: string;
};
