import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Theme, ThemeContextType } from "../types/Theme";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(()=> {
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        if(savedTheme) {
            setTheme(savedTheme)
            document.documentElement.classList.add(savedTheme);
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
    };

    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if(!ctx){
        throw new Error("useTheme debe usarse dentro de ThemeProvider")
    }
    return ctx;
}