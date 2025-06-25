import React from 'react';
import RecipeCard from './RecipeCard';

export interface User {
  _id?: string;
  name: string;
  email: string;
  photo_url: string;
  __v?: number;
}
export interface LinkedUser {
  _id: string;
}

export interface Recipe {
  _id: string;
  title?: string;
  description?: string;
  ingredients?: string[];
  instructions?: string[];
  preparationTime?: number;
  cuisineType?: string;
  image?: string;
  categories?: string[];
  likesCount?: number;
  likes?: LinkedUser[];
  userId?: User;
  createdAt?: string;
  updatedAt?: string;
}

interface RecipeGridProps {
  recipes: Recipe[];
  columns?: number;
  compact?: boolean;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({
  recipes,
  columns = 3,
  compact = false,
}) => {
  console.log(recipes[0].likes?.length);
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 ${
        columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
      } gap-6`}
    >
      {recipes?.map((recipe) => (
        <RecipeCard
          key={recipe.title}
          id={recipe._id}
          image={recipe.image || ''}
          title={recipe.title || ''}
          cuisineType={recipe.cuisineType || ''}
          prepTime={recipe.preparationTime || 0}
          likes={recipe.likes?.length || 0}
          compact={compact}
        />
      ))}
    </div>
  );
};

export default RecipeGrid;
