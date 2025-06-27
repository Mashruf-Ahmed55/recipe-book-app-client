import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AxiosInstance from '../../services/axiosInstance';

const DashboardStats = () => {
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
  const stats = [
    {
      title: 'Total Recipes',
      value: totalRecipes,
      changeType: 'positive',
      icon: (
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Likes',
      value: totalLikes,

      changeType: 'positive',
      icon: (
        <svg
          className="w-6 h-6 text-red-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      ),
      bgColor: 'bg-red-50',
    },
    {
      title: 'Total Views',
      value: totalViews,
      changeType: 'positive',
      icon: (
        <svg
          className="w-6 h-6 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>{stat.icon}</div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
