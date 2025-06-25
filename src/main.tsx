import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.tsx';
import RecipeContextProvider from './context/RecipeContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import './index.css';
import Router from './Router/Router.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RecipeContextProvider>
          <Router />
          <Toaster />
        </RecipeContextProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
