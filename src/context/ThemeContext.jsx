"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({ theme: "light", toggleTheme: () => { } });

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const saved = localStorage.getItem("agenza-theme");
        if (saved) {
            setTheme(saved);
            document.documentElement.setAttribute("data-theme", saved);
        }
    }, []);

    const toggleTheme = () => {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("agenza-theme", next);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
