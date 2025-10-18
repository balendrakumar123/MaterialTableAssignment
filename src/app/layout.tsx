'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({ palette: { mode: 'light' } });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
