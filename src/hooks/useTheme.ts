import { useContext } from "react";
import { ThemeProviderContext } from "@/components/theme/themeProvider";

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
