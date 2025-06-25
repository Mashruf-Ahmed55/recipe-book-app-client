import { AlertCircle, ChefHat } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photo_url: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const { createUserWithEmailAndPasswordHandler } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password: string) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasUppercase) {
      return 'Password must contain at least one uppercase letter';
    }

    if (!hasLowercase) {
      return 'Password must contain at least one lowercase letter';
    }

    if (!hasMinLength) {
      return 'Password must be at least 6 characters long';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      await createUserWithEmailAndPasswordHandler(formData);
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
      setFormData({
        name: '',
        email: '',
        photo_url: '',
        password: '',
        confirmPassword: '',
      });

      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 space-y-8 transition-colors duration-300">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center mb-4">
            <ChefHat className="h-10 w-10 text-amber-500" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-amber-600 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300"
            >
              Sign in
            </Link>
          </p>
        </div>

        {errors.general && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-md text-sm">
            {errors.general}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />

            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              label="Email address"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Input
              id="photoURL"
              name="photo_url"
              type="url"
              label="Profile Photo URL (optional)"
              placeholder="https://example.com/photo.jpg"
              value={formData.photo_url}
              onChange={handleChange}
              error={errors.photoURL}
            />

            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              label="Password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
          </div>

          {formData.password && !errors.password && (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <AlertCircle className="h-4 w-4" />
              <span>Password meets all requirements</span>
            </div>
          )}

          <div>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              className="group relative"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
