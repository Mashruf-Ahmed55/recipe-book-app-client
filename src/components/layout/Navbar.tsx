import Lottie from 'lottie-react';
import { ChefHat, Menu, Moon, Sun, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import profileIcon2 from '../../assets/profileIcon2.json';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { toggleTheme, theme } = useTheme();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout().then(() => {
      navigate('/');
    });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/90 backdrop-blur-md shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and site name */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-amber-500" />
              <span className="text-xl font-Merriweather font-bold text-gray-800 dark:text-white">
                Recipe Book
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-amber-600 dark:text-gray-200 dark:hover:text-amber-400 transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/recipes"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-amber-600 dark:text-gray-200 dark:hover:text-amber-400 transition-colors duration-200"
              >
                All Recipes
              </Link>
              {user?.email && (
                <>
                  <Link
                    to="/add-recipe"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-amber-600 dark:text-gray-200 dark:hover:text-amber-400 transition-colors duration-200"
                  >
                    Add Recipe
                  </Link>
                  <Link
                    to="/main-dashboard"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-amber-600 dark:text-gray-200 dark:hover:text-amber-400 transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {/* Authentication buttons */}
            {!user?.email ? (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium rounded-md border border-amber-500 text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:border-amber-400 dark:hover:bg-gray-700/50 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium rounded-md bg-amber-500 text-white hover:bg-amber-600 transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="">
                  <UserLogo imgUrl={user.photo_url} alt={user.name} />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li>
                    <span>{user.name}</span>
                  </li>
                  <li>
                    <span>{user.email}</span>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-amber-500 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-amber-400 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 shadow-lg">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-amber-400 dark:hover:bg-gray-700 transition-colors duration-200"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/recipes"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-amber-400 dark:hover:bg-gray-700 transition-colors duration-200"
            onClick={toggleMenu}
          >
            All Recipes
          </Link>
          {user?.email && (
            <>
              <Link
                to="/add-recipe"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-amber-400 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={toggleMenu}
              >
                Add Recipe
              </Link>
              <Link
                to="/main-dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-amber-400 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
            </>
          )}

          {!user?.email ? (
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-5 gap-2">
                <Link
                  to="/login"
                  className="w-full px-4 py-2 text-center text-sm font-medium rounded-md border border-amber-500 text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:border-amber-400 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="w-full px-4 py-2 text-center text-sm font-medium rounded-md bg-amber-500 text-white hover:bg-amber-600 transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full object-cover border-2 border-amber-500"
                    src={
                      user?.photo_url ||
                      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
                    }
                    alt="User avatar"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800 dark:text-white">
                    {user?.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-amber-400 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const UserLogo = ({ imgUrl, alt }: { imgUrl: string; alt: string }) => {
  return (
    <div className="relative w-10 h-10">
      {/* Lottie animation as background */}
      <Lottie animationData={profileIcon2} className="w-full h-full" />

      {/* Profile image centered inside the circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-7 h-7 rounded-full overflow-hidden">
          <img src={imgUrl} alt={alt} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};
