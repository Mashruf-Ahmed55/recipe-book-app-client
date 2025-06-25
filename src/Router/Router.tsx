import { createBrowserRouter, RouterProvider } from 'react-router';
import App from '../App';
import Layout from '../components/layout/Layout';
import AddRecipe from '../pages/AddRecipe';
import AllRecipes from '../pages/AllRecipes';
import ForgotPassword from '../pages/ForgotPassword';
import Login from '../pages/Login';
import MyRecipes from '../pages/MyRecipes';
import NotFound from '../pages/NotFound';
import RecipeDetails from '../pages/RecipeDetails';
import Register from '../pages/Register';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      Component: Layout,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          Component: App,
        },
        {
          path: 'recipes',
          Component: AllRecipes,
        },
        {
          path: 'recipes/:id',
          Component: RecipeDetails,
        },
        {
          path: 'add-recipe',
          Component: AddRecipe,
        },
        {
          path: 'my-recipes',
          Component: MyRecipes,
        },
        {
          path: 'login',
          Component: Login,
        },
        {
          path: 'register',
          Component: Register,
        },
        {
          path: 'forgot-password',
          Component: ForgotPassword,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
