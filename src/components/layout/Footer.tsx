import {
  ChefHat,
  Facebook,
  Instagram,
  Mail,
  Phone,
  Twitter,
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <ChefHat className="h-8 w-8 text-amber-500" />
              <span className="text-xl font-Merriweather font-bold text-gray-800 dark:text-white">
                Recipe Book
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Discover, share, and enjoy delicious recipes from around the
              world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Explore
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-amber-500 dark:text-gray-300 dark:hover:text-amber-400 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes"
                  className="text-gray-600 hover:text-amber-500 dark:text-gray-300 dark:hover:text-amber-400 transition-colors duration-200"
                >
                  All Recipes
                </Link>
              </li>
              <li>
                <Link
                  to="/add-recipe"
                  className="text-gray-600 hover:text-amber-500 dark:text-gray-300 dark:hover:text-amber-400 transition-colors duration-200"
                >
                  Add Recipe
                </Link>
              </li>
              <li>
                <Link
                  to="/my-recipes"
                  className="text-gray-600 hover:text-amber-500 dark:text-gray-300 dark:hover:text-amber-400 transition-colors duration-200"
                >
                  My Recipes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Mail className="h-4 w-4 text-amber-500" />
                <span>hello@recipebook.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Phone className="h-4 w-4 text-amber-500" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Follow Us
            </h3>
            <div className="mt-4 flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-400 transition-colors duration-200"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-400 transition-colors duration-200"
              >
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-400 transition-colors duration-200"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy; {currentYear} Recipe Book. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
