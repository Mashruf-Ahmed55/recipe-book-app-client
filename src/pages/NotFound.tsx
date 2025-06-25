import { ChefHat } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';
import Button from '../components/ui/Button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-amber-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-md w-full text-center">
        <ChefHat className="h-24 w-24 text-amber-500 mx-auto mb-4" />

        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Oops! This recipe doesn't exist
        </h2>

        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-amber-300 dark:border-amber-700"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-amber-50 dark:bg-gray-900 text-amber-600 dark:text-amber-400">
              Recipe Not Found
            </span>
          </div>
        </div>

        <div className="mb-8">
          <img
            src="https://images.pexels.com/photos/1556698/pexels-photo-1556698.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Empty plate"
            className="w-48 h-48 object-cover rounded-full mx-auto border-4 border-white dark:border-gray-800 shadow-md"
          />
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Looks like the recipe you're looking for has vanished from our
          kitchen. Let's find you something delicious instead!
        </p>

        <Link to="/">
          <Button size="lg" className="mx-auto">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
