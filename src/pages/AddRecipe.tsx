import { Plus, X } from 'lucide-react';
import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
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

export const predefinedCategories = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Appetizer',
  'Snack',
  'Vegetarian',
  'Vegan',
  'Dairy-Free',
  'Keto',
  'Paleo',
  'Healthy',
  'Quick & Easy',
  'Budget-Friendly',
];
export interface Recipe {
  id?: string;
  title: string;
  image: string;
  cuisineType: string;
  prepTime: number;
  ingredients: string[];
  instructions: string[];
  categories: string[];
}
const RecipeForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState<Recipe>({
    title: '',
    image: '',
    cuisineType: '',
    prepTime: 0,
    ingredients: [''],
    instructions: [''],
    categories: [],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({
      ...prev,
      [name]: name === 'prepTime' ? parseInt(value) || 0 : value,
    }));
  };

  const handleIngredientChange = (index: number, value: string) => {
    const updated = [...recipe.ingredients];
    updated[index] = value;
    setRecipe((prev) => ({ ...prev, ingredients: updated }));
  };

  const addIngredient = () => {
    setRecipe((prev) => ({ ...prev, ingredients: [...prev.ingredients, ''] }));
  };

  const removeIngredient = (index: number) => {
    const updated = [...recipe.ingredients];
    updated.splice(index, 1);
    setRecipe((prev) => ({ ...prev, ingredients: updated }));
  };

  const handleInstructionChange = (index: number, value: string) => {
    const updated = [...recipe.instructions];
    updated[index] = value;
    setRecipe((prev) => ({ ...prev, instructions: updated }));
  };

  const addInstruction = () => {
    setRecipe((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ''],
    }));
  };

  const removeInstruction = (index: number) => {
    const updated = [...recipe.instructions];
    updated.splice(index, 1);
    setRecipe((prev) => ({ ...prev, instructions: updated }));
  };

  const toggleCategory = (category: string) => {
    setRecipe((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await AxiosInstance.post('/api/recipes/create-recipe', {
      userId: user?.id,
      title: recipe.title,
      image: recipe.image,
      cuisineType: recipe.cuisineType,
      preparationTime: recipe.prepTime,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      categories: recipe.categories,
    })
      .then(() => {
        setRecipe({
          title: '',
          image: '',
          cuisineType: '',
          prepTime: 0,
          ingredients: [''],
          instructions: [''],
          categories: [],
        });
        toast.success('Recipe added successfully.');
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
            Add New Recipe
          </h2>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Image Upload */}
            <div className="flex flex-col space-y-2">
              <Input
                id="image"
                name="image"
                type="text"
                required
                label="Image URL"
                placeholder="https://example.com/image.jpg"
                value={recipe.image}
                onChange={handleChange}
              />
            </div>

            {/* Title */}
            <div className="flex flex-col space-y-2">
              <Input
                id="title"
                name="title"
                type="text"
                required
                label="Recipe Title"
                placeholder="e.g., Spaghetti Carbonara"
                value={recipe.title}
                onChange={handleChange}
              />
            </div>

            {/* Cuisine & Prep Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                id="cuisineType"
                label="Cuisine Type"
                options={cuisineOptions}
                value={recipe.cuisineType}
                onChange={handleChange}
                name="cuisineType"
              />
              <Input
                id="prepTime"
                name="prepTime"
                type="number"
                required
                label="Prep Time (minutes)"
                placeholder="30"
                value={recipe.prepTime}
                onChange={handleChange}
              />
            </div>

            {/* Ingredients */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Ingredients
              </h3>
              <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <span className="w-8 h-8 flex items-center justify-center bg-primary-500 text-white rounded-full text-sm font-semibold">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) =>
                        handleIngredientChange(index, e.target.value)
                      }
                      placeholder={`e.g., 1 cup chopped onions`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                      required
                    />
                    <Button
                      type="button"
                      variant="danger"
                      size="icon"
                      onClick={() => removeIngredient(index)}
                      disabled={recipe.ingredients.length <= 1}
                    >
                      <X size={20} />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={addIngredient}
                  variant="outline"
                  className="w-full"
                >
                  <Plus size={18} className="mr-2" /> Add Ingredient
                </Button>
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Instructions
              </h3>
              <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                {recipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <span className="w-8 h-8 flex items-center justify-center bg-primary-500 text-white rounded-full text-sm font-semibold mt-2">
                      {index + 1}
                    </span>
                    <textarea
                      value={instruction}
                      onChange={(e) =>
                        handleInstructionChange(index, e.target.value)
                      }
                      placeholder={`Step ${
                        index + 1
                      } - e.g., Heat oil in a pan...`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                      required
                    />
                    <Button
                      type="button"
                      variant="danger"
                      size="icon"
                      onClick={() => removeInstruction(index)}
                      disabled={recipe.instructions.length <= 1}
                    >
                      <X size={20} />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={addInstruction}
                  variant="outline"
                  className="w-full"
                >
                  <Plus size={18} className="mr-2" /> Add Instruction
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {predefinedCategories.map((category) => {
                  const selected = recipe.categories.includes(category);
                  return (
                    <Button
                      key={category}
                      type="button"
                      variant={selected ? 'primary' : 'outline'}
                      onClick={() => toggleCategory(category)}
                      className={`rounded-full text-sm`}
                    >
                      {category}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <div>
              <Button type="submit" className="w-full text-lg py-3">
                Submit Recipe
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
