import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Kanban from './pages/Kanban';
function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
            <Route path="/kanban" element={<ProtectedRoute><Kanban /></ProtectedRoute>}/>
            <Route path="/" element={<Navigate to="/dashboard" replace />}/>
          </Routes>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}
export default App;
