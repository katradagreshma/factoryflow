import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => { logout(); navigate('/login'); };
  const isActive = (path) => location.pathname === path;
  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-base">🏭</div>
          <span className="text-white font-bold text-lg">FactoryFlow</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          <Link to="/dashboard" className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive('/dashboard') ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>Dashboard</Link>
          <Link to="/kanban" className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive('/kanban') ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>Kanban Board</Link>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${user?.role === 'admin' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}>{user?.role}</span>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">{user?.name?.charAt(0).toUpperCase()}</div>
          <span className="hidden sm:block text-gray-300 text-sm font-medium">{user?.name}</span>
        </div>
        <button onClick={handleLogout} className="ml-2 text-gray-400 hover:text-red-400 text-sm font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-red-500/10">Logout</button>
      </div>
    </nav>
  );
};
export default Navbar;
