import { useRecipeContext } from '../../context/RecipeContext';
import DashboardSidebar from './DashboardSidebar';
import DashboardStats from './DashboardStats';
import RecipeTable from './RecipeTable';
export default function DashBoardPage() {
  const { recipes } = useRecipeContext();
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          {
            "Welcome back, Mahin Mejan! Here's what's happening with your recipes."
          }
        </p>
      </div>

      {/* Stats */}
      <DashboardStats />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Table */}
        <div className="lg:col-span-3">
          <RecipeTable items={recipes} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <DashboardSidebar />
        </div>
      </div>
    </>
  );
}
