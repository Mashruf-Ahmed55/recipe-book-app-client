import { Clock, Tag, Utensils } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useParams } from 'react-router';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import AxiosInstance from '../services/axiosInstance';

export interface User {
  _id: string;
  name: string;
  email: string;
  photo_url: string;
  __v: number;
}

export interface Recipe {
  _id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  preparationTime: number;
  cuisineType: string;
  image: string;
  categories: string[];
  like: User[];
  userId: User;
}

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [recipeData, setRecipeData] = useState<Recipe | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    AxiosInstance.get(`/api/recipes/get-recipe-by-id/${id}`).then(
      (response) => {
        const recipe = response.data.recipe;
        setRecipeData(recipe);
        setLikeCount(recipe.likes.length);
        setUserData(response.data.user);

        // ✅ Use same logic here
        const actualUserId = user?.id?.toString();
        const hasUserLiked = recipe.likes.some((u: any) => {
          const likedId = typeof u === 'string' ? u : u._id?.toString();
          return likedId === actualUserId;
        });

        setHasLiked(hasUserLiked);
      }
    );
  }, [id, user]);

  const handleLike = async (recipeId: string, userId: string) => {
    try {
      await AxiosInstance.patch(`/api/recipes/like/${recipeId}`, {
        userId,
      })
        .then((resonse) => {
          toast.success(resonse.data.message);
        })
        .catch(() => {
          toast.error('You cannot like your own recipe');
        });

      // Re-fetch the updated recipe from backend
      const response = await AxiosInstance.get(
        `/api/recipes/get-recipe-by-id/${recipeId}`
      );
      const updatedRecipe = response.data.recipe;

      setRecipeData(updatedRecipe);
      setLikeCount(updatedRecipe.likes.length);

      // ✅ Fix: Check properly whether user has liked
      const actualUserId = user?.id?.toString();
      const hasUserLiked = updatedRecipe.likes.some((u: any) => {
        const likedId = typeof u === 'string' ? u : u._id?.toString();
        return likedId === actualUserId;
      });

      setHasLiked(hasUserLiked);
    } catch (error) {
      console.error('Like update failed:', error);
    }
  };

  if (!recipeData) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  const {
    title,
    image,
    cuisineType,
    preparationTime,
    categories,
    ingredients,
    instructions,
  } = recipeData;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300">
          <div className="relative h-72 sm:h-96">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                {categories.map((category, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-medium bg-amber-500/80 text-white rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {title}
              </h1>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-5 w-5 text-amber-500" />
                <span>{preparationTime} mins prep time</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Utensils className="h-5 w-5 text-amber-500" />
                <span>{cuisineType} cuisine</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Tag className="h-5 w-5 text-amber-500" />
                <span>{categories.join(', ')}</span>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">{likeCount}</span> people
                  interested in this recipe
                </p>
                {user?.email && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleLike(recipeData._id, user?.id || '')}
                    className="flex items-center gap-1 text-red-600  hover:scale-105 transition-transform duration-150"
                  >
                    {hasLiked ? (
                      <FaHeart className="text-xl" />
                    ) : (
                      <FaRegHeart className="text-xl" />
                    )}
                    {hasLiked ? 'Liked' : 'Like'}
                    <span className="text-base">{likeCount}</span>
                  </Button>
                )}
              </div>
            </div>
            {/* Author */}
            <div className="flex items-center gap-3 mb-8">
              <img
                src={userData?.photo_url || '/default-user.png'}
                alt={userData?.name || 'User'}
                className="h-10 w-10 rounded-full object-cover border-2 border-amber-500"
              />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Recipe by
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {userData?.name}
                </p>
              </div>
            </div>

            {/* Ingredients & Instructions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Ingredients
                </h2>
                <ul className="space-y-2">
                  {ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                    >
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0"></div>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Instructions
                </h2>
                <ol className="space-y-4">
                  {instructions.map((instruction, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                    >
                      <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 font-medium text-sm">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
