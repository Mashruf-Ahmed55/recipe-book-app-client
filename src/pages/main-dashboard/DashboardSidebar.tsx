const DashboardSidebar = () => {
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
          <p className="text-xl font-bold text-gray-900">7</p>
          <p className="text-xs text-gray-500">Recipes</p>
        </div>
        <div>
          <p className="text-xl font-bold text-gray-900">120</p>
          <p className="text-xs text-gray-500">Likes</p>
        </div>
        <div>
          <p className="text-xl font-bold text-gray-900">345</p>
          <p className="text-xs text-gray-500">Views</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
