// src/router/Router.tsx

import { createBrowserRouter, RouterProvider } from 'react-router';

// Layouts
import Layout from '../components/layout/Layout';
import DashboardLayout from '../pages/main-dashboard/layout';

// Public Pages
import App from '../App';
import ForgotPassword from '../pages/ForgotPassword';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import RecipeDetails from '../pages/RecipeDetails';
import Register from '../pages/Register';

// Dashboard Pages (Protected)
import AddRecipe from '../pages/AddRecipe';
import AllRecipes from '../pages/AllRecipes';
import DashBoardPage from '../pages/main-dashboard/DashBoardPage';
import MyRecipes from '../pages/MyRecipes';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      Component: Layout,
      errorElement: <NotFound />,
      children: [
        { index: true, Component: App },
        { path: 'recipes/:id', Component: RecipeDetails },
        { path: 'login', Component: Login },
        { path: 'register', Component: Register },
        { path: 'forgot-password', Component: ForgotPassword },
      ],
    },
    {
      path: 'main-dashboard',
      Component: DashboardLayout,
      errorElement: <NotFound />,
      children: [
        { index: true, Component: DashBoardPage },
        { path: 'recipes', Component: AllRecipes },
        { path: 'add-recipe', Component: AddRecipe },
        { path: 'my-recipes', Component: MyRecipes },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
