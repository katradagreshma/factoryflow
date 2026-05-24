import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
const PriorityBadge = ({ priority }) => {
  const styles = { High: 'bg-red-500/20 text-red-400 border border-red-500/30', Medium: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30', Low: 'bg-green-500/20 text-green-400 border border-green-500/30' };
  return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${styles[priority] || styles.Low}`}>{priority}</span>;
};
const StatusBadge = ({ status }) => {
  const styles = { 'Pending': 'bg-yellow-500/20 text-yellow-400', 'In Progress': 'bg-blue-500/20 text-blue-400', 'Completed': 'bg-green-500/20 text-green-400' };
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] || ''}`}>{status}</span>;
};
const Dashboard = () => {
  const { user } = useAuth();
  const { tasks, stats, loading } = useTasks();
  const recentTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Good day, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="text-gray-400 mt-1 text-sm">Here's what's happening on the factory floor today.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Tasks" value={stats.total} icon="📋" color="blue" subtitle="All tasks"/>
        <StatCard title="Pending" value={stats.pending} icon="⏳" color="yellow" subtitle="Not started yet"/>
        <StatCard title="In Progress" value={stats.inProgress} icon="⚙️" color="purple" subtitle="Currently active"/>
        <StatCard title="Completed" value={stats.completed} icon="✅" color="green" subtitle="Done"/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold text-base">Recent Tasks</h2>
            <Link to="/kanban" className="text-blue-400 hover:text-blue-300 text-sm font-medium">View board →</Link>
          </div>
          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading tasks...</div>
          ) : recentTasks.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-gray-400 text-sm">No tasks yet.</p>
              <Link to="/kanban" className="mt-3 inline-block text-blue-400 text-sm">Create your first task →</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div key={task._id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{task.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{task.assignedTo || 'Unassigned'} • {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    <PriorityBadge priority={task.priority}/>
                    <StatusBadge status={task.status}/>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-semibold text-base mb-4">Overall Progress</h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Completion rate</span>
              <span className="text-white font-bold text-sm">{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2.5">
              <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${completionRate}%` }}/>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div><p className="text-yellow-400 font-bold text-lg">{stats.pending}</p><p className="text-gray-500 text-xs">Pending</p></div>
              <div><p className="text-blue-400 font-bold text-lg">{stats.inProgress}</p><p className="text-gray-500 text-xs">Active</p></div>
              <div><p className="text-green-400 font-bold text-lg">{stats.completed}</p><p className="text-gray-500 text-xs">Done</p></div>
            </div>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🔴</span>
              <h3 className="text-white font-semibold text-sm">High Priority</h3>
            </div>
            <p className="text-red-400 text-3xl font-bold mt-1">{stats.highPriority}</p>
            <p className="text-gray-400 text-xs mt-1">tasks need immediate attention</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Dashboard;
