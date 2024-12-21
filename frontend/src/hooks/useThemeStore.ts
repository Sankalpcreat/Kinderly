import { useThemeStore } from "@/stores/themeStore";

export const useThemeStoreHook = () => {
  const { theme, toggleTheme } = useThemeStore();

  return { theme, toggleTheme };
};