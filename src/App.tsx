import { ArrowRight, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router';
import Button from './components/ui/Button';
import AxiosInstance from './services/axiosInstance';
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
  userId?: {
    _id: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
function App() {
  const [recipes, setRecipes] = useState<Recipe[] | null>();
  useEffect(() => {
    AxiosInstance.get('/api/recipes/get-all-recipes?limit=6').then(
      (response) => {
        setRecipes(response.data);
      }
    );
  }, []);

  console.log(recipes);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Banner */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 z-10"></div>
          <img
            src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Delicious food"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20 flex items-center justify-center">
          <div className="text-white flex flex-col items-center">
            <Zoom cascade triggerOnce duration={800}>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                Discover & Share{' '}
                <span className="text-amber-400">Delicious</span> Recipes
              </h1>
            </Zoom>

            <Fade delay={1e3} cascade damping={1e-1}>
              <p className="text-lg md:text-xl mb-8 text-gray-200">
                Join our community of food lovers. Find inspiration, share your
                culinary creations, and connect with fellow cooking enthusiasts.
              </p>
            </Fade>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10"
                >
                  Join Now
                </Button>
              </Link>
              <Link to="/recipes">
                <Button
                  size="lg"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Explore Recipes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top Recipes Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Top Recipes
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Our community's highest-rated culinary creations
              </p>
            </div>
            <Link
              to="/recipes"
              className="flex items-center text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors duration-200"
            >
              <span>See All Recipes</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes?.map((recipe) => (
              <div
                key={recipe._id}
                className={`group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1.5 backdrop-blur-sm">
                    <FaHeart className="h-4 w-4 text-red-600" />
                  </div>
                </div>

                <div className="p-4 flex-grow">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full mb-2">
                    {recipe.cuisineType}
                  </span>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {recipe.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{recipe.preparationTime} mins</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaHeart className="h-4 w-4 text-red-600" />
                      <span>{recipe.likes?.length || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 mt-auto">
                  <Link
                    to={`/recipes/${recipe._id}`}
                    className="block w-full py-2 text-center text-white bg-amber-500 hover:bg-amber-600 rounded-md transition-colors duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {/* <RecipeGrid recipes={recipes || []} columns={3} /> */}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-amber-50 dark:bg-gray-800/50 transition-colors duration-300">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Why Use Recipe Book?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              Discover the benefits of joining our vibrant culinary community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1">
              <div className="h-14 w-14 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-8 w-8 text-amber-600 dark:text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Curated Recipes
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Discover tried and tested recipes from our community of
                passionate home chefs and food enthusiasts.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1">
              <div className="h-14 w-14 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-8 w-8 text-amber-600 dark:text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Community Driven
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Share your own recipes, like your favorites, and connect with
                other food lovers around the world.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1">
              <div className="h-14 w-14 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-8 w-8 text-amber-600 dark:text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Inspiration
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Find new cooking ideas, explore different cuisines, and never
                run out of meal inspiration again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Explore Cuisines
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              Discover recipes from around the world
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                name: 'Italian',
                image:
                  'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
              {
                name: 'Mexican',
                image:
                  'https://images.pexels.com/photos/5737377/pexels-photo-5737377.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
              {
                name: 'Indian',
                image:
                  'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
              {
                name: 'Chinese',
                image:
                  'https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
            ].map((cuisine, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-md h-40 md:h-56"
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 z-10"></div>
                <img
                  src={cuisine.image}
                  alt={cuisine.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {cuisine.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-amber-500 dark:bg-amber-600 transition-colors duration-300">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to share your recipes?
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            Join our community today and start sharing your culinary
            masterpieces with food enthusiasts around the world.
          </p>
          <Link to="/register">
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10 px-8"
            >
              Create Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default App;
