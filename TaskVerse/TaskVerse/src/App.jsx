import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './components/Login';
import Layout from './components/Layout';
import ManagerDashboard from './pages/ManagerDashboard';
import TeamLeaderDashboard from './pages/TeamLeaderDashboard';
import DeveloperDashboard from './pages/DeveloperDashboard';
import ArchivePage from './pages/ArchivePage';
import { 
  selectNotifications, 
  removeNotification 
} from './features/notifications/notificationSlice';
import { setupTaskSyncListener } from './features/tasks/taskSlice';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const toasts = useSelector(selectNotifications);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    dispatch(setupTaskSyncListener());
  }, [dispatch]);

  // Auto-remove notification toasts after 4.5 seconds
  useEffect(() => {
    if (toasts.length > 0) {
      const latest = toasts[toasts.length - 1];
      const timer = setTimeout(() => {
        dispatch(removeNotification(latest.id));
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [toasts, dispatch]);

  const renderDashboard = () => {
    if (!currentUser) return null;

    switch (currentUser.role) {
      case 'manager':
        return <ManagerDashboard />;
      case 'teamLeader':
        return <TeamLeaderDashboard />;
      case 'developer':
        return <DeveloperDashboard />;
      default:
        return (
          <div className="info-modal">
            <h3>Hata</h3>
            <p>Makamınız tanımlanamadı.</p>
          </div>
        );
    }
  };

  return (
    <>
      {/* Redux Toast Notification Stack */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <span className="toast-icon">
              {toast.type === 'success' ? '✔️' : toast.type === 'error' ? '❌' : 'ℹ️'}
            </span>
            <div className="toast-message">{toast.message}</div>
            <button 
              className="toast-close-btn" 
              onClick={() => dispatch(removeNotification(toast.id))}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {currentUser ? (
        <Layout 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        >
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'archive' && <ArchivePage />}
        </Layout>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
