import React from 'react'
import { createContext ,useContext , useState} from 'react'

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext)

const ThemeContextProvider = ({children}) => {
    const [themeIcon,setThemeIcon] = useState("moon");

  return (
    <ThemeContext.Provider value={{themeIcon,setThemeIcon}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider