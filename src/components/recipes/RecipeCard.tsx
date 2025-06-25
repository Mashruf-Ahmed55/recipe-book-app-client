import { Clock, Heart } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

type RecipeCardProps = {
  id: string;
  image: string;
  title: string;
  cuisineType: string;
  prepTime: number;
  likes: number;
  compact?: boolean;
};

const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  image,
  title,
  cuisineType,
  prepTime,
  likes,
  compact = false,
}) => {
  return (
    <div
      className={`group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 ${
        compact ? 'max-w-xs' : ''
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1.5 backdrop-blur-sm">
          <Heart className="h-4 w-4 text-rose-500" />
          <span className="sr-only">Likes</span>
        </div>
      </div>

      <div className="p-4 flex-grow">
        <span className="inline-block px-2 py-1 text-xs font-medium bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full mb-2">
          {cuisineType}
        </span>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{prepTime} mins</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
            <span>{likes}</span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 mt-auto">
        <Link
          to={`/recipes/${id}`}
          className="block w-full py-2 text-center text-white bg-amber-500 hover:bg-amber-600 rounded-md transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
