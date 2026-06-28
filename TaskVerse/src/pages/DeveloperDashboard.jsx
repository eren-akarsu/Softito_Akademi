import { useSelector } from 'react-redux';
import TaskCard from '../components/TaskCard';
import { selectTasksByCurrentUser } from '../features/tasks/taskSlice';

const DeveloperDashboard = () => {
  const developerTasks = useSelector(selectTasksByCurrentUser);

  return (
    <div className="dashboard-layout">
      <div className="dashboard-title-section">
        <h2 className="serif-font">Geliştirici Paneli</h2>
        <p className="dashboard-subtitle">
          Takım lideri tarafından size atanan görevleri tamamlayın ve durum bildirin.
        </p>
      </div>

      <div className="panel-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h3 className="panel-title">
          <span className="panel-title-icon">💻</span> Atanan Aktif Görevler
        </h3>

        {developerTasks.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state-icon">✔️</span>
            <p>Atanmış aktif bir göreviniz bulunmamaktadır.</p>
            <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>
              Takım liderinden gelecek olan yeni iş bildirimlerini bekleyebilirsiniz.
            </p>
          </div>
        ) : (
          <div className="tasks-container">
            {developerTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                userRole="developer"
                viewMode="assigned_to_me"
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default DeveloperDashboard;
