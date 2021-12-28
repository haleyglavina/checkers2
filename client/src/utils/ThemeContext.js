import React from 'react';

// define theme context w default values
const ThemeContext = React.createContext({
  theme: 'light',
  setTheme: () => {}
});

export default ThemeContext;