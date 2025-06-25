import { Filter, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import RecipeGrid from '../components/recipes/RecipeGrid';
import AxiosInstance from '../services/axiosInstance';

// Mock data for design purposes

const cuisineTypes = [
  'All',
  'Italian',
  'Mexican',
  'Chinese',
  'Indian',
  'Thai',
  'Mediterranean',
  'Korean',
  'Dessert',
];
export interface User {
  _id: string;
  name: string;
  email: string;
  photo_url: string;
  __v: number;
}

export interface Recipe {
  _id: string;
  title?: string;
  description?: string;
  ingredients?: string[];
  instructions?: string[];
  prepTime?: number;
  cuisineType?: string;
  image?: string;
  categories?: string[];
  likeCount?: number;
  likes?: User[];
  userId?: User;
  createdAt?: string;
  updatedAt?: string;
  __v: number;
}

const AllRecipes: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const filteredRecipes = allRecipes.filter((recipe) => {
    const matchesSearch = recipe.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCuisine =
      selectedCuisine === 'All' || recipe.cuisineType === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });

  useEffect(() => {
    AxiosInstance.get('/api/recipes/get-all-recipes').then((response) => {
      setAllRecipes(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            All Recipes
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Discover delicious recipes from our community
          </p>
        </div>

        <div className="mb-10 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="bg-white dark:bg-gray-800 w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:text-white transition-colors duration-200"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="bg-white dark:bg-gray-800 w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none dark:text-white transition-colors duration-200"
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
              >
                {cuisineTypes.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {filteredRecipes.length > 0 ? (
          <RecipeGrid recipes={filteredRecipes} columns={4} />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-4">
              No recipes found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRecipes;
