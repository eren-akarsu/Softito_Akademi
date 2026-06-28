
import { useDispatch, useSelector } from 'react-redux';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import { selectTeamLeadersByManagerGroup } from '../features/users/userSlice';
import { addTaskThunk, selectTasksByCurrentUser } from '../features/tasks/taskSlice';
import { addNotificationThunk } from '../features/notifications/notificationSlice';

const ManagerDashboard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const groupLeaders = useSelector((state) => 
    selectTeamLeadersByManagerGroup(state, currentUser?.groupId)
  );
  const activeManagerTasks = useSelector(selectTasksByCurrentUser);

  const handleFormSubmit = async (taskData) => {
    const targetTLId = taskData.assignedTo || (groupLeaders[0]?.id || 'TL0101');
    const resultAction = await dispatch(addTaskThunk({
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      status: 'bekliyor',
      assignedBy: currentUser.id,
      assignedTo: targetTLId,
      assignedByRole: 'manager',
      assignedToRole: 'teamLeader',
      feedback: '',
      dueDate: taskData.dueDate,
      category: taskData.category,
      groupId: currentUser.groupId
    }));

    if (addTaskThunk.fulfilled.match(resultAction)) {
      dispatch(addNotificationThunk({ 
        message: 'Görev başarıyla gönderildi.', 
        type: 'success',
        assignedTo: currentUser.id
      }));
    } else {
      const errorMsg = resultAction.payload || 'Görev gönderilemedi.';
      dispatch(addNotificationThunk({ 
        message: `Hata: ${errorMsg}`, 
        type: 'error',
        assignedTo: currentUser.id
      }));
    }
  };

  return (
    <div className="dashboard-layout">
      <div className="dashboard-title-section">
        <h2 className="serif-font">Yönetici Paneli</h2>
        <p className="dashboard-subtitle">Görevleri oluşturun, takım liderinin raporlarını onaylayın veya reddedin.</p>
      </div>

      <div className="dashboard-grid">
        {/* Left side: Create Task Form */}
        <div className="panel-card">
          <h3 className="panel-title">
            <span className="panel-title-icon">🚀</span> Görev Oluştur
          </h3>
          <TaskForm onSubmit={handleFormSubmit} buttonText="Görev Oluştur" assignees={groupLeaders} />
        </div>

        {/* Right side: Active Tasks List */}
        <div className="panel-card">
          <h3 className="panel-title">
            <span className="panel-title-icon">🧭</span> Takım Liderine Verilen Aktif Görevler
          </h3>
          
          {activeManagerTasks.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state-icon">📋</span>
              <p>Henüz süreçte aktif bir görev bulunmamaktadır.</p>
              <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>Sol taraftaki formdan takım liderine ilk görevi atayabilirsiniz.</p>
            </div>
          ) : (
            <div className="tasks-container">
              {activeManagerTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  userRole="manager"
                  viewMode="created_by_me"
                />
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default ManagerDashboard;
