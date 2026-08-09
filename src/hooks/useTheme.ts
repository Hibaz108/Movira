import { useThemeStore } from "@/store/themeStore";
import { useEffect } from "react";

export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
};
