import { Clock, Heart, Pencil, Plus, Trash2, Utensils } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { useAuth } from '../context/AuthContext';
import AxiosInstance from '../services/axiosInstance';

const cuisineOptions = [
  { label: 'Italian', value: 'italian' },
  { label: 'Mexican', value: 'mexican' },
  { label: 'Indian', value: 'indian' },
  { label: 'Chinese', value: 'chinese' },
  { label: 'Thai', value: 'thai' },
  { label: 'French', value: 'french' },
  { label: 'American', value: 'american' },
  { label: 'Spanish', value: 'spanish' },
  { label: 'Korean', value: 'korean' },
  { label: 'Other', value: 'others' },
];

interface LinkedUser {
  _id: string;
}

interface Recipe {
  _id: string;
  image: string;
  title: string;
  cuisineType: string;
  prepTime: number;
  likes: LinkedUser[];
  ingredients: string[];
  instructions: string[];
  categories: string[];
  userId: { id: string };
}

const MyRecipes: React.FC = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [editingRecipeId, setEditingRecipeId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    cuisineType: '',
    prepTime: 0,
    ingredients: '',
    instructions: '',
    categories: '',
  });

  useEffect(() => {
    if (user?.id) {
      AxiosInstance.get(`/api/recipes/my-recipes/${user.id}`).then(
        (response) => {
          setRecipes(response.data.getMyRecipes);
        }
      );
    }
  }, [user?.id]);

  const openEditModal = (recipe: Recipe) => {
    setEditingRecipeId(recipe._id);
    setFormData({
      title: recipe.title,
      image: recipe.image,
      cuisineType: recipe.cuisineType,
      prepTime: recipe.prepTime,
      ingredients: recipe.ingredients.join(', '),
      instructions: recipe.instructions.join('. '),
      categories: recipe.categories.join(', '),
    });
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
    modal?.showModal();
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecipeId) return;

    const updatedRecipe = {
      ...formData,
      ingredients: formData.ingredients.split(',').map((item) => item.trim()),
      instructions: formData.instructions.split('.').map((item) => item.trim()),
      categories: formData.categories.split(',').map((item) => item.trim()),
    };

    try {
      await AxiosInstance.put(
        `/api/recipes/update-recipes/${editingRecipeId}`,
        updatedRecipe
      );
      toast.success('Recipe updated successfully.');

      setRecipes(
        (prev) =>
          prev?.map((recipe) =>
            recipe._id === editingRecipeId
              ? { ...recipe, ...updatedRecipe }
              : recipe
          ) || null
      );

      const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
      modal?.close();
    } catch (error) {
      toast.error('Failed to update recipe.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await AxiosInstance.delete(`/api/recipes/delete-recipes/${id}`);
      setRecipes((prev) => prev?.filter((recipe) => recipe._id !== id) || null);
      toast.success('Recipe deleted successfully.');
    } catch {
      toast.error('Failed to delete recipe.');
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Recipes
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Manage the recipes you've created
            </p>
          </div>
          <Link to="/add-recipe">
            <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
              Add New Recipe
            </Button>
          </Link>
        </div>

        {recipes && recipes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-48 p-4 md:h-48">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="rounded-lg w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {recipe.title}
                        </h2>
                        <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Utensils className="h-4 w-4" />
                            {recipe.cuisineType}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {recipe.prepTime} mins
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {recipe.likes.length} likes
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          className="hover:bg-transparent"
                          size="sm"
                          onClick={() => openEditModal(recipe)}
                          leftIcon={
                            <Pencil className="h-4 w-4 text-amber-600" />
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-transparent"
                          onClick={() => handleDelete(recipe._id)}
                          leftIcon={
                            <Trash2 className="h-4 w-4 text-rose-600" />
                          }
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Ingredients:
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {recipe.ingredients.join(', ')}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Instructions:
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {recipe.instructions.join('. ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recipe.categories.map((category, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-4">
              You haven't created any recipes yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Start sharing your culinary creations with the world
            </p>
            <Link to="/add-recipe">
              <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                Add Your First Recipe
              </Button>
            </Link>
          </div>
        )}

        {/* Edit Modal */}
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box dark:bg-gray-800">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold dark:text-white">
                Edit Recipe
              </h3>
              {[
                'title',
                'image',
                'ingredients',
                'instructions',
                'categories',
              ].map((field) => (
                <div key={field}>
                  <Input
                    type="text"
                    label={
                      field[0].toUpperCase() + field.slice(1).toLowerCase()
                    }
                    name={field}
                    value={(formData as any)[field]}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border dark:border-gray-600 rounded dark:bg-gray-800 dark:text-white"
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Select
                    name="cuisineType"
                    label="Select cuisine type"
                    value={formData.cuisineType}
                    onChange={handleInputChange}
                    options={cuisineOptions}
                    className="w-full mt-1 px-3 py-2 border dark:border-gray-600 rounded dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <Input
                    label="Prep Time (in minutes)"
                    type="number"
                    name="prepTime"
                    value={formData.prepTime}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border dark:border-gray-600 rounded dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    const modal = document.getElementById(
                      'my_modal_1'
                    ) as HTMLDialogElement;
                    modal?.close();
                  }}
                  className="px-4 py-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyRecipes;
