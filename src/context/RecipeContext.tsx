import { createContext, useContext, useEffect, useState } from 'react';
import AxiosInstance from '../services/axiosInstance';
import type { Recipe } from '../types';

type RecipeContextType = {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export default function RecipeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    AxiosInstance.get('/api/recipes/get-all-recipes').then((response) => {
      setRecipes(response.data);
    });
  }, []);
  return (
    <RecipeContext.Provider value={{ recipes, setRecipes: () => {} }}>
      {children}
    </RecipeContext.Provider>
  );
}

const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error(
      'useRecipeContext must be used within a RecipeContextProvider'
    );
  }
  return context;
};

export { useRecipeContext };
