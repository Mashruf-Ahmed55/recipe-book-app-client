import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AxiosInstance from '../../services/axiosInstance';

const DashboardSidebar = () => {
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [totalRecipes, setTotalRecipes] = useState(0);
  // Mock views
  const { user } = useAuth();
  useEffect(() => {
    const getTotalStats = async () => {
      try {
        if (!user?.id) return;
        const res = await AxiosInstance.get(`/recipes/summary/${user.id}`);
        setTotalLikes(res.data.totalLikes);
        setTotalViews(res.data.totalViews);
        setTotalRecipes(res.data.totalRecipes);
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      }
    };

    getTotalStats();
  }, [user?.id]);
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 max-w-sm mx-auto">
      {/* User Profile */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3 shadow-sm">
          MM
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Mahin Mejan</h3>
        <p className="text-sm text-gray-600">mahinmejan75@gmail.com</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xl font-bold text-gray-900">{totalRecipes}</p>
          <p className="text-xs text-gray-500">Recipes</p>
        </div>
        <div>
          <p className="text-xl font-bold text-gray-900">{totalLikes}</p>
          <p className="text-xs text-gray-500">Likes</p>
        </div>
        <div>
          <p className="text-xl font-bold text-gray-900">{totalViews}</p>
          <p className="text-xs text-gray-500">Views</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
