import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {user?.name || "User"}!
          </p>
        </div>

        <div className="space-y-4 pt-6">
          <div className="rounded-lg bg-emerald-50 p-4 text-emerald-800">
            <p className="font-medium">Account Details</p>
            <p className="text-sm">Email: {user?.email}</p>
          </div>

          <button
            onClick={logout}
            className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition-colors hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
