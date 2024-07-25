// src/context/ThemeContext.tsx

import React, {createContext, useState, useContext, ReactNode} from 'react';
import {lightTheme, darkTheme} from '../styles/themes';

// Define the shape of the theme context
interface ThemeContextType {
  theme: typeof lightTheme;
  toggleTheme: () => void;
}
const defaultContextValue: ThemeContextType = {
  theme: lightTheme, // Default theme value
  toggleTheme: () => {}, // Default empty function
};
// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

// Define the ThemeProvider props
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode: any) => !prevMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = (): ThemeContextType => {
  const context: any = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
