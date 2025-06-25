import { ChefHat } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const { forgotPasswordHandler } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgotPasswordHandler(email);
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 transition-colors duration-300">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center mb-4">
            <ChefHat className="h-10 w-10 text-amber-500" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Forgot Your Recipe Book Password
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <Link
              to="/login"
              className="font-medium text-amber-600 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300"
            >
              Back to Login
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
          </div>
          <div>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              className="group relative"
            >
              Forgot Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
