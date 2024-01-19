import {Dispatch, SetStateAction, createContext} from 'react'
import { Theme } from '@mui/material'
import { AppThemeOptions } from './ThemeOptions'
import { createTheme } from '@mui/material/styles'

// Theme helper methods

export interface AppTheme {
  name: string
  theme: Theme
}

export interface AppThemeProps {
  appTheme: AppTheme
  setAppTheme: Dispatch<SetStateAction<AppTheme>> | (() => {})
}

export const AppThemeContext = createContext<AppThemeProps>(
  {} as AppThemeProps
)

const theme = createTheme(
  {palette: AppThemeOptions[4].palette}
)

export const defaultAppTheme = {
  name: AppThemeOptions[4].name,
  theme: theme
}

