import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { themes } from "@/lib/themes";

const ColorThemeContext = createContext(null);

function getInitialThemeName() {
  if (typeof window !== "undefined") {
    try {
      const storedTheme = localStorage.getItem("color-theme");
      if (storedTheme && themes.some(t => t.name === storedTheme)) {
        return storedTheme;
      }
    } catch (e) {
      // ignore
    }
  }
  return themes[0].name;
}


export function ColorThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(getInitialThemeName);

  const theme = useMemo(
    () => themes.find((t) => t.name === themeName) || themes[0],
    [themeName]
  );

  useEffect(() => {
    try {
      localStorage.setItem("color-theme", themeName);
    } catch (e) {
      // ignore
    }

    const styleId = "dynamic-theme-styles";
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    const lightColors = Object.entries(theme.colors.light)
      .map(([key, value]) => `--${key}: ${value};`)
      .join("\n");

    const darkColors = Object.entries(theme.colors.dark)
      .map(([key, value]) => `--${key}: ${value};`)
      .join("\n");

    styleTag.innerHTML = `
      :root {
        ${lightColors}
      }
      .dark {
        ${darkColors}
      }
    `;
  }, [theme, themeName]);

  const setTheme = useCallback((name) => {
    setThemeName(name);
  }, []);

  const value = {
    theme,
    setTheme,
    themes,
  };

  return (
    <ColorThemeContext.Provider value={value}>
      {children}
    </ColorThemeContext.Provider>
  );
}

export const useColorTheme = () => {
  const context = useContext(ColorThemeContext);
  if (!context) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider");
  }
  return context;
}; 