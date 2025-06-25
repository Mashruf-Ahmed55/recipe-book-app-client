import { ChefHat } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signInWithGoogleHandler, signInWithEmailAndPasswordHandler } =
    useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signInWithEmailAndPasswordHandler({ email, password }, false)
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        toast.error('Invalid email or password.');
      });
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-8 transition-colors duration-300">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center mb-4">
            <ChefHat className="h-10 w-10 text-amber-500" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Sign in to Recipe Book
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <Link
              to="/register"
              className="font-medium text-amber-600 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300"
            >
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-amber-600 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              className="group relative"
            >
              Sign in
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6">
            <Button
              onClick={async () => {
                await signInWithGoogleHandler();
                navigate('/');
              }}
              type="button"
              variant="outline"
              fullWidth
              className="flex items-center justify-center"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
