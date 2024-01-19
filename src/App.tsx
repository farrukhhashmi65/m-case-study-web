import React, { useState } from 'react';
import { AppThemeContext, AppTheme, defaultAppTheme } from './themes/AppTheme';
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import { I18nextProvider } from 'react-i18next'
import i18n from './config/i18n'
import {
  RouterProvider,
} from "react-router-dom";
import router from './routes';
import { Provider } from 'react-redux'
import store from './redux/store'
import Notification from '../src/features/Notification'

function App() {

  const [appTheme, setAppTheme] = useState<AppTheme>(defaultAppTheme)

  return (
    <AppThemeContext.Provider value={{ appTheme: appTheme, setAppTheme }}>
      <ThemeProvider theme={appTheme?.theme}>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <CssBaseline />
            <RouterProvider router={router} />
            <Notification/>
          </I18nextProvider>
        </Provider>
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
}

export default App;
