'use client'

import React, { createContext, useContext, useState } from 'react'

type ThemeVariant = 'dark' | 'light' | 'system'

type ThemeContext = {
  theme: ThemeVariant
  setTheme: React.Dispatch<React.SetStateAction<ThemeVariant>>
}

type ThemeContextProviderProps = {
  children: React.ReactNode
}

export const ThemeContext = createContext<ThemeContext | null>(null)
export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<ThemeVariant>('dark')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error(
      'useThemeContext must be used within a ThemeContextProvider',
    )
  }
  return context
}
