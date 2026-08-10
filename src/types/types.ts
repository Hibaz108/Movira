export type ThemeStore = {
  theme: "dark" | "light";
  toggleTheme: () => void;
};

export type Genre = {
  id: number;
  name: string;
};

export type ErrorMessageProps = {
  error?: Error | null;
  onRetry?: () => void;
};
